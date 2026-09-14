from sqlalchemy import Column, Integer, String, Float, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from database import Base
import datetime
import uuid

def generate_uuid():
    return str(uuid.uuid4())

class User(Base):
    __tablename__ = "users"

    id = Column(String, primary_key=True, default=generate_uuid, index=True)
    name = Column(String, index=True)
    email = Column(String, unique=True, index=True)
    password_hash = Column(String)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    interviews = relationship("Interview", back_populates="user")

class Interview(Base):
    __tablename__ = "interviews"

    id = Column(String, primary_key=True, default=generate_uuid, index=True)
    user_id = Column(String, ForeignKey("users.id"))
    role = Column(String, index=True)
    difficulty = Column(String)
    score = Column(Float, nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    user = relationship("User", back_populates="interviews")
    responses = relationship("Response", back_populates="interview")

class Response(Base):
    __tablename__ = "responses"

    id = Column(String, primary_key=True, default=generate_uuid, index=True)
    interview_id = Column(String, ForeignKey("interviews.id"))
    question = Column(String)
    transcript = Column(String, nullable=True)
    feedback = Column(String, nullable=True)
    confidence_score = Column(Float, nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    interview = relationship("Interview", back_populates="responses")
