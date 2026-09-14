import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Results() {
  // Placeholder mock data
  const overallScore = 85;
  
  const metrics = [
    { label: 'Filler Words', value: '12', description: 'ums, uhs, likes' },
    { label: 'Pacing', value: 'Good', description: '135 words/min' },
    { label: 'Confidence', value: 'High', description: 'Based on tone' }
  ];

  const feedbackItems = [
    {
      id: 1,
      question: "Can you tell me about a time you had to learn a new technology on the fly?",
      transcript: "I believe my biggest strength is my ability to adapt to new technologies quickly. In my last role, I had to learn a completely new tech stack in just two weeks to deliver a critical project on time.",
      feedback: "Excellent answer. You directly addressed the question and provided a concrete timeline (two weeks) which adds credibility. To improve, briefly mention *which* specific technology you learned to add more technical depth.",
      score: 90
    },
    {
      id: 2,
      question: "How do you handle disagreements with a team member?",
      transcript: "Uh, I usually just try to talk it out. Like, I will schedule a meeting and we just discuss it until we agree on something.",
      feedback: "A bit too casual. You used filler words ('Uh', 'Like') which lowered your confidence score here. Try using the STAR method (Situation, Task, Action, Result) to structure behavioral answers more professionally.",
      score: 70
    }
  ];

  return (
    <div className="min-h-screen bg-[#F5F5F3] font-sans text-gray-900 pb-20">
      {/* Top Navbar Simple */}
      <div className="w-full p-8 flex justify-between items-center max-w-[1400px] mx-auto">
        <Link to="/dashboard" className="text-gray-500 hover:text-gray-900 font-bold text-sm tracking-wider flex items-center transition-colors">
          <span className="mr-2">←</span> BACK TO DASHBOARD
        </Link>
        <div className="text-sm font-bold tracking-widest text-gray-400 uppercase">
          Interview Report
        </div>
      </div>

      <main className="max-w-5xl mx-auto px-6 pt-4">
        
        {/* Header / Score Section */}
        <div className="flex flex-col md:flex-row items-center justify-between bg-white rounded-3xl p-10 mb-8 shadow-sm border border-gray-100">
          <div>
            <h1 className="text-4xl font-bold tracking-tight mb-2">Great job, John!</h1>
            <p className="text-gray-500 font-medium text-lg">Here is your AI-generated performance report.</p>
          </div>
          <div className="mt-8 md:mt-0 flex items-center space-x-6">
            <div className="text-right">
              <div className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">Overall Score</div>
              <div className="text-5xl font-black text-[#FF5A36]">{overallScore}<span className="text-2xl text-gray-300">/100</span></div>
            </div>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {metrics.map((metric, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
            >
              <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">{metric.label}</div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</div>
              <div className="text-sm text-gray-500">{metric.description}</div>
            </motion.div>
          ))}
        </div>

        {/* Detailed Feedback List */}
        <h2 className="text-2xl font-bold tracking-tight mb-6 px-2">Detailed Breakdown</h2>
        
        <div className="space-y-6">
          {feedbackItems.map((item, idx) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + (idx * 0.1) }}
              className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="inline-block px-3 py-1 bg-gray-100 text-gray-600 text-xs font-bold uppercase tracking-widest rounded mb-4">
                  Question {item.id}
                </div>
                <div className={`font-bold text-lg ${item.score >= 80 ? 'text-green-500' : 'text-yellow-500'}`}>
                  {item.score}/100
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-4 leading-snug">
                {item.question}
              </h3>
              
              <div className="bg-[#F5F5F3] p-5 rounded-xl mb-6">
                <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Your Answer</div>
                <p className="text-gray-700 italic">"{item.transcript}"</p>
              </div>
              
              <div>
                <div className="text-xs font-bold text-[#FF5A36] uppercase tracking-widest mb-2">AI Feedback</div>
                <p className="text-gray-800 font-medium leading-relaxed">
                  {item.feedback}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </main>
    </div>
  );
}
