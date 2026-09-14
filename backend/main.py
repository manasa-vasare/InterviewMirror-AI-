from fastapi import FastAPI, Depends, HTTPException, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from pydantic import BaseModel
import models
from database import engine, get_db
import datetime
import os
import tempfile
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# We will use the official google-genai SDK
from google import genai
from google.genai import types

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="InterviewMirror AI API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Schemas ---
class InterviewCreate(BaseModel):
    role: str
    difficulty: str
    type: str = "Technical"

class InterviewResponse(BaseModel):
    id: str
    role: str
    difficulty: str
    score: float | None
    created_at: datetime.datetime

    class Config:
        from_attributes = True

# --- Endpoints ---
@app.get("/health")
def health_check():
    return {"status": "healthy"}

@app.post("/interviews/", response_model=InterviewResponse)
def create_interview(interview: InterviewCreate, db: Session = Depends(get_db)):
    new_interview = models.Interview(
        role=interview.role, 
        difficulty=interview.difficulty
    )
    db.add(new_interview)
    db.commit()
    db.refresh(new_interview)
    return new_interview

@app.get("/interviews/", response_model=list[InterviewResponse])
def list_interviews(db: Session = Depends(get_db)):
    return db.query(models.Interview).order_by(models.Interview.created_at.desc()).all()


# --- REAL AI ENDPOINT ---
@app.post("/submit_audio/")
async def submit_audio(
    interview_id: str = Form(...),
    question: str = Form(...),
    audio_file: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    # 1. Check if Gemini API key exists
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        raise HTTPException(status_code=500, detail="GEMINI_API_KEY not set in backend/.env")

    client = genai.Client(api_key=api_key)

    # 2. Save uploaded audio to a temporary file
    try:
        with tempfile.NamedTemporaryFile(delete=False, suffix=".webm") as temp_audio:
            temp_audio.write(await audio_file.read())
            temp_file_path = temp_audio.name
            
        # 3. Upload the audio to Gemini
        uploaded_file = client.files.upload(file=temp_file_path)
        
        # 4. Prompt Gemini to transcribe AND evaluate the answer
        prompt = f"""
        You are an expert technical and HR interviewer. 
        The candidate was asked this question: "{question}"
        
        Listen to the provided audio file of their answer.
        
        Provide your response in EXACTLY this JSON format (no markdown formatting, just raw JSON):
        {{
            "transcript": "The exact word-for-word transcription of what they said.",
            "feedback": "Your detailed, constructive feedback on their answer.",
            "score": 85,
            "filler_words": 2
        }}
        """

        response = client.models.generate_content(
            model='gemini-1.5-flash',
            contents=[uploaded_file, prompt],
            config=types.GenerateContentConfig(
                response_mime_type="application/json",
            ),
        )
        
        import json
        ai_data = json.loads(response.text)

        # 5. Save to database
        new_response = models.Response(
            interview_id=interview_id,
            question=question,
            transcript=ai_data.get("transcript"),
            feedback=ai_data.get("feedback"),
            confidence_score=ai_data.get("score")
        )
        db.add(new_response)
        
        # Update overall interview score (simplistic average for now)
        interview = db.query(models.Interview).filter(models.Interview.id == interview_id).first()
        if interview:
            interview.score = ai_data.get("score")
        
        db.commit()

        # Clean up temp file
        os.remove(temp_file_path)

        return {"status": "success", "data": ai_data}

    except Exception as e:
        print("AI Processing Error:", str(e))
        raise HTTPException(status_code=500, detail=str(e))
