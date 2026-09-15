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
class InterviewResponse(BaseModel):
    id: str
    role: str
    difficulty: str
    score: float | None
    current_question: str | None
    created_at: datetime.datetime

    class Config:
        from_attributes = True

class InterviewCreate(BaseModel):
    role: str
    difficulty: str
    type: str = "Technical"
    user_id: str | None = None

class ResponseResponse(BaseModel):
    id: str
    question: str
    transcript: str | None
    feedback: str | None
    confidence_score: float | None

    class Config:
        from_attributes = True

class InterviewDetailResponse(InterviewResponse):
    responses: list[ResponseResponse] = []

    class Config:
        from_attributes = True

class UserCreate(BaseModel):
    name: str
    email: str
    password: str

class UserLogin(BaseModel):
    email: str
    password: str

# --- Endpoints ---
@app.get("/health")
def health_check():
    return {"status": "healthy"}

@app.post("/register")
def register_user(user: UserCreate, db: Session = Depends(get_db)):
    # Check if email exists
    existing = db.query(models.User).filter(models.User.email == user.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")
        
    # Very basic user creation for MVP
    new_user = models.User(
        name=user.name,
        email=user.email,
        password_hash=user.password  # In production, hash this!
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return {"status": "success", "user_id": new_user.id, "name": new_user.name}

@app.post("/login")
def login_user(user: UserLogin, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.email == user.email).first()
    if not db_user or db_user.password_hash != user.password:
        raise HTTPException(status_code=401, detail="Invalid email or password")
    
    return {"status": "success", "user_id": db_user.id, "name": db_user.name}

@app.post("/interviews/", response_model=InterviewResponse)
def create_interview(interview: InterviewCreate, db: Session = Depends(get_db)):
    
    # 1. Generate Question dynamically using Gemini
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        raise HTTPException(status_code=500, detail="GEMINI_API_KEY not set")
        
    client = genai.Client(api_key=api_key)
    prompt = f"You are an expert interviewer. The candidate is applying for a '{interview.role}' role. This is a '{interview.type}' interview at a '{interview.difficulty}' level. Generate exactly ONE highly relevant interview question. Do not include any other text, greetings, or formatting. Just the question string."
    
    try:
        response = client.models.generate_content(
            model='gemini-1.5-flash',
            contents=prompt,
        )
        generated_question = response.text.strip().replace('"', '')
    except Exception as e:
        print("Error generating question:", e)
        generated_question = "Tell me about yourself and your experience." # fallback
        
    # 2. Save to DB
    new_interview = models.Interview(
        role=interview.role, 
        difficulty=interview.difficulty,
        user_id=interview.user_id,
        current_question=generated_question
    )
    db.add(new_interview)
    db.commit()
    db.refresh(new_interview)
    return new_interview

@app.get("/interviews/", response_model=list[InterviewResponse])
def list_interviews(user_id: str | None = None, db: Session = Depends(get_db)):
    query = db.query(models.Interview)
    if user_id:
        query = query.filter(models.Interview.user_id == user_id)
    return query.order_by(models.Interview.created_at.desc()).all()

@app.get("/interviews/{interview_id}", response_model=InterviewDetailResponse)
def get_interview(interview_id: str, db: Session = Depends(get_db)):
    interview = db.query(models.Interview).filter(models.Interview.id == interview_id).first()
    if not interview:
        raise HTTPException(status_code=404, detail="Interview not found")
    
    # Manually fetch responses
    responses = db.query(models.Response).filter(models.Response.interview_id == interview_id).all()
    interview.responses = responses
    
    return interview


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
