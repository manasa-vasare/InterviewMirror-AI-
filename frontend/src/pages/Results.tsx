import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';

interface ResponseData {
  id: string;
  question: string;
  transcript: string;
  feedback: string;
  confidence_score: number;
}

interface InterviewData {
  id: string;
  role: string;
  difficulty: string;
  score: number | null;
  created_at: string;
  responses: ResponseData[];
}

export default function Results() {
  const { id } = useParams();
  const [interview, setInterview] = useState<InterviewData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await fetch(`http://localhost:8000/interviews/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch interview results');
        }
        const data = await response.json();
        setInterview(data);
      } catch (err: any) {
        console.error(err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchResults();
    }
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F5F5F3] flex items-center justify-center font-sans">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gray-200 border-t-[#FF5A36] rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500 font-medium">Loading your AI assessment...</p>
        </div>
      </div>
    );
  }

  if (error || !interview) {
    return (
      <div className="min-h-screen bg-[#F5F5F3] flex items-center justify-center font-sans">
        <div className="text-center bg-white p-10 rounded-2xl shadow-sm border border-gray-100 max-w-md w-full mx-4">
          <div className="text-5xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Results Not Found</h2>
          <p className="text-gray-500 mb-8">{error || "We couldn't find the results for this interview."}</p>
          <Link to="/dashboard" className="w-full block bg-gray-900 text-white font-bold py-4 rounded-xl hover:bg-gray-800 transition">
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F5F3] font-sans pb-20">
      
      {/* Top Navbar Simple */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-[1000px] mx-auto px-8 py-5 flex justify-between items-center">
          <Link to="/dashboard" className="text-gray-500 hover:text-gray-900 font-bold text-sm tracking-wider flex items-center transition-colors">
            <span className="mr-2">←</span> DASHBOARD
          </Link>
          <div className="text-sm font-bold tracking-widest text-gray-400 uppercase">Assessment Report</div>
        </div>
      </nav>

      <main className="max-w-[1000px] mx-auto px-8 mt-12">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center space-x-2 bg-white px-3 py-1 rounded-full border border-gray-200 text-xs font-bold uppercase tracking-wider text-gray-500 mb-4">
              <span>{interview.difficulty}</span>
              <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
              <span>{interview.role}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">Interview Results</h1>
          </div>
          
          <div className="mt-8 md:mt-0 text-left md:text-right bg-white px-8 py-6 rounded-3xl border border-gray-100 shadow-sm flex items-center space-x-6">
            <div>
              <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Overall Score</div>
              <div className="text-4xl font-black text-gray-900">{interview.score || 0}<span className="text-xl text-gray-400 font-medium">/100</span></div>
            </div>
            <div className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl shadow-inner ${interview.score && interview.score >= 80 ? 'bg-green-100' : interview.score && interview.score >= 60 ? 'bg-yellow-100' : 'bg-red-100'}`}>
              {interview.score && interview.score >= 80 ? '🏆' : interview.score && interview.score >= 60 ? '👍' : '📚'}
            </div>
          </div>
        </div>

        {/* Responses Loop */}
        <div className="space-y-8">
          {interview.responses.length === 0 ? (
            <div className="bg-white rounded-3xl p-10 text-center border border-gray-100 shadow-sm">
              <div className="text-4xl mb-4">📭</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No answers recorded</h3>
              <p className="text-gray-500">You didn't answer any questions in this session.</p>
            </div>
          ) : (
            interview.responses.map((res, idx) => (
              <motion.div 
                key={res.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100"
              >
                {/* Question Header */}
                <div className="bg-gray-900 p-8 text-white">
                  <div className="text-blue-400 text-xs font-bold uppercase tracking-widest mb-3">Question {idx + 1}</div>
                  <h3 className="text-2xl font-semibold leading-snug">"{res.question}"</h3>
                </div>

                <div className="p-8 md:p-10 grid grid-cols-1 lg:grid-cols-2 gap-10">
                  
                  {/* Left Col: Transcript */}
                  <div>
                    <div className="flex items-center space-x-2 mb-4">
                      <span className="text-xl">🎙️</span>
                      <h4 className="text-sm font-bold text-gray-900 uppercase tracking-widest">What you said</h4>
                    </div>
                    <div className="bg-gray-50 rounded-2xl p-6 text-gray-600 leading-relaxed font-medium border border-gray-100">
                      "{res.transcript || "No transcript available."}"
                    </div>
                  </div>

                  {/* Right Col: AI Feedback */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <span className="text-xl">🤖</span>
                        <h4 className="text-sm font-bold text-gray-900 uppercase tracking-widest">AI Feedback</h4>
                      </div>
                      <div className="text-sm font-bold">
                        Score: <span className={res.confidence_score >= 80 ? 'text-green-500' : 'text-yellow-500'}>{res.confidence_score}/100</span>
                      </div>
                    </div>
                    <div className="prose prose-sm text-gray-600">
                      <p>{res.feedback || "No feedback available."}</p>
                    </div>
                  </div>

                </div>
              </motion.div>
            ))
          )}
        </div>

      </main>
    </div>
  );
}
