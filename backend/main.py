from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from pydantic import BaseModel
import models
from database import engine, get_db
import datetime

# Create the database tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="InterviewMirror AI API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Allowing all for dev. Change to localhost:5173 later
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Pydantic Schemas ---
class InterviewCreate(BaseModel):
    role: str
    difficulty: str
    type: str = "Technical" # Defaulting to Technical

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
def health_check(db: Session = Depends(get_db)):
    return {"status": "healthy"}

@app.post("/interviews/", response_model=InterviewResponse)
def create_interview(interview: InterviewCreate, db: Session = Depends(get_db)):
    # Note: user_id is omitted for now until we add authentication
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
