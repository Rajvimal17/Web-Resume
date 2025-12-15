import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, Plus, ThumbsUp, Volume2 } from 'lucide-react';
import { Experience, Project } from '../types';

interface Props {
  item: Experience | Project | null;
  onClose: () => void;
  type: 'experience' | 'project' | null;
}

export const MatchDetailModal: React.FC<Props> = ({ item, onClose, type }) => {
  if (!item) return null;

  // Type guards
  const isExperience = (item: any): item is Experience => 'company' in item;
  const isProject = (item: any): item is Project => 'metrics' in item;

  const title = isExperience(item) ? item.role : item.title;
  const subtitle = isExperience(item) ? item.company : item.subtitle;
  const meta = isExperience(item) ? `${item.startDate} - ${item.endDate}` : 'Strategic Campaign';
  const description = isProject(item) ? item.description : item.bullets[0]; // Fallback for desc
  const listItems = isExperience(item) ? item.bullets : item.metrics;
  const bgImage = item.image || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop';

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-8">
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        />

        <motion.div 
          layoutId={`card-${title}`}
          initial={{ scale: 0.9, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 50 }}
          className="relative w-full max-w-4xl bg-[#181818] rounded-lg shadow-2xl overflow-hidden text-white flex flex-col max-h-[90vh]"
        >
          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 z-20 bg-[#181818] rounded-full p-2 hover:bg-white hover:text-black transition-colors"
          >
            <X size={20} />
          </button>

          {/* Hero Image Area */}
          <div className="relative h-64 md:h-96 w-full flex-shrink-0">
             <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-transparent to-transparent z-10"></div>
             <img src={bgImage} alt={title} className="w-full h-full object-cover" />
             
             <div className="absolute bottom-8 left-8 z-20 max-w-2xl">
                <h2 className="text-4xl md:text-5xl font-sport font-bold mb-2 shadow-black drop-shadow-md leading-none">{title}</h2>
                <div className="flex items-center gap-4 text-sm font-semibold mb-6">
                   <span className="text-green-400">98% Match</span>
                   <span className="text-slate-400">{meta}</span>
                   <span className="border border-slate-500 px-1 text-[10px] rounded text-slate-300 uppercase">HD</span>
                </div>

                <div className="flex items-center gap-3">
                   <button className="bg-white text-black px-6 py-2 rounded flex items-center gap-2 font-bold hover:bg-slate-200 transition">
                      <Play fill="currentColor" size={20} /> Play Highlights
                   </button>
                   <button className="bg-gray-500/40 text-white px-4 py-2 rounded flex items-center gap-2 font-bold hover:bg-gray-500/60 transition border border-white/20">
                      <Plus size={20} /> My List
                   </button>
                   <button className="bg-gray-500/40 text-white p-2 rounded-full border border-white/20 hover:bg-gray-500/60 transition">
                      <ThumbsUp size={20} />
                   </button>
                </div>
             </div>
          </div>

          {/* Details Body */}
          <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8 overflow-y-auto custom-scrollbar">
             <div className="md:col-span-2 space-y-4">
                <div className="flex items-center gap-2 text-lg font-bold text-white mb-2">
                   <span>{subtitle}</span>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed mb-6">
                   {description}
                </p>

                <h3 className="text-white font-bold text-lg mb-2 border-b border-slate-700 pb-2">Key Highlights</h3>
                <ul className="space-y-3">
                   {listItems.map((item, i) => (
                      <li key={i} className="flex gap-3 text-sm text-slate-300">
                         <span className="text-red-500 mt-0.5">⚡</span>
                         <span className="leading-relaxed">{item}</span>
                      </li>
                   ))}
                </ul>
             </div>

             <div className="md:col-span-1 space-y-4 text-sm">
                <div className="text-slate-400">
                   <span className="block text-slate-500 text-xs mb-1">Company / Location</span>
                   <span className="text-white">{subtitle}</span>
                   <br />
                   <span className="text-xs">{isExperience(item) ? item.location : 'Remote / Hybrid'}</span>
                </div>
                <div className="text-slate-400">
                   <span className="block text-slate-500 text-xs mb-1">Duration</span>
                   <span className="text-white">{meta}</span>
                </div>
                <div className="text-slate-400">
                   <span className="block text-slate-500 text-xs mb-1">Tags</span>
                   <div className="flex flex-wrap gap-2">
                      <span className="text-xs border border-slate-600 px-2 py-0.5 rounded">Strategy</span>
                      <span className="text-xs border border-slate-600 px-2 py-0.5 rounded">SEO</span>
                      <span className="text-xs border border-slate-600 px-2 py-0.5 rounded">Growth</span>
                   </div>
                </div>
             </div>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};