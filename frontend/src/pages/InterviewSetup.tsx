import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function InterviewSetup() {
  const navigate = useNavigate();
  const [role, setRole] = useState('Software Engineer');
  const [type, setType] = useState('Technical');
  const [difficulty, setDifficulty] = useState('Intermediate');
  const [isLoading, setIsLoading] = useState(false);

  const handleStart = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const userId = localStorage.getItem('user_id');
      
      // Send the interview config to our FastAPI backend
      const response = await fetch('http://localhost:8000/interviews/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          role: role,
          difficulty: difficulty,
          type: type,
          user_id: userId
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create interview');
      }

      const data = await response.json();
      console.log("Interview created successfully:", data);

      // Navigate to the interview screen, passing the created interview ID
      // Later, the InterviewScreen will use this ID to save the responses
      navigate(`/interview?id=${data.id}`);

    } catch (error) {
      console.error("Error starting interview:", error);
      alert("Make sure the FastAPI backend is running on port 8000!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5F3] font-sans text-gray-900 flex flex-col items-center justify-center p-6">
      
      {/* Top Navbar Simple */}
      <div className="absolute top-0 left-0 w-full p-8 flex justify-between items-center max-w-[1400px] mx-auto">
        <Link to="/dashboard" className="text-gray-500 hover:text-gray-900 font-bold text-sm tracking-wider flex items-center transition-colors">
          <span className="mr-2">←</span> BACK TO DASHBOARD
        </Link>
        <div className="w-10 h-10 bg-gray-900 text-white rounded-full flex items-center justify-center font-bold text-sm">
          IM
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl bg-white rounded-3xl p-10 md:p-14 shadow-2xl shadow-gray-200/50 border border-white"
      >
        <div className="mb-10 text-center">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">Configure Interview</h1>
          <p className="text-gray-500 font-medium">Set the parameters for your AI mock interview.</p>
        </div>

        <form onSubmit={handleStart} className="space-y-8">
          
          {/* Target Role */}
          <div className="space-y-3">
            <label className="block text-sm font-bold tracking-wider text-gray-700 uppercase">Target Role</label>
            <input 
              type="text" 
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full bg-[#F5F5F3] border-none rounded-xl px-5 py-4 text-gray-900 font-medium focus:ring-2 focus:ring-[#FF5A36] transition-shadow outline-none"
              placeholder="e.g. Frontend Developer, Product Manager"
              required
            />
          </div>

          {/* Interview Type */}
          <div className="space-y-3">
            <label className="block text-sm font-bold tracking-wider text-gray-700 uppercase">Interview Type</label>
            <div className="grid grid-cols-2 gap-4">
              {['Technical', 'HR / Behavioral'].map((t) => (
                <div 
                  key={t}
                  onClick={() => setType(t)}
                  className={`cursor-pointer border-2 rounded-xl px-5 py-4 text-center font-bold transition-all ${type === t ? 'border-[#FF5A36] bg-[#FF5A36]/5 text-[#FF5A36]' : 'border-gray-100 bg-white text-gray-500 hover:border-gray-200'}`}
                >
                  {t}
                </div>
              ))}
            </div>
          </div>

          {/* Difficulty */}
          <div className="space-y-3">
            <label className="block text-sm font-bold tracking-wider text-gray-700 uppercase">Difficulty</label>
            <div className="grid grid-cols-3 gap-4">
              {['Beginner', 'Intermediate', 'Expert'].map((lvl) => (
                <div 
                  key={lvl}
                  onClick={() => setDifficulty(lvl)}
                  className={`cursor-pointer border-2 rounded-xl px-4 py-3 text-center text-sm font-bold transition-all ${difficulty === lvl ? 'border-gray-900 bg-gray-900 text-white' : 'border-gray-100 bg-white text-gray-500 hover:border-gray-200'}`}
                >
                  {lvl}
                </div>
              ))}
            </div>
          </div>

          {/* Submit */}
          <div className="pt-6">
            <button 
              type="submit" 
              disabled={isLoading}
              className={`w-full bg-[#FF5A36] text-white font-bold tracking-wider uppercase rounded-xl py-5 transition-colors shadow-lg shadow-[#FF5A36]/30 ${isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-[#e04829]'}`}
            >
              {isLoading ? 'Creating Session...' : 'Start Session'}
            </button>
          </div>

        </form>
      </motion.div>
    </div>
  );
}
