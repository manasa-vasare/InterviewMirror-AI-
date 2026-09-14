import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// Define the type corresponding to our FastAPI backend response
interface Interview {
  id: string;
  role: string;
  difficulty: string;
  score: number | null;
  created_at: string;
}

export default function Dashboard() {
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch real data from FastAPI backend
  useEffect(() => {
    const fetchInterviews = async () => {
      try {
        const response = await fetch('http://localhost:8000/interviews/');
        if (response.ok) {
          const data = await response.json();
          setInterviews(data);
        }
      } catch (error) {
        console.error('Failed to fetch interviews:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInterviews();
  }, []);

  const stats = [
    { label: 'Interviews Completed', value: interviews.length.toString() },
    { label: 'Average Score', value: interviews.length > 0 && interviews.some(i => i.score) 
      ? Math.round(interviews.reduce((acc, curr) => acc + (curr.score || 0), 0) / interviews.filter(i => i.score !== null).length) + '%' 
      : 'N/A' },
    { label: 'Top Skill', value: 'Pending' },
  ];

  // Helper to format real timestamps
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="min-h-screen bg-[#F5F5F3] font-sans">
      {/* Top Navbar */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-[1400px] mx-auto px-8 py-5 flex justify-between items-center">
          <Link to="/" className="text-xl font-extrabold text-gray-900 tracking-tight">
            InterviewMirror AI
          </Link>
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center text-white font-bold text-sm">
              IM
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-[1400px] mx-auto px-8 py-12">
        {/* Header & CTA */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2 tracking-tight">Welcome back! 👋</h1>
            <p className="text-gray-500 font-medium text-lg">Ready to ace your next interview?</p>
          </div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="mt-6 md:mt-0">
            <Link to="/setup" className="inline-flex items-center px-8 py-4 bg-[#FF5A36] text-white font-bold uppercase tracking-wider rounded-xl hover:bg-[#e04829] shadow-lg shadow-[#FF5A36]/30 transition-all">
              <span className="mr-2">➕</span> Start New Interview
            </Link>
          </motion.div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm"
            >
              <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">{stat.label}</div>
              <div className="text-4xl font-bold text-gray-900">{stat.value}</div>
            </motion.div>
          ))}
        </div>

        {/* Recent Interviews */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-8 py-6 border-b border-gray-100 bg-gray-50/50">
            <h2 className="text-xl font-bold text-gray-900 tracking-tight">Interview History</h2>
          </div>
          
          <div className="divide-y divide-gray-100 min-h-[200px]">
            {isLoading ? (
              <div className="p-8 text-center text-gray-500 font-medium">Loading your real-time data...</div>
            ) : interviews.length === 0 ? (
              <div className="p-12 text-center">
                <div className="text-4xl mb-4">📭</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">No interviews yet</h3>
                <p className="text-gray-500 mb-6">Create your first mock interview to get started.</p>
                <Link to="/setup" className="px-6 py-3 bg-gray-900 text-white font-bold uppercase text-xs tracking-wider rounded-full hover:bg-gray-800">
                  Create Interview
                </Link>
              </div>
            ) : (
              interviews.map((interview) => (
                <div key={interview.id} className="p-8 flex flex-col md:flex-row md:items-center justify-between hover:bg-gray-50 transition-colors">
                  <div className="mb-4 md:mb-0">
                    <h3 className="text-xl font-bold text-gray-900">{interview.role}</h3>
                    <div className="flex items-center text-sm mt-2 space-x-3">
                      <span className="bg-gray-100 px-3 py-1 rounded text-xs font-bold uppercase tracking-wider text-gray-600">
                        {interview.difficulty}
                      </span>
                      <span className="text-gray-500 font-medium">{formatDate(interview.created_at)}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-8">
                    <div className="text-right">
                      <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Score</div>
                      <div className={`text-xl font-bold ${interview.score ? (interview.score >= 80 ? 'text-green-500' : 'text-yellow-500') : 'text-gray-400'}`}>
                        {interview.score ? `${interview.score}/100` : 'Pending'}
                      </div>
                    </div>
                    <Link to={`/results/${interview.id}`} className="px-5 py-3 bg-white border border-gray-200 text-gray-900 text-xs font-bold uppercase tracking-wider rounded-full hover:bg-gray-50 transition shadow-sm">
                      View Report
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
