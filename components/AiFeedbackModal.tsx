import React, { useEffect, useRef, useState } from 'react';
import { AiFeedbackResponse } from '../types';
import { X, CheckCircle, TrendingUp, Briefcase, Activity, ShieldCheck, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { playUmpireSequence, cancelUmpireAudio, playClickSound } from '../utils/audio';

interface Props {
  feedback: AiFeedbackResponse | null;
  isOpen: boolean;
  onClose: () => void;
  isLoading: boolean;
  error: string | null;
}

// The exact sequence of events
type ReviewStage = 
  | 'INIT'              // "TV Umpire to Director..."
  | 'ULTRA_EDGE'        // "SEO Strategy on point..."
  | 'LEAD_CHECK'        // "Leads on the board..."
  | 'BALL_TRACKING'     // "Leadership under pressure..."
  | 'DECISION_PENDING'  // "I have made my decision..."
  | 'RESULT';           // "TO HIRE RAJ VIMAL"

export const AiFeedbackModal: React.FC<Props> = ({ feedback, isOpen, onClose, isLoading, error }) => {
  const [stage, setStage] = useState<ReviewStage>('INIT');
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    let frameInterval: any;
    
    if (isOpen && isLoading) {
      setStage('INIT');
      
      // Frame counter for realism
      frameInterval = setInterval(() => setFrame(prev => prev + 1), 40);

      // The Script Sequences
      // 1. "TV Umpire to Director… Reviewing an All-Rounder resume."
      // 2. "SEO strategy on point." (Visual: Ultra Edge Spike)
      // 3. "Leads on the board." (Visual: Scoreboard)
      // 4. "Leadership under pressure." (Visual: Ball Tracking impact)
      // 5. "I have made my decision, to Hire Raj Vimal" (Visual: Decision Pending -> Green Screen)

      playUmpireSequence([
        "TV Umpire to Director...",
        "Reviewing an All-Rounder resume.",
        "SEO strategy... on point.",
        "Leads... on the board.",
        "Leadership... under pressure.",
        "I have made my decision...",
        "To Hire... Raj Vimal."
      ], () => {
        // Callback when all audio finishes (if needed)
      });

      // TIMING SEQUENCER (Synced manually to approx speech duration)
      // Note: In production, we'd use 'onboundary' events, but setTimeout is smoother for UI transitions here.
      
      const t1 = setTimeout(() => setStage('ULTRA_EDGE'), 4500); // After intro
      const t2 = setTimeout(() => setStage('LEAD_CHECK'), 8000); // After SEO
      const t3 = setTimeout(() => setStage('BALL_TRACKING'), 10500); // After Leads
      const t4 = setTimeout(() => setStage('DECISION_PENDING'), 14000); // After Leadership
      const t5 = setTimeout(() => setStage('RESULT'), 17500); // Reveal

      return () => {
        clearInterval(frameInterval);
        clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); clearTimeout(t5);
        cancelUmpireAudio();
      };
    } 
    
    // If opened directly with data (not loading), go straight to result
    if (isOpen && !isLoading && feedback) {
      setStage('RESULT');
    }

  }, [isOpen, isLoading, feedback]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/95 backdrop-blur-md p-0 md:p-4 font-mono">
      <AnimatePresence mode="wait">
        
        {/* === BROADCAST SIMULATION CONTAINER === */}
        {(isLoading || stage !== 'RESULT') && (
          <motion.div 
            key="broadcast"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="w-full max-w-5xl aspect-video bg-black rounded-xl overflow-hidden relative border-4 border-[#1a1a1a] shadow-2xl flex flex-col"
          >
             {/* CRT Scanline Overlay */}
             <div className="absolute inset-0 pointer-events-none z-50 opacity-20 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]"></div>
             
             {/* Top Data Bar */}
             <div className="bg-[#0f0f15] h-12 flex items-center justify-between px-6 border-b border-gray-800 z-40">
                <div className="flex items-center gap-3">
                   <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse shadow-[0_0_10px_red]"></div>
                   <span className="text-white font-bold tracking-widest text-sm">LIVE // RECRUITER REVIEW</span>
                </div>
                <div className="flex items-center gap-4 text-xs text-gray-400 font-mono">
                   <span>CAM: <span className="text-blue-400">UMPIRE</span></span>
                   <span>FRAME: <span className="text-blue-400">{3000 + frame}</span></span>
                </div>
             </div>

             {/* MAIN CONTENT AREA */}
             <div className="flex-1 relative bg-[#050505] flex items-center justify-center overflow-hidden">
                
                {/* 1. INIT: LISTENING */}
                {stage === 'INIT' && (
                   <div className="flex flex-col items-center gap-4">
                      <div className="w-24 h-24 rounded-full border-4 border-blue-500/30 flex items-center justify-center animate-pulse">
                         <Activity size={48} className="text-blue-500" />
                      </div>
                      <h2 className="text-2xl text-white font-bold tracking-widest uppercase">Establishing Comms...</h2>
                   </div>
                )}

                {/* 2. ULTRA EDGE (SEO CHECK) */}
                {stage === 'ULTRA_EDGE' && (
                   <div className="w-full h-full flex flex-col">
                      <div className="absolute top-4 left-4 bg-blue-900/80 text-white px-3 py-1 text-sm font-bold rounded border border-blue-500/50">
                         REVIEW: SEO STRATEGY
                      </div>
                      {/* Waveform */}
                      <div className="flex-1 flex items-center justify-center gap-1">
                         {[...Array(40)].map((_, i) => (
                            <motion.div
                               key={i}
                               animate={{ height: [20, Math.random() * 200, 20] }}
                               transition={{ duration: 0.1, repeat: Infinity, delay: i * 0.02 }}
                               className={`w-2 rounded-full ${i > 15 && i < 25 ? 'bg-green-400 shadow-[0_0_15px_green]' : 'bg-gray-700'}`}
                            />
                         ))}
                      </div>
                      <div className="h-20 bg-[#111] border-t border-gray-800 flex items-center justify-center">
                         <span className="text-3xl font-sport font-bold text-white tracking-[0.5em]">ULTRA EDGE</span>
                      </div>
                   </div>
                )}

                {/* 3. LEADS ON BOARD */}
                {stage === 'LEAD_CHECK' && (
                   <div className="w-full h-full flex flex-col items-center justify-center bg-blue-900/10">
                      <div className="absolute top-4 left-4 bg-blue-900/80 text-white px-3 py-1 text-sm font-bold rounded border border-blue-500/50">
                         REVIEW: LEAD GENERATION
                      </div>
                      <div className="bg-black border-4 border-gray-700 p-8 rounded-lg shadow-2xl transform scale-125">
                         <div className="text-gray-400 text-xs font-bold mb-2 uppercase tracking-widest text-center">Total Qualified Leads</div>
                         <div className="flex gap-2">
                            {['0','7','0','0','0'].map((num, i) => (
                               <motion.div 
                                 key={i}
                                 initial={{ rotateX: 90 }}
                                 animate={{ rotateX: 0 }}
                                 transition={{ delay: i * 0.1, type: "spring" }}
                                 className="w-12 h-16 bg-[#222] text-white font-sport text-4xl flex items-center justify-center rounded border border-gray-600"
                               >
                                  {num}
                               </motion.div>
                            ))}
                         </div>
                      </div>
                   </div>
                )}

                {/* 4. BALL TRACKING (LEADERSHIP) */}
                {stage === 'BALL_TRACKING' && (
                   <div className="w-full h-full relative bg-[#1a2c1a] perspective-[800px] overflow-hidden">
                      <div className="absolute top-4 left-4 bg-blue-900/80 text-white px-3 py-1 text-sm font-bold rounded border border-blue-500/50 z-10">
                         REVIEW: LEADERSHIP
                      </div>
                      
                      {/* The Pitch */}
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[400px] h-[800px] bg-[#eab308]/20 transform rotate-x-60 border-x-8 border-white/20">
                          {/* Wickets */}
                          <div className="absolute top-10 left-1/2 -translate-x-1/2 w-32 flex justify-between z-0">
                             <div className="w-2 h-32 bg-gray-200"></div>
                             <div className="w-2 h-32 bg-gray-200"></div>
                             <div className="w-2 h-32 bg-gray-200"></div>
                          </div>
                          
                          {/* Ball Animation */}
                          <motion.div 
                             initial={{ bottom: -50, left: '60%', scale: 1.5 }}
                             animate={{ bottom: '90%', left: '50%', scale: 0.5 }}
                             transition={{ duration: 2, ease: "linear" }}
                             className="absolute w-8 h-8 bg-red-600 rounded-full shadow-[0_0_20px_red] z-20"
                          />
                          
                          {/* Impact Text */}
                          <motion.div
                             initial={{ opacity: 0, scale: 0 }}
                             animate={{ opacity: 1, scale: 1 }}
                             transition={{ delay: 1.8 }}
                             className="absolute top-20 left-1/2 -translate-x-1/2 bg-red-600 text-white font-bold px-2 py-1 text-xs whitespace-nowrap z-30"
                          >
                             IMPACT: IN LINE
                          </motion.div>
                      </div>

                      {/* Stats Overlay */}
                      <div className="absolute top-20 right-10 flex flex-col gap-4">
                         <div className="bg-black/60 p-3 rounded border-l-4 border-green-500 backdrop-blur-md w-48">
                            <div className="text-[10px] text-gray-400 uppercase">Pitching</div>
                            <div className="text-white font-bold">IN LINE</div>
                         </div>
                         <div className="bg-black/60 p-3 rounded border-l-4 border-green-500 backdrop-blur-md w-48">
                            <div className="text-[10px] text-gray-400 uppercase">Impact</div>
                            <div className="text-white font-bold">TEAM GROWTH</div>
                         </div>
                         <div className="bg-black/60 p-3 rounded border-l-4 border-green-500 backdrop-blur-md w-48">
                            <div className="text-[10px] text-gray-400 uppercase">Wickets</div>
                            <div className="text-white font-bold">HITTING TARGETS</div>
                         </div>
                      </div>
                      
                      <div className="absolute bottom-0 w-full h-16 bg-[#111] border-t border-gray-800 flex items-center justify-center">
                         <span className="text-3xl font-sport font-bold text-white tracking-[0.5em]">BALL TRACKING</span>
                      </div>
                   </div>
                )}

                {/* 5. DECISION PENDING */}
                {stage === 'DECISION_PENDING' && (
                   <div className="w-full h-full bg-[#0a0a0a] flex items-center justify-center relative">
                      <div className="absolute inset-0 bg-red-900/20 animate-pulse"></div>
                      <motion.h1 
                        animate={{ opacity: [1, 0.2, 1] }}
                        transition={{ duration: 0.5, repeat: Infinity }}
                        className="text-6xl md:text-8xl font-sport font-bold text-white uppercase text-center leading-tight drop-shadow-[0_0_20px_rgba(255,255,255,0.5)]"
                      >
                         Decision<br/>Pending
                      </motion.h1>
                   </div>
                )}

             </div>
          </motion.div>
        )}

        {/* === THE RESULT (ELIGIBLE TO HIRE) === */}
        {(!isLoading || stage === 'RESULT') && feedback && (
           <motion.div 
            key="result"
            initial={{ scale: 0.8, opacity: 0 }} 
            animate={{ scale: 1, opacity: 1 }} 
            className="w-full max-w-4xl bg-[#0f172a] rounded-xl shadow-2xl overflow-hidden border border-slate-700 flex flex-col max-h-[90vh] relative z-50 font-sans"
          >
             {/* THE BIG GREEN SCREEN HEADER */}
             <div className="bg-green-600 p-8 flex flex-col items-center justify-center relative overflow-hidden shadow-xl shrink-0">
                 <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-30"></div>
                 <motion.div 
                    initial={{ scale: 2, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", bounce: 0.5 }}
                    className="relative z-10 text-3xl md:text-5xl font-sport font-bold text-white tracking-widest drop-shadow-md border-4 border-white px-8 py-3 uppercase text-center"
                 >
                    ELIGIBLE TO HIRE
                 </motion.div>
                 <div className="relative z-10 mt-3 text-green-100 font-bold tracking-wider uppercase text-sm text-center">
                    Decision: Raj Vimal is a Match Winner
                 </div>
                 
                 <button onClick={onClose} className="absolute top-4 right-4 text-white/80 hover:text-white hover:bg-white/20 p-2 rounded-full transition">
                    <X size={24} />
                 </button>
             </div>

             {/* Detailed Feedback Content */}
             <div className="flex-1 overflow-y-auto custom-scrollbar bg-[#0f172a] p-6 md:p-8">
                <div className="grid md:grid-cols-2 gap-8">
                   
                   {/* Strengths */}
                   <div>
                      <h3 className="flex items-center gap-2 text-lg font-bold text-blue-400 uppercase tracking-wider mb-4 pb-2 border-b border-blue-900/50">
                         <CheckCircle size={18} /> Powerplay (Strengths)
                      </h3>
                      <ul className="space-y-3">
                         {feedback.strengths?.map((s, i) => (
                            <motion.li 
                              key={i}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.2 + (i * 0.1) }}
                              className="bg-blue-950/40 p-3 rounded border-l-2 border-blue-500 text-slate-300 text-sm"
                            >
                               {s}
                            </motion.li>
                         ))}
                      </ul>
                   </div>

                   {/* Growth Plan */}
                   <div>
                      <h3 className="flex items-center gap-2 text-lg font-bold text-yellow-400 uppercase tracking-wider mb-4 pb-2 border-b border-yellow-900/50">
                         <TrendingUp size={18} /> Trajectory
                      </h3>
                      <ul className="space-y-3">
                         {feedback.growthPlan?.map((s, i) => (
                            <motion.li 
                              key={i}
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.4 + (i * 0.1) }}
                              className="bg-yellow-950/20 p-3 rounded border-l-2 border-yellow-500 text-slate-300 text-sm"
                            >
                               {s}
                            </motion.li>
                         ))}
                      </ul>
                   </div>

                   {/* Suggestions / Hiring Signals */}
                   <div className="md:col-span-2">
                      <h3 className="flex items-center gap-2 text-lg font-bold text-green-400 uppercase tracking-wider mb-4 pb-2 border-b border-green-900/50">
                         <Briefcase size={18} /> Why Pick This Player?
                      </h3>
                      <div className="grid md:grid-cols-3 gap-4">
                         {feedback.suggestions?.map((s, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.6 + (i * 0.1) }}
                              className="bg-green-950/20 border border-green-500/30 p-4 rounded text-center"
                            >
                               <ShieldCheck className="mx-auto text-green-500 mb-2" size={24} />
                               <p className="text-slate-300 text-xs font-medium">{s}</p>
                            </motion.div>
                         ))}
                      </div>
                   </div>
                </div>
             </div>

             {/* Footer Actions */}
             <div className="p-5 border-t border-slate-700 bg-[#0a0f1d] flex justify-between items-center shrink-0">
                <div className="text-xs text-slate-500 hidden md:block">
                   OFFICIAL MATCH REFEREE REPORT
                </div>
                <div className="flex gap-4 ml-auto">
                   <button 
                      onClick={onClose}
                      className="text-slate-400 hover:text-white text-sm font-bold px-4 py-2 transition"
                   >
                      CLOSE REVIEW
                   </button>
                   <button 
                      onClick={() => { playClickSound(); onClose(); setTimeout(() => window.print(), 500); }}
                      className="bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold px-6 py-2 rounded flex items-center gap-2 shadow-lg shadow-blue-900/20 transition hover:-translate-y-1"
                   >
                      <Download size={16} /> SIGN PLAYER (PDF)
                   </button>
                </div>
             </div>

           </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
};