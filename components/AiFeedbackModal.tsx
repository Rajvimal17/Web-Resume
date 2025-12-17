import React, { useEffect, useState } from 'react';
import { AiFeedbackResponse } from '../types';
import { X, CheckCircle, TrendingUp, ShieldCheck, Download, Activity, Target, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { playUmpireSequence, cancelUmpireAudio, playClickSound } from '../utils/audio';

interface Props {
  feedback: AiFeedbackResponse | null;
  isOpen: boolean;
  onClose: () => void;
  isLoading: boolean;
  error: string | null;
}

type ReviewStage = 
  | 'INIT'              // "Checking with the TV Umpire..."
  | 'ULTRA_EDGE'        // "Checking for SEO Edge..."
  | 'BALL_TRACKING'     // "Tracking Impact..."
  | 'DECISION_PENDING'  // "Review in Progress..."
  | 'RESULT';           // "Decision Made"

export const AiFeedbackModal: React.FC<Props> = ({ feedback, isOpen, onClose, isLoading, error }) => {
  const [stage, setStage] = useState<ReviewStage>('INIT');
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    let frameInterval: any;
    
    // START OF REVIEW SEQUENCE
    if (isOpen && isLoading) {
      setStage('INIT');
      
      // Frame counter for realistic TV broadcast feel
      frameInterval = setInterval(() => setFrame(prev => prev + 1), 40);

      // Audio Script - Punchy 4.5s Sequence
      playUmpireSequence([
        "Director, checking role fit.",
        "Clear spike on skills.",
        "Tracking impact now...",
        "Pitching in line...",
        "I have a decision."
      ]);

      // Stage Timing (Synced tightly with 4.5s total wait time)
      const t1 = setTimeout(() => setStage('ULTRA_EDGE'), 1200);      // 1.2s: Snickometer
      const t2 = setTimeout(() => setStage('BALL_TRACKING'), 2600);   // 2.6s: Ball Tracking
      const t3 = setTimeout(() => setStage('DECISION_PENDING'), 4000); // 4.0s: Decision Screen
      
      // Note: The transition to 'RESULT' happens when isLoading becomes false (controlled by App.tsx)

      return () => {
        clearInterval(frameInterval);
        clearTimeout(t1); clearTimeout(t2); clearTimeout(t3);
        cancelUmpireAudio();
      };
    } 
    
    // END OF SEQUENCE - SHOW RESULT
    if (isOpen && !isLoading && feedback) {
      setStage('RESULT');
    }

  }, [isOpen, isLoading, feedback]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/95 backdrop-blur-xl p-0 md:p-4 font-sport overflow-hidden">
      <AnimatePresence mode="wait">
        
        {/* === BROADCAST CONTAINER === */}
        {(isLoading || stage !== 'RESULT') && (
          <motion.div 
            key="broadcast"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: "brightness(2)" }}
            className="w-full max-w-6xl aspect-video bg-[#050505] rounded-lg overflow-hidden relative border-y-8 border-game-india-blue shadow-[0_0_100px_rgba(19,99,223,0.2)] flex flex-col"
          >
             {/* TV Overlay Effects */}
             <div className="absolute inset-0 pointer-events-none z-50 bg-[url('https://www.transparenttextures.com/patterns/pixel-weave.png')] opacity-10"></div>
             <div className="absolute top-8 right-8 z-50 flex flex-col items-end gap-1">
                <div className="flex items-center gap-2 bg-red-600 text-white px-2 py-0.5 rounded-sm font-bold text-xs animate-pulse">
                   <div className="w-2 h-2 bg-white rounded-full"></div> LIVE
                </div>
                <div className="text-game-india-blue font-mono text-xs font-bold">CAM 1 [DRS]</div>
             </div>

             {/* Bottom Ticker/Status Bar */}
             <div className="absolute bottom-12 left-0 w-full z-50 px-12">
                <div className="flex items-center gap-4">
                   <div className="bg-white text-black font-bold px-4 py-2 transform skew-x-[-15deg] border-l-4 border-game-india-orange shadow-[0_0_15px_white]">
                      <span className="transform skew-x-[15deg] block text-xl tracking-tighter">DECISION REVIEW SYSTEM</span>
                   </div>
                   <div className="h-10 w-px bg-white/30"></div>
                   <div className="text-white/80 font-mono text-sm tracking-widest">
                      FRAME: {3400 + frame} // ISO: 800 // S: 1/500
                   </div>
                </div>
             </div>

             {/* MAIN CONTENT STAGE */}
             <div className="flex-1 relative flex items-center justify-center">
                
                {/* 1. INIT: CONTACTING UMPIRE */}
                {stage === 'INIT' && (
                   <motion.div 
                     initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                     className="flex flex-col items-center gap-6"
                   >
                      <div className="relative">
                         <div className="absolute inset-0 bg-game-india-blue/30 blur-xl rounded-full animate-ping"></div>
                         <Activity size={80} className="text-game-india-blue relative z-10 animate-pulse" />
                      </div>
                      <h2 className="text-4xl text-white font-bold tracking-widest uppercase italic">Contacting Third Umpire...</h2>
                   </motion.div>
                )}

                {/* 2. ULTRA EDGE (SEO SPIKE) */}
                {stage === 'ULTRA_EDGE' && (
                   <div className="w-full h-full flex flex-col relative bg-[#0a0a0a]">
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
                      
                      {/* Split Screen Effect */}
                      <div className="flex-1 flex relative">
                         {/* Left: Resume Data */}
                         <div className="w-1/2 border-r border-white/10 p-12 flex flex-col justify-center items-end bg-gradient-to-l from-blue-900/10 to-transparent">
                            <h3 className="text-game-india-orange text-2xl font-bold uppercase mb-2">Skill Check</h3>
                            <div className="text-6xl font-bold text-white tracking-tighter">SEO</div>
                         </div>
                         {/* Right: Gap */}
                         <div className="w-1/2 p-12 flex flex-col justify-center items-start bg-gradient-to-r from-blue-900/10 to-transparent">
                            <h3 className="text-gray-500 text-2xl font-bold uppercase mb-2">Gap Analysis</h3>
                            <div className="text-6xl font-bold text-gray-600 tracking-tighter">CLEAR</div>
                         </div>
                         
                         {/* The Edge Line */}
                         <div className="absolute inset-y-0 left-1/2 w-0.5 bg-white/20"></div>
                      </div>

                      {/* Snickometer Graph */}
                      <div className="h-48 bg-[#000] border-t-2 border-white/20 relative flex items-end justify-center pb-0 overflow-hidden">
                          <div className="absolute top-2 left-4 text-white font-mono text-xs">AUDIO: CHANNEL 1</div>
                          {/* Random Noise */}
                          <div className="flex items-end gap-1 w-full justify-center opacity-30">
                             {[...Array(50)].map((_, i) => (
                                <div key={i} className="w-2 bg-gray-600" style={{ height: Math.random() * 20 + '%' }}></div>
                             ))}
                          </div>
                          {/* The Big Spike (The Edge) - Faster animation */}
                          <motion.div 
                             initial={{ height: 0 }} animate={{ height: '80%' }}
                             transition={{ type: 'spring', stiffness: 500, damping: 15 }}
                             className="absolute bottom-0 w-4 bg-white shadow-[0_0_30px_white]"
                          />
                          <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3 }}
                            className="absolute bottom-10 text-white font-bold tracking-widest text-2xl bg-black/50 px-4 border border-white/20"
                          >
                             IMPACT CONFIRMED
                          </motion.div>
                      </div>
                      
                      <div className="absolute top-12 left-12 bg-blue-600 text-white px-4 py-1 font-bold text-lg transform skew-x-[-10deg]">
                         ULTRA EDGE
                      </div>
                   </div>
                )}

                {/* 3. BALL TRACKING (IMPACT) */}
                {stage === 'BALL_TRACKING' && (
                   <div className="w-full h-full relative bg-gradient-to-b from-slate-900 to-green-950 perspective-[1000px]">
                      
                      <div className="absolute top-12 left-12 bg-game-india-orange text-black px-4 py-1 font-bold text-lg transform skew-x-[-10deg] z-50">
                         BALL TRACKING
                      </div>

                      {/* 3D Pitch View */}
                      <div className="absolute inset-0 flex items-center justify-center transform rotate-x-[40deg] scale-125">
                         {/* Pitch */}
                         <div className="w-[300px] h-[800px] bg-[#dcb164] border-x-[20px] border-white/10 relative shadow-2xl overflow-hidden">
                             
                             {/* Stumps (Target/KPIs) */}
                             <div className="absolute top-0 left-1/2 -translate-x-1/2 flex gap-3 -mt-24 z-10">
                                {/* Animated Stumps - Fly on impact */}
                                <motion.div 
                                  initial={{ y: 0 }} 
                                  animate={{ y: -50, x: -10, rotate: -15 }} 
                                  transition={{ delay: 1, duration: 0.3, ease: "easeOut" }} 
                                  className="w-3 h-28 bg-yellow-400 shadow-[0_0_10px_black] border border-black/20"
                                ></motion.div>
                                <motion.div 
                                  initial={{ y: 0 }} 
                                  animate={{ y: -60, rotate: 5 }} 
                                  transition={{ delay: 1, duration: 0.3, ease: "easeOut" }} 
                                  className="w-3 h-28 bg-yellow-400 shadow-[0_0_10px_black] border border-black/20"
                                ></motion.div>
                                <motion.div 
                                  initial={{ y: 0 }} 
                                  animate={{ y: -40, x: 10, rotate: 20 }} 
                                  transition={{ delay: 1, duration: 0.3, ease: "easeOut" }} 
                                  className="w-3 h-28 bg-yellow-400 shadow-[0_0_10px_black] border border-black/20"
                                ></motion.div>
                             </div>

                             {/* Path Tracer (Gradient Line) */}
                             <svg className="absolute inset-0 w-full h-full overflow-visible pointer-events-none">
                                <defs>
                                  <linearGradient id="tracerGradient" x1="0%" y1="100%" x2="0%" y2="0%">
                                    <stop offset="0%" stopColor="rgba(239, 68, 68, 0)" />
                                    <stop offset="100%" stopColor="#ef4444" />
                                  </linearGradient>
                                </defs>
                                <motion.path
                                  d="M 150 800 L 150 0"
                                  fill="none"
                                  stroke="url(#tracerGradient)"
                                  strokeWidth="10"
                                  strokeLinecap="round"
                                  initial={{ pathLength: 0, opacity: 0.5 }}
                                  animate={{ pathLength: 1, opacity: 1 }}
                                  transition={{ duration: 1, ease: "linear" }}
                                />
                             </svg>

                             {/* The Ball */}
                             <motion.div 
                               initial={{ bottom: -20, scale: 0.5 }}
                               animate={{ bottom: "100%", scale: 0.9 }}
                               transition={{ duration: 1, ease: "linear" }}
                               className="absolute left-1/2 -translate-x-1/2 w-6 h-6 bg-red-600 rounded-full shadow-[0_0_20px_red] z-20 flex items-center justify-center"
                             >
                               <div className="w-full h-full rounded-full border border-white/40 animate-spin"></div>
                             </motion.div>
                             
                             {/* Impact Explosion */}
                             <motion.div 
                               initial={{ opacity: 0, scale: 0 }} 
                               animate={{ opacity: 1, scale: 2.5 }}
                               transition={{ delay: 1, duration: 0.2 }}
                               className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-24 bg-white/40 rounded-full blur-xl"
                             />
                         </div>
                      </div>

                      {/* Data Overlay */}
                      <div className="absolute right-12 top-1/3 flex flex-col gap-2">
                         <motion.div 
                            initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }}
                            className="bg-black/80 backdrop-blur border-l-4 border-game-india-blue p-4 w-64 transform skew-x-[-5deg]"
                         >
                            <div className="text-gray-400 text-xs font-bold uppercase">Candidate Fit</div>
                            <div className="text-white text-xl font-bold">IN LINE</div>
                         </motion.div>
                         <motion.div 
                            initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.4 }}
                            className="bg-black/80 backdrop-blur border-l-4 border-game-india-blue p-4 w-64 transform skew-x-[-5deg]"
                         >
                            <div className="text-gray-400 text-xs font-bold uppercase">Impact</div>
                            <div className="text-white text-xl font-bold">HIGH REVENUE</div>
                         </motion.div>
                         <motion.div 
                            initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.6 }}
                            className="bg-black/80 backdrop-blur border-l-4 border-game-india-blue p-4 w-64 transform skew-x-[-5deg]"
                         >
                            <div className="text-gray-400 text-xs font-bold uppercase">KPIs</div>
                            <div className="text-white text-xl font-bold">HITTING</div>
                         </motion.div>
                      </div>
                   </div>
                )}

                {/* 4. REVIEW IN PROGRESS */}
                {stage === 'DECISION_PENDING' && (
                   <div className="w-full h-full bg-black flex flex-col items-center justify-center relative">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-900/40 via-black to-black animate-pulse"></div>
                      <h1 className="text-white text-8xl font-black uppercase tracking-tighter italic z-10 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
                         Review
                      </h1>
                      <div className="bg-red-600 text-black font-bold text-4xl px-8 py-2 mt-4 transform skew-x-[-15deg] z-10">
                         IN PROGRESS
                      </div>
                   </div>
                )}
             </div>
          </motion.div>
        )}

        {/* === THE RESULT CARD (ELIGIBLE TO HIRE) === */}
        {(!isLoading || stage === 'RESULT') && feedback && (
           <motion.div 
            key="result"
            initial={{ scale: 0.8, opacity: 0, rotateX: 20 }} 
            animate={{ scale: 1, opacity: 1, rotateX: 0 }} 
            transition={{ type: "spring", bounce: 0.4 }}
            className="w-full max-w-5xl bg-[#0f172a] rounded-lg shadow-[0_0_100px_rgba(0,255,100,0.2)] overflow-hidden border border-white/10 flex flex-col max-h-[90vh] relative z-50 font-sans"
          >
             {/* HEADER */}
             <div className="bg-gradient-to-r from-green-700 to-emerald-900 p-6 flex items-center justify-between border-b border-white/10 relative overflow-hidden">
                 <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
                 
                 <div className="relative z-10 flex items-center gap-4">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg border-4 border-green-500">
                       <CheckCircle size={32} className="text-green-600" />
                    </div>
                    <div>
                       <div className="text-green-200 font-bold uppercase tracking-widest text-xs mb-1">Third Umpire Decision</div>
                       <h2 className="text-3xl md:text-4xl font-sport font-bold text-white uppercase italic tracking-wide">
                          ELIGIBLE TO HIRE
                       </h2>
                    </div>
                 </div>

                 <button onClick={onClose} className="relative z-10 bg-black/20 hover:bg-black/40 text-white p-2 rounded-full transition">
                    <X size={24} />
                 </button>
             </div>

             {/* CONTENT */}
             <div className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-10 bg-gradient-to-br from-[#0f172a] to-[#020617]">
                
                {/* Score & Badge */}
                <div className="flex items-center justify-between mb-8">
                   <div className="bg-white/5 border border-white/10 px-6 py-4 rounded-lg backdrop-blur-sm">
                      <div className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Market Fit Score</div>
                      <div className="text-5xl font-sport font-bold text-game-india-blue text-glow">{feedback.score}<span className="text-2xl text-slate-500">/100</span></div>
                   </div>
                   <div className="text-right">
                      <div className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Role Match</div>
                      <div className="text-3xl font-sport font-bold text-white uppercase italic">Perfect Match</div>
                   </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                   {/* Strengths */}
                   <div className="space-y-4">
                      <h3 className="flex items-center gap-2 text-xl font-sport font-bold text-game-india-blue uppercase tracking-wider">
                         <Zap size={20} /> Key Strengths
                      </h3>
                      <ul className="space-y-3">
                         {feedback.strengths?.map((s, i) => (
                            <motion.li 
                              key={i}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.2 + (i * 0.1) }}
                              className="bg-blue-900/20 border-l-4 border-game-india-blue p-3 text-slate-200 text-sm font-medium"
                            >
                               {s}
                            </motion.li>
                         ))}
                      </ul>
                   </div>

                   {/* Growth Plan */}
                   <div className="space-y-4">
                      <h3 className="flex items-center gap-2 text-xl font-sport font-bold text-game-india-orange uppercase tracking-wider">
                         <TrendingUp size={20} /> Growth Potential
                      </h3>
                      <ul className="space-y-3">
                         {feedback.growthPlan?.map((s, i) => (
                            <motion.li 
                              key={i}
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.4 + (i * 0.1) }}
                              className="bg-orange-900/20 border-l-4 border-game-india-orange p-3 text-slate-200 text-sm font-medium"
                            >
                               {s}
                            </motion.li>
                         ))}
                      </ul>
                   </div>
                </div>

                {/* Suggestions / Why Hire */}
                <div className="mt-8 bg-white/5 border border-white/10 rounded-xl p-6">
                   <h3 className="flex items-center gap-2 text-xl font-sport font-bold text-green-400 uppercase tracking-wider mb-4">
                      <Target size={20} /> Why Hire Raj Vimal?
                   </h3>
                   <div className="grid md:grid-cols-3 gap-4">
                      {feedback.suggestions?.map((s, i) => (
                         <div key={i} className="flex gap-3 items-start">
                            <ShieldCheck className="text-green-500 shrink-0 mt-0.5" size={18} />
                            <p className="text-slate-300 text-sm leading-relaxed">{s}</p>
                         </div>
                      ))}
                   </div>
                </div>
             </div>

             {/* Footer */}
             <div className="p-6 bg-black/40 border-t border-white/10 flex justify-between items-center backdrop-blur-md">
                <div className="text-xs text-slate-500 font-mono hidden md:block">
                   GENERATED BY GEMINI 2.0 FLASH • {new Date().toLocaleDateString()}
                </div>
                <div className="flex gap-4 ml-auto">
                   <button 
                      onClick={onClose}
                      className="text-slate-400 hover:text-white text-sm font-bold px-6 py-3 uppercase tracking-wider transition"
                   >
                      Close Review
                   </button>
                   <button 
                      onClick={() => { playClickSound(); onClose(); setTimeout(() => window.print(), 500); }}
                      className="bg-game-india-blue hover:bg-blue-600 text-white text-sm font-bold px-8 py-3 uppercase tracking-wider skew-btn shadow-[0_0_20px_rgba(19,99,223,0.4)] flex items-center gap-2"
                   >
                      <Download size={16} /> <span className="transform skew-x-[15deg] inline-block">Sign Player (PDF)</span>
                   </button>
                </div>
             </div>

           </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
};