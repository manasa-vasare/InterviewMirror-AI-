import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import Dashboard from './pages/Dashboard'
import InterviewSetup from './pages/InterviewSetup'
import InterviewScreen from './pages/InterviewScreen'
import Results from './pages/Results'
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/setup" element={<InterviewSetup />} />
        <Route path="/interview" element={<InterviewScreen />} />
        <Route path="/results/:id" element={<Results />} />
        {/* Placeholders for auth pages */}
        <Route path="/login" element={<div className="p-8 text-center text-xl font-sans">Login Page (Coming Soon)</div>} />
        <Route path="/register" element={<div className="p-8 text-center text-xl font-sans">Register Page (Coming Soon)</div>} />
      </Routes>
    </Router>
  )
}

export default App
