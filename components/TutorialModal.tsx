import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, Activity, Zap } from 'lucide-react';
import { playClickSound } from '../utils/audio';

export const TutorialModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if user has visited before
    const hasVisited = localStorage.getItem('hasVisited_v1');
    if (!hasVisited) {
      // Small delay to allow main site to render first
      const timer = setTimeout(() => setIsOpen(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    playClickSound();
    setIsOpen(false);
    localStorage.setItem('hasVisited_v1', 'true');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
           {/* Backdrop */}
           <motion.div 
             initial={{ opacity: 0 }} 
             animate={{ opacity: 1 }} 
             exit={{ opacity: 0 }}
             className="absolute inset-0 bg-black/80 backdrop-blur-sm"
             onClick={handleClose}
           />
           
           {/* Content */}
           <motion.div
             initial={{ scale: 0.9, opacity: 0, y: 20 }}
             animate={{ scale: 1, opacity: 1, y: 0 }}
             exit={{ scale: 0.9, opacity: 0, y: 20 }}
             className="relative w-full max-w-lg bg-[#0f172a] border-2 border-game-india-orange/50 rounded-lg shadow-[0_0_50px_rgba(255,153,51,0.2)] overflow-hidden"
             role="dialog"
             aria-modal="true"
             aria-labelledby="tutorial-title"
           >
              {/* Close Button */}
              <button 
                onClick={handleClose} 
                className="absolute top-4 right-4 text-black/50 hover:text-black z-20 transition-colors bg-white/20 rounded-full p-1"
                aria-label="Close tutorial"
              >
                 <X size={20} />
              </button>

              {/* Header */}
              <div className="bg-game-india-orange p-6 text-center relative overflow-hidden">
                 <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
                 <h2 id="tutorial-title" className="relative z-10 text-3xl font-sport font-bold text-black uppercase italic tracking-wide leading-none">
                    Welcome to the Arena
                 </h2>
                 <p className="relative z-10 text-black/80 font-bold text-xs uppercase tracking-widest mt-2">
                    Raj Vimal's Interactive Career Mode
                 </p>
              </div>

              {/* Body */}
              <div className="p-6 md:p-8 space-y-6">
                 <p className="text-slate-300 text-center text-sm leading-relaxed">
                    This isn't a standard resume. It's a gamified timeline of my 8+ years in Content & SEO. 
                    <span className="block mt-2 text-white font-bold">Select a Match Format to filter experience:</span>
                 </p>

                 <div className="grid gap-3">
                    <div className="flex items-center gap-4 bg-white/5 p-3 rounded border border-white/5 hover:border-red-500/30 transition-colors">
                       <div className="bg-[#2a0a0a] p-2 rounded text-red-500 shrink-0"><Clock size={20} /></div>
                       <div>
                          <h4 className="font-sport text-xl text-white uppercase leading-none">Test Mode</h4>
                          <p className="text-xs text-slate-400 mt-0.5">Strategy, Architecture & Long-term Growth.</p>
                       </div>
                    </div>
                    <div className="flex items-center gap-4 bg-white/5 p-3 rounded border border-white/5 hover:border-blue-500/30 transition-colors">
                       <div className="bg-[#0a1a2a] p-2 rounded text-blue-400 shrink-0"><Activity size={20} /></div>
                       <div>
                          <h4 className="font-sport text-xl text-white uppercase leading-none">ODI Mode</h4>
                          <p className="text-xs text-slate-400 mt-0.5">Campaigns, Agility & Versatile Execution.</p>
                       </div>
                    </div>
                    <div className="flex items-center gap-4 bg-white/5 p-3 rounded border border-white/5 hover:border-fuchsia-500/30 transition-colors">
                       <div className="bg-[#1a052a] p-2 rounded text-fuchsia-400 shrink-0"><Zap size={20} /></div>
                       <div>
                          <h4 className="font-sport text-xl text-white uppercase leading-none">T20 Mode</h4>
                          <p className="text-xs text-slate-400 mt-0.5">High Impact, Speed & Immediate ROI.</p>
                       </div>
                    </div>
                 </div>

                 <div className="flex flex-col gap-3 pt-2">
                    <button 
                        onClick={handleClose}
                        className="w-full bg-white hover:bg-slate-200 text-black font-bold font-sport text-2xl py-3 transition-all uppercase tracking-wider skew-btn shadow-lg"
                    >
                        <span className="block transform skew-x-[15deg]">Start The Match</span>
                    </button>
                    <button 
                        onClick={handleClose} 
                        className="text-xs text-slate-500 hover:text-slate-300 uppercase tracking-widest text-center py-2"
                    >
                        Skip Intro
                    </button>
                 </div>
              </div>

           </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};