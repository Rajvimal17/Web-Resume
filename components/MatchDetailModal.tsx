import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, Target, BarChart2, Hash } from 'lucide-react';
import { Experience, Project } from '../types';

interface Props {
  item: Experience | Project | null;
  onClose: () => void;
  type: 'experience' | 'project' | null;
}

export const MatchDetailModal: React.FC<Props> = ({ item, onClose, type }) => {
  if (!item) return null;

  const isExperience = (item: any): item is Experience => 'company' in item;
  
  const title = isExperience(item) ? item.role : item.title;
  const subtitle = isExperience(item) ? item.company : item.subtitle;
  const description = isExperience(item) ? item.bullets[0] : item.description;
  const listItems = isExperience(item) ? item.bullets : item.metrics;
  const bgImage = item.image || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop';

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/90 backdrop-blur-sm"
        />

        <motion.div 
          initial={{ scale: 0.9, y: 50, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.9, y: 50, opacity: 0 }}
          className="relative w-full max-w-4xl bg-[#0f172a] border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col md:flex-row max-h-[85vh]"
        >
          {/* Top Decorative Bar */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-game-india-blue via-white to-game-india-green z-50"></div>

          {/* LEFT: Visual & Header */}
          <div className="md:w-2/5 relative bg-black">
             <img src={bgImage} className="absolute inset-0 w-full h-full object-cover opacity-50" alt="bg" />
             <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0f172a] md:bg-gradient-to-r"></div>
             
             <div className="relative p-8 h-full flex flex-col justify-end">
                <div className="mb-4">
                   <span className="bg-game-india-orange text-black text-[10px] font-bold px-2 py-1 uppercase tracking-widest mb-2 inline-block">
                      Match Report
                   </span>
                   <h2 className="text-4xl font-sport font-bold text-white uppercase leading-[0.9] text-glow mb-1">
                      {title}
                   </h2>
                   <p className="text-game-india-blue font-bold uppercase tracking-wider text-sm">
                      {subtitle}
                   </p>
                </div>
                
                <div className="grid grid-cols-2 gap-2 mt-4 border-t border-white/10 pt-4">
                   <div>
                      <span className="text-[9px] text-slate-400 uppercase block">Performance</span>
                      <span className="text-xl font-sport text-white">9.8/10</span>
                   </div>
                   <div>
                      <span className="text-[9px] text-slate-400 uppercase block">Impact</span>
                      <span className="text-xl font-sport text-white">High</span>
                   </div>
                </div>
             </div>
          </div>

          {/* RIGHT: Stats & Details */}
          <div className="md:w-3/5 p-8 overflow-y-auto custom-scrollbar bg-[#0f172a]">
             <div className="flex justify-between items-start mb-6">
                <h3 className="text-xl font-sport font-bold text-white uppercase tracking-wide flex items-center gap-2">
                   <BarChart2 size={18} className="text-game-india-blue" />
                   Key Statistics
                </h3>
                <button onClick={onClose} className="text-slate-500 hover:text-white transition">
                   <X size={24} />
                </button>
             </div>

             <div className="space-y-6">
                <div className="bg-white/5 p-4 border-l-2 border-game-india-orange">
                   <h4 className="text-[10px] text-game-india-orange font-bold uppercase mb-1">Summary</h4>
                   <p className="text-sm text-slate-300 leading-relaxed">
                      {description}
                   </p>
                </div>

                <div>
                   <h4 className="text-[10px] text-slate-500 font-bold uppercase mb-3 tracking-widest">Highlights Reel</h4>
                   <ul className="space-y-3">
                      {listItems.map((item, i) => (
                         <li key={i} className="flex gap-3 text-sm text-slate-300">
                            <Hash size={14} className="text-game-india-blue mt-1 shrink-0" />
                            <span dangerouslySetInnerHTML={{ 
                                  __html: item.replace(
                                    /(\d+(?:\.\d+)?(?:%|\+|k|K| Lakh)?)/g, 
                                    '<strong class="text-white">$1</strong>'
                                  ) 
                                }} />
                         </li>
                      ))}
                   </ul>
                </div>
             </div>

             <div className="mt-8 flex gap-4">
                <button className="flex-1 bg-game-india-blue hover:bg-blue-600 text-white font-bold py-3 text-sm uppercase tracking-wider transition skew-btn">
                   <div className="transform skew-x-12">Watch Replay</div>
                </button>
                <button className="flex-1 bg-white/10 hover:bg-white/20 text-white font-bold py-3 text-sm uppercase tracking-wider transition skew-btn">
                   <div className="transform skew-x-12">Share Stats</div>
                </button>
             </div>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};