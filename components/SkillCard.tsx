import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { SkillItem } from '../types';
import { playHoverSound, playClickSound } from '../utils/audio';

interface Props {
  skill: SkillItem;
}

export const SkillCard: React.FC<Props> = ({ skill }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Generate a random high stat for visual flair
  const stat = 90 + Math.floor(Math.random() * 9);

  return (
    <motion.div 
      layout
      onClick={() => { 
        setIsOpen(!isOpen);
        playClickSound();
      }}
      onMouseEnter={() => playHoverSound()}
      whileHover={{ 
        scale: 1.05, 
        boxShadow: "0 0 25px rgba(19, 99, 223, 0.6)",
        backgroundColor: "rgba(255, 255, 255, 0.08)"
      }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className={`
        relative overflow-hidden cursor-pointer transition-colors duration-300 group rounded-md border
        ${isOpen ? 'bg-white/10 border-game-india-blue' : 'bg-black/40 border-white/5 hover:border-game-india-blue/50'}
      `}
    >
      {/* Stat Bar Background */}
      <div className="absolute bottom-0 left-0 h-[2px] bg-white/10 w-full">
         <div className="h-full bg-game-india-blue w-[92%] shadow-[0_0_10px_rgba(19,99,223,0.8)]"></div>
      </div>

      <div className="p-3 flex items-center justify-between relative z-10">
        <div className="flex items-center gap-3">
           <div className={`
              w-8 h-8 flex items-center justify-center font-sport font-bold text-lg rounded border 
              ${isOpen ? 'bg-game-india-orange text-black border-game-india-orange shadow-[0_0_10px_rgba(255,153,51,0.5)]' : 'bg-transparent text-slate-400 border-slate-600 group-hover:border-game-india-blue group-hover:text-white'}
              transition-colors duration-300
           `}>
              {stat}
           </div>
           <div>
              <h4 className={`font-bold text-sm uppercase tracking-wide transition-colors duration-300 ${isOpen ? 'text-white text-glow' : 'text-slate-300 group-hover:text-game-india-blue'}`}>
                {skill.name}
              </h4>
           </div>
        </div>
        
        {isOpen ? <ChevronUp size={14} className="text-game-india-orange" /> : <ChevronDown size={14} className="text-slate-600 group-hover:text-white" />}
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="p-3 pt-0 text-xs space-y-2 pb-4 border-t border-white/5 mt-2">
               <div className="flex gap-2 pt-2">
                  <div className="w-[2px] bg-game-india-blue shadow-[0_0_5px_rgba(19,99,223,0.8)]"></div>
                  <p className="text-slate-400"><span className="text-game-india-blue font-bold uppercase">Effect:</span> {skill.useCase}</p>
               </div>
               <div className="flex gap-2">
                  <div className="w-[2px] bg-game-india-orange shadow-[0_0_5px_rgba(255,153,51,0.8)]"></div>
                  <p className="text-slate-400"><span className="text-game-india-orange font-bold uppercase">Feat:</span> {skill.example}</p>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};