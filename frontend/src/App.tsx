import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import InterviewSetup from './pages/InterviewSetup';
import InterviewScreen from './pages/InterviewScreen';
import Results from './pages/Results';
import Register from './pages/Register';
import Login from './pages/Login';

// Protected Route Wrapper
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const userId = localStorage.getItem('user_id');
  if (!userId) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        
        {/* Protected Routes */}
        <Route path="/dashboard" element={
          <ProtectedRoute><Dashboard /></ProtectedRoute>
        } />
        <Route path="/setup" element={
          <ProtectedRoute><InterviewSetup /></ProtectedRoute>
        } />
        <Route path="/interview" element={
          <ProtectedRoute><InterviewScreen /></ProtectedRoute>
        } />
        <Route path="/results/:id" element={
          <ProtectedRoute><Results /></ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;
