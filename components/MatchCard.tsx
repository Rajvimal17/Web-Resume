import React from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import { playHoverSound, playClickSound } from '../utils/audio';

interface MatchCardProps {
  title: string;
  subtitle: string;
  meta: string;
  description?: string;
  highlights?: string[];
  image?: string;
  type: 'experience' | 'project' | 'skill';
  onClick?: () => void;
}

// This component is mainly used if we need standalone cards, but PrimeCard inside CricketOTT.tsx handles most of the heavy lifting now.
// Keeping this consistent just in case it's used elsewhere.
export const MatchCard: React.FC<MatchCardProps> = ({ title, subtitle, meta, image, onClick }) => {
  return (
    <motion.div 
      whileHover={{ scale: 1.05 }}
      onMouseEnter={playHoverSound}
      onClick={() => { playClickSound(); onClick?.(); }}
      className="flex-shrink-0 w-72 md:w-80 aspect-video rounded-md overflow-hidden relative group cursor-pointer border border-white/5 hover:border-blue-500/50 shadow-lg bg-[#1e293b]"
    >
      <img 
        src={image || 'https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=2629&auto=format&fit=crop'} 
        alt={title} 
        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
      
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="bg-white/20 backdrop-blur-md p-3 rounded-full border border-white/20">
           <Play fill="white" className="text-white" size={24} />
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-4">
         <h4 className="text-white font-bold text-sm truncate">{title}</h4>
         <p className="text-slate-300 text-xs truncate">{subtitle}</p>
         <div className="flex gap-2 text-[10px] text-slate-400 mt-1">
            <span>{meta}</span>
         </div>
      </div>
    </motion.div>
  );
};