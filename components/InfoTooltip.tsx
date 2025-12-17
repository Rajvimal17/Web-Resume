import React, { useState } from 'react';
import { Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  text: string;
  className?: string;
  position?: 'top' | 'bottom' | 'right' | 'left';
}

export const InfoTooltip: React.FC<Props> = ({ text, className = "", position = 'top' }) => {
  const [isVisible, setIsVisible] = useState(false);

  const positionClasses = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2"
  };

  return (
    <div 
      className={`relative inline-flex items-center z-30 ${className}`}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onClick={(e) => { e.stopPropagation(); setIsVisible(!isVisible); }}
    >
      <Info size={12} className="text-slate-400 hover:text-white cursor-help transition-colors opacity-70 hover:opacity-100" />
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 5, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.95 }}
            className={`absolute ${positionClasses[position]} w-48 bg-slate-900 border border-slate-700 p-2 rounded shadow-xl z-50 pointer-events-none`}
          >
            <p className="text-[10px] text-slate-300 leading-tight text-center font-sans normal-case tracking-normal">{text}</p>
            {position === 'top' && <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-slate-900"></div>}
            {position === 'bottom' && <div className="absolute bottom-full left-1/2 -translate-x-1/2 -mb-1 border-4 border-transparent border-b-slate-900"></div>}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};