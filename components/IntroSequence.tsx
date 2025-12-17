import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SkipForward, Zap, TrendingUp, Users } from 'lucide-react';

interface Props {
  onComplete: () => void;
}

export const IntroSequence: React.FC<Props> = ({ onComplete }) => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    
    // Tighter timing for snappy intro
    timers.push(setTimeout(() => setStep(1), 1500)); // RAJ VIMAL (1.5s - slightly longer hold on intro)
    timers.push(setTimeout(() => setStep(2), 2700)); // Stat 1
    timers.push(setTimeout(() => setStep(3), 3500)); // Stat 2
    timers.push(setTimeout(() => setStep(4), 4300)); // Stat 3
    timers.push(setTimeout(() => setStep(5), 5300)); // LOGO
    timers.push(setTimeout(() => onComplete(), 7800)); // Finish

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 z-[200] bg-black flex items-center justify-center overflow-hidden font-sport"
    >
      <button 
        onClick={onComplete}
        className="absolute bottom-8 right-8 text-white/50 hover:text-white flex items-center gap-2 uppercase tracking-widest text-sm z-50 border border-white/20 px-4 py-2 rounded-full transition-colors hover:bg-white/10"
      >
        Skip Intro <SkipForward size={14} />
      </button>

      {/* Background Ambience */}
      <div className="absolute inset-0 z-0">
         <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-30"></div>
         <motion.div 
            animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-black to-black"
         ></motion.div>
      </div>

      <AnimatePresence mode="wait">
         {/* Step 0: EA SPORTS STYLE */}
         {step === 0 && (
            <motion.div
               key="step0"
               initial={{ opacity: 0, scale: 0.8, letterSpacing: "0.2em" }}
               animate={{ opacity: 1, scale: 1, letterSpacing: "0.5em" }}
               exit={{ opacity: 0, scale: 1.5, filter: "blur(4px)" }}
               transition={{ duration: 0.8, ease: "circOut" }}
               className="flex flex-col items-center z-10"
            >
               <div className="text-white text-4xl md:text-6xl font-black italic tracking-widest drop-shadow-[0_0_15px_rgba(255,153,51,0.6)]">
                  <span className="text-slate-400">EA SPORTS</span> <span className="text-game-india-orange">STYLE</span>
               </div>
               <div className="text-sm md:text-base text-white/50 font-mono tracking-[1em] mt-4 uppercase animate-pulse">
                  It's in the game
               </div>
            </motion.div>
         )}

         {/* Step 1: Name */}
         {step === 1 && (
            <motion.div
               key="step1"
               initial={{ y: 50, opacity: 0 }}
               animate={{ y: 0, opacity: 1 }}
               exit={{ y: -50, opacity: 0, scale: 0.9 }}
               className="text-center z-10"
            >
               <div className="text-slate-400 text-lg md:text-xl uppercase tracking-[0.5em] mb-4">Introducing</div>
               <h1 className="text-white text-7xl md:text-9xl font-black uppercase italic leading-none drop-shadow-2xl">
                  RAJ<br/><span className="text-game-india-blue text-glow">VIMAL</span>
               </h1>
            </motion.div>
         )}

         {/* Steps 2-4: Fast Stats */}
         {step >= 2 && step <= 4 && (
            <div className="absolute inset-0 flex items-center justify-center z-10">
               {step === 2 && (
                  <motion.div 
                     key="stat1"
                     initial={{ scale: 3, opacity: 0, rotate: -10 }}
                     animate={{ scale: 1, opacity: 1, rotate: -3 }}
                     exit={{ scale: 0, opacity: 0 }}
                     className="bg-red-600 text-white p-8 md:p-12 border-4 border-white shadow-[0_0_50px_rgba(220,38,38,0.6)]"
                  >
                     <div className="flex flex-col items-center gap-2 text-4xl md:text-6xl font-bold uppercase italic">
                        <TrendingUp size={64} className="mb-2" /> 
                        <span>50%</span> 
                        <span className="text-2xl not-italic tracking-widest">Organic Growth</span>
                     </div>
                  </motion.div>
               )}
               {step === 3 && (
                  <motion.div 
                     key="stat2"
                     initial={{ x: 1000, skewX: 20 }}
                     animate={{ x: 0, skewX: 0 }}
                     exit={{ x: -1000, skewX: -20 }}
                     className="bg-blue-600 text-white p-8 md:p-12 transform rotate-3 border-4 border-white shadow-[0_0_50px_rgba(37,99,235,0.6)]"
                  >
                     <div className="flex flex-col items-center gap-2 text-4xl md:text-6xl font-bold uppercase italic">
                        <Users size={64} className="mb-2" /> 
                        <span>7,000+</span>
                        <span className="text-2xl not-italic tracking-widest">Leads Generated</span>
                     </div>
                  </motion.div>
               )}
               {step === 4 && (
                  <motion.div 
                     key="stat3"
                     initial={{ y: -500, rotate: 180 }}
                     animate={{ y: 0, rotate: -1 }}
                     exit={{ scale: 5, opacity: 0 }}
                     className="bg-game-india-orange text-black p-8 md:p-12 border-4 border-black shadow-[0_0_50px_rgba(255,153,51,0.6)]"
                  >
                     <div className="flex flex-col items-center gap-2 text-4xl md:text-6xl font-bold uppercase italic">
                        <Zap size={64} className="mb-2" /> 
                        <span>SEO</span>
                        <span className="text-2xl not-italic tracking-widest">Strategist</span>
                     </div>
                  </motion.div>
               )}
            </div>
         )}

         {/* Step 5: Final Logo */}
         {step === 5 && (
            <motion.div
               key="step5"
               initial={{ opacity: 0, scale: 0.5 }}
               animate={{ opacity: 1, scale: 1 }}
               exit={{ opacity: 0 }}
               className="text-center z-10"
            >
               <div className="text-game-india-blue text-xl md:text-2xl font-bold tracking-widest uppercase mb-4 animate-pulse">Press Start</div>
               <div className="text-white text-6xl md:text-9xl font-black italic uppercase tracking-tighter text-glow-orange mb-6">
                  CRICKET '26
               </div>
               <div className="inline-block bg-white/10 backdrop-blur px-6 py-2 rounded border border-white/20 text-white/70 text-sm uppercase tracking-widest">
                  Loading Career Mode...
               </div>
            </motion.div>
         )}

      </AnimatePresence>
      
      {/* Scanlines Effect */}
      <div className="absolute inset-0 pointer-events-none z-20 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]"></div>
    </motion.div>
  );
};