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
          {/* Nav Links */}
          <div className="hidden md:flex space-x-8 text-xs font-bold tracking-widest text-gray-800 uppercase">
            <a href="#" className="hover:text-black">About</a>
            <a href="#" className="hover:text-black">Product</a>
            <a href="#" className="hover:text-black">Use Cases</a>
            <a href="#" className="hover:text-black">Blog</a>
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
        <div className="lg:w-1/2 mt-20 lg:mt-0 relative h-[600px]">
          
          {/* Abstract sweeping background shape mimicking the video arc */}
          <div className="absolute right-[-10%] top-0 w-[800px] h-[800px] bg-gradient-to-tr from-gray-200 to-[#F5F5F3] rounded-full shadow-inner border-[40px] border-white/40 blur-[2px] opacity-70"></div>
          
          {/* Floating animated UI elements */}
          <motion.div 
             animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
             transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
             className="absolute top-[20%] right-[30%] w-24 h-24 bg-[#4A3AFF] rounded-full shadow-2xl flex items-center justify-center text-white text-3xl font-bold shadow-[#4A3AFF]/40"
          >
            ⚛️
          </motion.div>

          <motion.div 
             animate={{ y: [0, 30, 0], x: [0, -10, 0] }}
             transition={{ repeat: Infinity, duration: 8, ease: "easeInOut", delay: 1 }}
             className="absolute bottom-[30%] left-[10%] w-20 h-20 bg-[#1E293B] rounded-full shadow-2xl flex items-center justify-center text-white text-2xl shadow-gray-900/30"
          >
            🎙️
          </motion.div>

          {/* Stats aligned to the right */}
          <div className="absolute right-0 top-1/3 flex flex-col space-y-10 text-right pr-8">
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
              <div className="text-4xl font-bold text-gray-900 mb-1">100%</div>
              <div className="text-xs font-bold text-gray-500 uppercase tracking-widest">Confidence</div>
            </motion.div>
            
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }}>
              <div className="text-4xl font-bold text-gray-900 mb-1">10x</div>
              <div className="text-xs font-bold text-gray-500 uppercase tracking-widest">More Practice</div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.7 }}>
              <div className="text-4xl font-bold text-gray-900 mb-1">24/7</div>
              <div className="text-xs font-bold text-gray-500 uppercase tracking-widest">Availability</div>
            </motion.div>
          </div>
          
        </div>
      </main>
    </div>
  );
}
