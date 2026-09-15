import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';

export default function InterviewScreen() {
  const [searchParams] = useSearchParams();
  const interviewId = searchParams.get('id');
  const navigate = useNavigate();

  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [question, setQuestion] = useState('Loading question...');
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  useEffect(() => {
    const fetchInterview = async () => {
      if (!interviewId) return;
      try {
        const response = await fetch(`http://localhost:8000/interviews/${interviewId}`);
        if (response.ok) {
          const data = await response.json();
          setQuestion(data.current_question || 'Can you tell me about yourself?');
        }
      } catch (e) {
        console.error("Failed to fetch interview", e);
      }
    };
    fetchInterview();
  }, [interviewId]);

  const startRecording = async () => {
    try {
      setErrorMessage('');
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        
        setIsProcessing(true);
        try {
          // Prepare FormData to send audio and metadata to backend
          const formData = new FormData();
          formData.append('audio_file', audioBlob, 'answer.webm');
          formData.append('interview_id', interviewId || 'demo');
          formData.append('question', question);

          const response = await fetch('http://localhost:8000/submit_audio/', {
            method: 'POST',
            body: formData,
          });

          if (!response.ok) {
            const errData = await response.json();
            throw new Error(errData.detail || 'Failed to process audio');
          }

          const data = await response.json();
          console.log("AI Response:", data);
          
          // Navigate to results page after processing
          navigate(`/results/${interviewId || 'demo'}`);

        } catch (error: any) {
          console.error("Error submitting audio:", error);
          setErrorMessage(error.message || "Failed to contact AI server. Did you set the API key?");
          setIsProcessing(false);
        }
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) {
      console.error("Microphone access error:", err);
      setErrorMessage('Microphone access denied or unavailable. Please check your browser permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      setIsRecording(false);
    }
  };

  const handleToggleRecording = () => {
    if (!isRecording) {
      startRecording();
    } else {
      stopRecording();
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-sans flex flex-col relative overflow-hidden">
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
              {isRecording ? (
                <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse mr-1.5"></span>
              ) : (
                <span className="w-2 h-2 bg-gray-500 rounded-full mr-1.5"></span>
              )}
              Session ID: {interviewId?.split('-')[0] || 'Demo'}
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-6">
          <Link to={`/results/${interviewId || 'demo'}`} className="px-5 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 text-sm font-medium rounded-full border border-red-500/20 transition-all">
            End Session
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 w-full max-w-5xl mx-auto z-10 relative">
        
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-10 w-full max-w-3xl text-center"
        >
          <div className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-blue-400 text-xs font-bold uppercase tracking-widest mb-4">
            Question 1 of 5
          </div>
          <h2 className="text-3xl md:text-5xl font-semibold leading-tight tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400">
            "{question}"
          </h2>
        </motion.div>

        {/* AI Agent Visualization (The Orb) */}
        <div className="relative mt-32 mb-10 flex justify-center items-center h-64 w-64">
          {/* Outer ripples */}
          {(isRecording || isProcessing) && [1, 2, 3].map((i) => (
            <motion.div 
              key={i}
              initial={{ scale: 0.8, opacity: 0.5 }}
              animate={{ scale: 2, opacity: 0 }}
              transition={{ repeat: Infinity, duration: 2, delay: i * 0.6 }}
              className={`absolute inset-0 rounded-full ${isProcessing ? 'bg-purple-500/20' : 'bg-blue-500/20'}`}
            ></motion.div>
          ))}
          
          {/* Static outer glow */}
          <motion.div 
            animate={{ scale: isRecording ? [1, 1.05, 1] : 1 }}
            transition={{ repeat: Infinity, duration: 2 }}
            className={`absolute inset-4 rounded-full blur-2xl ${isProcessing ? 'bg-purple-500/30' : 'bg-blue-500/30'}`}
          ></motion.div>
          
          {/* Core Orb */}
          <div className={`relative w-32 h-32 rounded-full flex items-center justify-center transition-all duration-700 ${isRecording ? 'bg-gradient-to-tr from-blue-600 to-cyan-400 shadow-[0_0_60px_rgba(56,189,248,0.6)]' : isProcessing ? 'bg-gradient-to-tr from-purple-600 to-pink-500 shadow-[0_0_60px_rgba(168,85,247,0.6)] animate-pulse' : 'bg-gradient-to-tr from-gray-800 to-gray-700 shadow-[0_0_30px_rgba(0,0,0,0.5)] border border-gray-600'}`}>
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
            ) : isProcessing ? (
                <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
               <div className="w-10 h-1 bg-gray-400 rounded-full"></div>
            )}
          </div>
        </div>

        {/* Error Message */}
        {errorMessage && (
          <div className="mb-4 px-6 py-3 bg-red-500/20 border border-red-500/50 text-red-200 rounded-lg text-center max-w-xl">
            {errorMessage}
          </div>
        )}

        {/* Status Box */}
        <motion.div 
          layout
          className="w-full max-w-3xl bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-8 min-h-[160px] flex flex-col justify-center relative overflow-hidden mb-10"
        >
          {isRecording && (
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500 animate-pulse"></div>
          )}
          {isProcessing && (
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-pink-400 to-purple-500 animate-pulse"></div>
          )}
          
          <div className="text-center">
            {isRecording ? (
              <>
                <div className="text-4xl mb-3 animate-pulse">🔴</div>
                <p className="text-blue-200 font-medium text-lg">Recording your answer securely...</p>
                <p className="text-gray-500 text-sm mt-2">Speak clearly into your microphone.</p>
              </>
            ) : isProcessing ? (
              <>
                <div className="text-4xl mb-3">🧠</div>
                <p className="text-purple-300 font-medium text-lg">AI is analyzing your answer...</p>
                <p className="text-gray-500 text-sm mt-2">Transcribing and generating feedback. This takes a few seconds.</p>
              </>
            ) : (
              <>
                <div className="text-4xl mb-3 opacity-50">🎙️</div>
                <p className="text-gray-500 font-medium text-lg">Click the microphone to record your answer</p>
              </>
            )}
          </div>
        </motion.div>

        {/* Controls */}
        <div className="flex justify-center">
          <button 
            onClick={handleToggleRecording}
            disabled={isProcessing}
            className={`flex items-center space-x-3 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 transform ${isProcessing ? 'opacity-50 cursor-not-allowed bg-gray-700 text-white' : 'hover:scale-105'} ${
              isRecording 
                ? 'bg-red-500 hover:bg-red-600 text-white shadow-[0_0_30px_rgba(239,68,68,0.4)]' 
                : !isProcessing ? 'bg-white text-gray-900 hover:bg-gray-200 shadow-[0_0_30px_rgba(255,255,255,0.2)]' : ''
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
