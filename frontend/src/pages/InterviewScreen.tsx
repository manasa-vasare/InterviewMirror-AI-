import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function InterviewScreen() {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');

  // Simulate transcript typing
  useEffect(() => {
    if (isRecording) {
      const fullText = "I believe my biggest strength is my ability to adapt to new technologies quickly. In my last role, I had to learn a completely new tech stack in just two weeks to deliver a critical project on time.";
      let i = 0;
      setTranscript('');
      const interval = setInterval(() => {
        setTranscript(prev => prev + fullText.charAt(i));
        i++;
        if (i >= fullText.length) clearInterval(interval);
      }, 50);
      return () => clearInterval(interval);
    } else {
      setTranscript('');
    }
  }, [isRecording]);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-sans flex flex-col relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-900/20 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Top Bar */}
      <header className="flex items-center justify-between px-8 py-5 border-b border-white/10 z-10 bg-black/30 backdrop-blur-md">
        <div className="flex items-center space-x-4">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white/5 border border-white/10">
            <span className="text-blue-400 text-sm">AI</span>
          </div>
          <div>
            <div className="text-sm font-semibold text-gray-200">Tech Lead Interview</div>
            <div className="text-xs text-gray-500 flex items-center mt-0.5">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse mr-1.5"></span>
              Session Recording
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-6">
          <div className="font-mono text-xl tracking-wider text-gray-300 font-light">14:32</div>
          <Link to="/dashboard" className="px-5 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 text-sm font-medium rounded-full border border-red-500/20 transition-all">
            End Session
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 w-full max-w-5xl mx-auto z-10 relative">
        
        {/* Floating Question Card */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-10 w-full max-w-3xl text-center"
        >
          <div className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-blue-400 text-xs font-bold uppercase tracking-widest mb-4">
            Question 3 of 5
          </div>
          <h2 className="text-3xl md:text-5xl font-semibold leading-tight tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400">
            "Can you tell me about a time you had to learn a new technology on the fly?"
          </h2>
        </motion.div>

        {/* AI Agent Visualization (The Orb) */}
        <div className="relative mt-32 mb-16 flex justify-center items-center h-64 w-64">
          {/* Outer ripples */}
          {isRecording && [1, 2, 3].map((i) => (
            <motion.div 
              key={i}
              initial={{ scale: 0.8, opacity: 0.5 }}
              animate={{ scale: 2, opacity: 0 }}
              transition={{ repeat: Infinity, duration: 2, delay: i * 0.6 }}
              className="absolute inset-0 bg-blue-500/20 rounded-full"
            ></motion.div>
          ))}
          
          {/* Static outer glow */}
          <motion.div 
            animate={{ scale: isRecording ? [1, 1.05, 1] : 1 }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute inset-4 bg-blue-500/30 rounded-full blur-2xl"
          ></motion.div>
          
          {/* Core Orb */}
          <div className={`relative w-32 h-32 rounded-full flex items-center justify-center transition-all duration-700 ${isRecording ? 'bg-gradient-to-tr from-blue-600 to-cyan-400 shadow-[0_0_60px_rgba(56,189,248,0.6)]' : 'bg-gradient-to-tr from-gray-800 to-gray-700 shadow-[0_0_30px_rgba(0,0,0,0.5)] border border-gray-600'}`}>
            {isRecording ? (
               <div className="flex space-x-1 items-center justify-center h-10">
                 {[1, 2, 3, 4, 5].map((i) => (
                   <motion.div
                     key={i}
                     animate={{ height: ['20%', '100%', '20%'] }}
                     transition={{ repeat: Infinity, duration: 0.8, delay: i * 0.1, ease: "easeInOut" }}
                     className="w-1.5 bg-white rounded-full"
                   />
                 ))}
               </div>
            ) : (
               <div className="w-10 h-1 bg-gray-400 rounded-full"></div>
            )}
          </div>
        </div>

        {/* Live Transcript Box */}
        <motion.div 
          layout
          className="w-full max-w-3xl bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-8 min-h-[160px] flex flex-col justify-center relative overflow-hidden"
        >
          {isRecording && (
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500 animate-pulse"></div>
          )}
          
          {isRecording || transcript ? (
            <p className="text-xl md:text-2xl text-gray-200 leading-relaxed font-light">
              {transcript}
              {isRecording && (
                <motion.span 
                  animate={{ opacity: [1, 0] }} 
                  transition={{ repeat: Infinity, duration: 0.8 }}
                  className="inline-block w-2 h-6 bg-blue-400 ml-2 align-middle"
                ></motion.span>
              )}
            </p>
          ) : (
            <div className="text-center">
              <div className="text-4xl mb-3 opacity-50">🎙️</div>
              <p className="text-gray-500 font-medium text-lg">Click the microphone to start answering</p>
            </div>
          )}
        </motion.div>

        {/* Controls */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
          <button 
            onClick={() => setIsRecording(!isRecording)}
            className={`flex items-center space-x-3 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 ${
              isRecording 
                ? 'bg-red-500 hover:bg-red-600 text-white shadow-[0_0_30px_rgba(239,68,68,0.4)]' 
                : 'bg-white text-gray-900 hover:bg-gray-200 shadow-[0_0_30px_rgba(255,255,255,0.2)]'
            }`}
          >
            {isRecording ? (
              <>
                <div className="w-4 h-4 bg-white rounded-sm"></div>
                <span>Finish Answer</span>
              </>
            ) : (
              <>
                <svg className="w-5 h-5 text-gray-900" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd"></path></svg>
                <span>Start Recording</span>
              </>
            )}
          </button>
        </div>

      </main>
    </div>
  );
}
