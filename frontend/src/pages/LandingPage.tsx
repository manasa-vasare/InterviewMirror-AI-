import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#F5F5F3] text-gray-900 font-sans overflow-hidden">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-6 max-w-[1400px] mx-auto">
        <div className="flex items-center space-x-12">
          {/* Logo */}
          <div className="w-10 h-10 bg-gray-900 text-white rounded-full flex items-center justify-center font-bold text-sm">
            IM
          </div>
        </div>
        
        <div className="flex items-center space-x-6">
          <div className="hidden md:flex items-center text-xs font-bold tracking-wider space-x-2">
            <span className="text-[#FF5A36] bg-[#FF5A36]/10 px-2 py-1 rounded-sm">NEWS</span>
            <span className="hover:underline cursor-pointer">GPT-4O INTEGRATION LIVE ›</span>
          </div>
          <Link to="/register" className="px-6 py-3 bg-white border border-gray-200 text-gray-900 text-xs font-bold uppercase tracking-wider rounded-full hover:bg-gray-50 transition shadow-sm">
            Start for free
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-[1400px] mx-auto px-8 pt-16 lg:pt-24 pb-32 relative flex flex-col lg:flex-row">
        
        {/* Left Column */}
        <div className="lg:w-1/2 z-10 relative">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Overline */}
            <div className="inline-block px-3 py-1 bg-[#FF5A36]/10 text-[#FF5A36] text-[10px] font-bold uppercase tracking-widest rounded-sm mb-6">
              From Prep to Offer
            </div>

            {/* Headline */}
            <h1 className="text-[4rem] leading-[1.05] font-medium tracking-tight mb-6 text-gray-900">
              AI Mock Interviews.<br />
              <span className="text-gray-800">Built for Job Seekers.</span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg text-gray-600 mb-8 max-w-md font-medium leading-relaxed">
              Practice technical and HR interviews, get real-time speech analysis, and receive actionable feedback so you never blank on a question again.
            </p>

            {/* CTA Button */}
            <Link to="/dashboard" className="inline-block px-8 py-4 bg-[#FF5A36] text-white text-sm font-bold uppercase tracking-wider rounded-md hover:bg-[#e04829] shadow-lg shadow-[#FF5A36]/30 transition-all transform hover:-translate-y-0.5">
              Start Practicing
            </Link>
          </motion.div>

          {/* Floating Feature Card (Bottom Left) */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-16 w-80 bg-white/80 backdrop-blur-xl p-6 rounded-2xl shadow-xl shadow-gray-200/50 border border-white"
          >
            <div className="text-xs font-bold text-gray-400 tracking-widest mb-1 uppercase">Your AI Coach</div>
            <div className="text-lg font-bold text-gray-900 mb-2">INTERVIEWBOT</div>
            <p className="text-sm text-gray-600 mb-4 font-medium leading-relaxed">
              Analyzes speech patterns, detects filler words, and scores your confidence in real-time.
            </p>
            <div className="flex space-x-2">
              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-[10px] font-bold uppercase rounded">Speech</span>
              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-[10px] font-bold uppercase rounded">Tone</span>
              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-[10px] font-bold uppercase rounded">Feedback</span>
            </div>
          </motion.div>
        </div>

        {/* Right Column / Visuals */}
        <div className="lg:w-1/2 mt-20 lg:mt-0 relative min-h-[500px] flex items-center justify-center">
          
          {/* Abstract background sweep */}
          <div className="absolute right-0 top-0 w-full h-full bg-gradient-to-tr from-[#E5E5E3] to-[#F5F5F3] rounded-full shadow-inner border-[20px] border-white/40 blur-[2px] opacity-70 scale-110 translate-x-20"></div>
          
          {/* Mockup Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative z-20 w-full max-w-md bg-gray-900 rounded-3xl p-6 shadow-2xl border border-gray-700/50"
          >
            {/* Mock Header */}
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-800">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-cyan-400 flex items-center justify-center text-white text-xs font-bold">AI</div>
                <div>
                  <div className="text-white text-sm font-semibold">Gemini 1.5 Flash</div>
                  <div className="text-gray-400 text-xs">Interviewing you for: Frontend Dev</div>
                </div>
              </div>
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                <div className="text-red-500 text-xs font-bold uppercase">REC</div>
              </div>
            </div>

            {/* Mock Question */}
            <div className="text-blue-400 text-xs font-bold uppercase tracking-widest mb-2">Current Question</div>
            <h3 className="text-xl text-white font-medium leading-snug mb-10">
              "Tell me about a time you had to optimize a React application that was rendering too slowly. What was your approach?"
            </h3>

            {/* Mock Orb / Audio visualizer */}
            <div className="flex items-center justify-center h-32 mb-8">
              <div className="relative w-24 h-24 rounded-full bg-gradient-to-tr from-purple-600 to-blue-500 flex items-center justify-center shadow-[0_0_40px_rgba(59,130,246,0.5)]">
                <div className="flex space-x-1">
                  {[1,2,3,4,5].map(i => (
                    <motion.div 
                      key={i}
                      animate={{ height: ['20%', '100%', '20%'] }}
                      transition={{ repeat: Infinity, duration: 0.8, delay: i * 0.1 }}
                      className="w-1 bg-white rounded-full"
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Mock Action */}
            <div className="flex justify-center">
              <div className="bg-white/10 hover:bg-white/20 px-6 py-3 rounded-full text-white text-sm font-bold flex items-center space-x-2 cursor-pointer transition">
                <div className="w-3 h-3 bg-white rounded-sm"></div>
                <span>Finish Answer</span>
              </div>
            </div>
          </motion.div>
          
        </div>
      </main>

      {/* How it works Section */}
      <section className="bg-white py-32 border-t border-gray-100 relative z-20">
        <div className="max-w-[1400px] mx-auto px-8">
          <div className="text-center mb-20">
            <div className="text-[#FF5A36] text-xs font-bold uppercase tracking-widest mb-3">The Process</div>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight">How InterviewMirror Works</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-0.5 bg-gray-100 z-0"></div>

            <div className="relative z-10 bg-white pt-2 text-center flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-2xl font-bold text-gray-900 mb-6 shadow-sm">1</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Configure Role</h3>
              <p className="text-gray-500 font-medium">Select your target job title and difficulty. Our AI instantly generates a hyper-relevant question just for you.</p>
            </div>

            <div className="relative z-10 bg-white pt-2 text-center flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-[#FF5A36]/10 border border-[#FF5A36]/20 flex items-center justify-center text-2xl font-bold text-[#FF5A36] mb-6 shadow-sm">2</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Speak Your Answer</h3>
              <p className="text-gray-500 font-medium">Talk directly into your microphone. Our system securely captures your raw audio just like a real video call.</p>
            </div>

            <div className="relative z-10 bg-white pt-2 text-center flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-2xl font-bold text-gray-900 mb-6 shadow-sm">3</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Get AI Feedback</h3>
              <p className="text-gray-500 font-medium">Gemini transcribes your speech, grades your answer against the question, and gives you actionable feedback.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Simple Footer */}
      <footer className="bg-gray-900 text-gray-500 py-12 text-center text-sm font-medium">
        <p>© 2026 InterviewMirror AI. Built for the modern job seeker.</p>
      </footer>
    </div>
  );
}
