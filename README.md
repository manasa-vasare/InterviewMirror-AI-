# 🧠 InterviewMirror AI

<p align="center">

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)
![FastAPI](https://img.shields.io/badge/FastAPI-Latest-009688?logo=fastapi)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Latest-4169E1?logo=postgresql)
![Status](https://img.shields.io/badge/Status-In%20Development-orange)
![License](https://img.shields.io/badge/License-MIT-yellow)

</p>

> **An AI-powered mock interview platform that analyzes speech, communication, confidence, and interview performance to help students and professionals prepare for technical and HR interviews.**

---

# 📚 Table of Contents

- [About](#-about)
- [Problem Statement](#-problem-statement)
- [Solution](#-solution)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [System Architecture](#-system-architecture)
- [Application Flow](#-application-flow)
- [Screens](#-screens)
- [Database Design](#-database-design)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Current Status](#-current-status)
- [Development Roadmap](#-development-roadmap)
- [Future Scope](#-future-scope)
- [Contributing](#-contributing)
- [License](#-license)
- [Author](#-author)
- [Acknowledgements](#-acknowledgements)

---

# 📖 About

InterviewMirror AI is a **full-stack AI-powered mock interview platform** designed to help users improve their interview performance through intelligent feedback.

Instead of simply asking interview questions, the platform analyzes:

- 🎤 Speech clarity
- ⭐ Confidence
- 💬 Communication patterns
- 🧠 Answer quality
- 📈 Overall interview performance

The goal is to simulate a realistic interview experience while helping users continuously improve through AI-powered coaching and detailed analytics.

---

# ❗ Problem Statement

Preparing for interviews independently is difficult because candidates rarely receive objective feedback.

Many students don't know:

- How confident they sound
- Whether they speak too fast or too slowly
- How often they use filler words
- Whether their answers are well structured
- Which interview skills need improvement
- How their performance changes over time

As a result, many candidates unknowingly repeat the same mistakes during real interviews.

---

# 💡 Solution

InterviewMirror AI acts as an intelligent interview coach.

The platform conducts mock interviews, records responses, converts speech into text, analyzes communication, and generates AI-powered feedback.

After every interview, users receive:

- 🎤 Speech-to-text transcript
- ⭐ Confidence score
- 📊 Communication analysis
- 🧠 AI-generated feedback
- 📈 Performance tracking
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
|--------|------------|
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
            ┌────────┴────────┐
            │                 │
            ▼                 ▼
      PostgreSQL         AI Services
                              │
        ┌─────────────────────┼────────────────────┐
        ▼                     ▼                    ▼
     Whisper            OpenAI LLM          MediaPipe
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

### 🏠 Landing Page

Introduces the platform and encourages users to begin interview preparation.

### 🔐 Login

Authenticate existing users.

### 📝 Register

Create a new account.

### 📊 Dashboard

Displays:

- Previous interviews
- Progress charts
- Interview statistics
- Quick actions

### 🎯 Interview Setup

Users can choose:

- Interview Type
- Job Role
- Difficulty Level

### 🎤 Interview Screen

- AI-generated questions
- Audio recording
- Countdown timer
- Progress indicator

### 📈 Results Screen

Displays:

- Overall Score
- Confidence Score
- AI Feedback
- Transcript
- Suggestions for improvement

### 📚 Interview History

Displays all previous interview sessions.

### 👤 Profile

Manage personal information.

### ⚙ Settings

Configure application preferences.

---

# 🗄 Database Design

The application consists of three core entities:

### Users

- id
- name
- email
- password_hash
- created_at

### Interviews

- id
- user_id
- role
- difficulty
- score
- created_at

### Responses

- id
- interview_id
- question
- transcript
- feedback
- confidence_score

*A detailed schema will be available in `docs/database.md`.*

---

# 📂 Project Structure

```
InterviewMirror-AI/
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── routes/
│   │   ├── utils/
│   │   ├── types/
│   │   └── App.tsx
│
├── backend/
│   ├── app/
│   │   ├── api/
│   │   ├── models/
│   │   ├── schemas/
│   │   ├── services/
│   │   ├── database/
│   │   ├── ai/
│   │   └── main.py
│
├── docs/
├── screenshots/
├── assets/
├── README.md
├── LICENSE
├── CONTRIBUTING.md
├── CHANGELOG.md
└── .env.example
```

---

# 🚀 Getting Started

## Clone the Repository

```bash
git clone https://github.com/manasa-vasare/InterviewMirror-AI-.git
```

```bash
cd InterviewMirror-AI-
```

---

## Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## Backend *(Coming Soon)*

```bash
cd backend

pip install -r requirements.txt

uvicorn app.main:app --reload
```

---

# 🔐 Environment Variables

Create a `.env` file inside the backend folder.

```env
DATABASE_URL=

OPENAI_API_KEY=

JWT_SECRET=

SECRET_KEY=

ALGORITHM=HS256

ACCESS_TOKEN_EXPIRE_MINUTES=30
```

---

# 📌 Current Status

🚧 **Under Active Development**

Current Progress

- ✅ Project Planning
- ✅ Repository Setup
- 🔄 Landing Page
- ⬜ Authentication
- ⬜ Dashboard
- ⬜ Backend Development
- ⬜ AI Integration

---

# 🚀 Development Roadmap

## Phase 1

- Project Planning
- Repository Setup
- Landing Page
- Authentication
- Dashboard

---

## Phase 2

- Backend APIs
- Database Integration
- User Authentication
- Interview APIs

---

## Phase 3

- Speech-to-Text
- AI Feedback
- Progress Tracking
- Charts & Analytics

---

## Phase 4

- Computer Vision
- Deployment
- Documentation
- Testing

---

# 📷 Screenshots

🚧 Coming Soon...

Screenshots will be added after the UI is completed.

---

# 🎯 Future Scope

- Personalized Interview Preparation
- AI Career Mentor
- Resume Evaluation
- Coding Interview Mode
- Video Interview Analysis
- Team Interview Mode
- Placement Analytics Dashboard

---

# 🤝 Contributing

Contributions, feature suggestions, and bug reports are always welcome.

1. Fork the repository.
2. Create your feature branch.
3. Commit your changes.
4. Push the branch.
5. Open a Pull Request.

---

# 📜 License

This project is licensed under the **MIT License**.

---

# 👩‍💻 Author

**Manasa Vasare**

Computer Science & Artificial Intelligence Student

---

# 🙏 Acknowledgements

This project is being built to explore and learn:

- Full Stack Development
- Artificial Intelligence
- Speech Recognition
- Computer Vision
- Modern Web Development
- REST API Design

---

# ⭐ Support

If you found this project interesting, consider giving it a ⭐ on GitHub.

It motivates further development and helps others discover the project.
