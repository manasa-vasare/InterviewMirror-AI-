# 🧠 InterviewMirror AI

> **InterviewMirror AI is an AI-powered mock interview platform that analyzes speech, communication, confidence, and interview performance to help students and professionals prepare for technical and HR interviews.**

---

![React](https://img.shields.io/badge/React-19-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![FastAPI](https://img.shields.io/badge/FastAPI-Latest-green?logo=fastapi)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Latest-blue?logo=postgresql)
![Status](https://img.shields.io/badge/Status-In%20Development-orange)
![License](https://img.shields.io/badge/License-MIT-yellow)

---

## 📖 About

InterviewMirror AI is a full-stack AI-powered mock interview platform designed to help users improve their interview performance through intelligent feedback.

Instead of simply asking interview questions, the platform analyzes communication patterns, speech clarity, confidence, and answer quality to provide personalized suggestions after every interview session.

The goal is to simulate a realistic interview experience while helping users continuously improve through detailed analytics and AI-powered coaching.

---

# ❗ Problem Statement

Preparing for interviews alone is difficult because candidates rarely receive objective feedback.

Most students don't know:

- How confident they sound
- Whether they speak too fast or too slowly
- How often they use filler words
- Whether their answers are structured
- What interview skills need improvement
- How their performance changes over time

As a result, many candidates repeat the same mistakes during real interviews.

---

# 💡 Solution

InterviewMirror AI acts as an intelligent interview coach.

The platform conducts mock interviews, records responses, converts speech into text, analyzes communication, and generates AI-powered feedback.

After every interview, users receive:

- 🎤 Speech-to-text transcript
- ⭐ Confidence score
- 📊 Communication analysis
- 🧠 AI-generated feedback
- 📈 Progress tracking
- 💬 Personalized improvement suggestions

---

# ✨ Features

## 🚀 MVP (Version 1)

- User Authentication
- Dashboard
- Mock Interview Sessions
- AI-generated Questions
- Audio Recording
- Speech-to-Text
- AI Feedback
- Results Dashboard
- Interview History

---

## 🚀 Version 2

- Resume Upload
- Company-specific Interviews
- Role-based Question Sets
- Difficulty Levels
- AI Follow-up Questions
- Performance Analytics

---

## 🚀 Future Enhancements

- Eye Contact Detection
- Emotion Recognition
- Posture Analysis
- Leaderboards
- Certificates
- AI Interview Coach
- Resume Scoring
- Voice Confidence Analysis

---

# 🛠 Tech Stack

| Layer | Technology |
|---------|------------|
| Frontend | React + TypeScript + Vite |
| Styling | Tailwind CSS |
| Animation | Framer Motion |
| Backend | FastAPI |
| ORM | SQLAlchemy |
| Database | PostgreSQL |
| Validation | Pydantic |
| Speech Recognition | OpenAI Whisper |
| AI Feedback | OpenAI Compatible LLM |
| Computer Vision | MediaPipe *(Future)* |

---

# 🏗 System Architecture

```
                  User
                    │
                    ▼
          React Frontend (Vite)
                    │
          REST API Requests
                    │
                    ▼
          FastAPI Backend
        ┌──────────┴──────────┐
        │                     │
        ▼                     ▼
 PostgreSQL Database      AI Services
                            │
         ┌──────────────────┼─────────────────┐
         ▼                  ▼                 ▼
     Whisper           OpenAI LLM       MediaPipe
```

---

# 📱 Application Flow

```
Landing Page
      │
      ▼
Login / Register
      │
      ▼
Dashboard
      │
      ▼
Choose Interview
      │
      ▼
Interview Session
      │
      ▼
Speech Recording
      │
      ▼
Speech-to-Text
      │
      ▼
AI Analysis
      │
      ▼
Results
      │
      ▼
Dashboard
```

---

# 🖥 Screens

### Landing Page

Introduces the platform and encourages users to begin their interview preparation.

---

### Login

Authenticate existing users.

---

### Register

Create a new account.

---

### Dashboard

Displays

- Previous interviews
- Progress charts
- Interview statistics
- Quick actions

---

### Interview Setup

Users select

- Interview Type
- Role
- Difficulty

---

### Interview Screen

- AI asks questions
- Audio recording
- Timer
- Progress indicator

---

### Results Screen

Displays

- Overall Score
- Confidence Score
- AI Feedback
- Transcript
- Suggestions

---

### History

Displays every previous interview.

---

### Profile

Manage user information.

---

### Settings

Configure application preferences.

---

# 🗄 Database Design

## Users

| Field | Type |
|------|------|
| id | UUID |
| name | String |
| email | String |
| password_hash | String |
| created_at | Timestamp |

---

## Interviews

| Field | Type |
|------|------|
| id | UUID |
| user_id | UUID |
| role | String |
| difficulty | String |
| score | Integer |
| created_at | Timestamp |

---

## Responses

| Field | Type |
|------|------|
| id | UUID |
| interview_id | UUID |
| question | Text |
| transcript | Text |
| feedback | Text |
| confidence_score | Float |

---

# 📂 Project Structure

```
InterviewMirror-AI/

frontend/
│
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── pages/
│   ├── hooks/
│   ├── services/
│   ├── routes/
│   ├── utils/
│   ├── types/
│   └── App.tsx
│
backend/
│
├── app/
│   ├── api/
│   ├── models/
│   ├── schemas/
│   ├── services/
│   ├── database/
│   ├── ai/
│   └── main.py
│
docs/
assets/
README.md
```

---

# 🚀 Development Roadmap

## Phase 1

- [x] Project Planning
- [x] Repository Setup
- [ ] Landing Page
- [ ] Authentication
- [ ] Dashboard

---

## Phase 2

- [ ] Backend APIs
- [ ] Database Integration
- [ ] User Authentication
- [ ] Interview APIs

---

## Phase 3

- [ ] Speech-to-Text
- [ ] AI Feedback
- [ ] Progress Tracking
- [ ] Charts

---

## Phase 4

- [ ] Computer Vision
- [ ] Deployment
- [ ] Documentation
- [ ] Testing

---

# 📷 Screenshots

Coming Soon...

---

# 🎯 Future Scope

- Personalized interview preparation
- AI career mentor
- Resume evaluation
- Coding interview mode
- Video interview analysis
- Team interview mode
- Placement analytics dashboard

---

# 🤝 Contributing

Contributions, feature suggestions, and bug reports are always welcome.

Feel free to fork the repository and submit a Pull Request.

---

# 📜 License

This project is licensed under the MIT License.

---

# 👩‍💻 Author

**Manasa Vasare**

Computer Science & Artificial Intelligence Student

---

# ⭐ Support

If you found this project interesting, consider giving it a ⭐ on GitHub.

It motivates further development and helps others discover the project.

---
