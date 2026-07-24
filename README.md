# 🧠 InterviewMirror AI

> **AI-powered mock interview platform that evaluates communication, confidence, and technical responses through speech analysis and AI-generated feedback.**

---

<p align="center">

🚀 React • FastAPI • PostgreSQL • Whisper • OpenAI • MediaPipe

</p>

---

![React](https://img.shields.io/badge/React-19-blue)
![FastAPI](https://img.shields.io/badge/FastAPI-Latest-green)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Status](https://img.shields.io/badge/Status-In%20Development-orange)

# InterviewMirror AI

**One-line description**
InterviewMirror AI is an AI-powered mock interview platform that analyzes speech, communication, and interview performance to help users prepare for technical and HR interviews.

## Problem
Students don't know:
- how confident they sound
- if they use too many filler words
- whether their answers are structured
- what to improve

## Solution
InterviewMirror AI provides:
- AI-generated interview questions
- Speech analysis
- Confidence feedback
- Progress tracking
- Personalized suggestions

## Features Roadmap

### MVP (Build first)
- User login
- Dashboard
- Start interview
- AI asks questions
- Record answer
- Speech-to-text
- AI feedback
- Results page
- Interview history

### Version 2
- Resume upload
- Company-specific interviews
- Follow-up questions
- Performance charts
- Difficulty levels

### Future
- Eye contact detection
- Emotion detection
- Posture analysis
- Leaderboards
- Certificates

## User Flow
1. Landing Page
2. Login/Register
3. Dashboard
4. Choose Interview
5. Question Screen
6. Record Answer
7. AI Analysis
8. Result
9. Dashboard (Loop back)

## Tech Stack
**Frontend:**
- React (TypeScript) + Vite
- Tailwind CSS
- React Router
- Framer Motion

**Backend:**
- FastAPI (Python)
- SQLAlchemy (ORM)
- Pydantic (Validation)

**Database:**
- PostgreSQL

**AI:**
- Whisper (Speech-to-text)
- OpenAI-compatible LLM
- MediaPipe (future)

## Screens
Each screen should have a clear purpose:
- **Landing Page:** Value proposition and call to action.
- **Login:** Authenticate returning users.
- **Register:** Create new accounts.
- **Dashboard:** Overview of user progress and interview history.
- **Profile:** Manage user information and preferences.
- **Interview Setup:** Select role and difficulty.
- **Interview Screen:** Active recording and AI interaction.
- **Results:** Feedback and scores for the completed interview.
- **History:** List of past interviews with their scores.
- **Settings:** Account and app configurations.

## Database Design

### Users
| Field | Type |
| :--- | :--- |
| `id` | UUID |
| `name` | String |
| `email` | String |
| `password_hash` | String |
| `created_at` | Timestamp |

### Interviews
| Field | Type |
| :--- | :--- |
| `id` | UUID |
| `user_id` | UUID |
| `role` | String |
| `difficulty` | String |
| `score` | Number |
| `created_at` | Timestamp |

### Responses
| Field | Type |
| :--- | :--- |
| `id` | UUID |
| `interview_id` | UUID |
| `question` | Text |
| `transcript` | Text |
| `feedback` | Text |
| `confidence_score` | Number |
