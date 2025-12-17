import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Clock, Zap, TrendingUp, CheckCircle, Star } from 'lucide-react';
import { Badge, LatestUpdate } from '../types';
import { InfoTooltip } from './InfoTooltip';

export const QuickStatsCard = () => {
  return (
    <motion.div 
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 1 }}
      className="fixed right-4 bottom-24 z-40 hidden xl:block w-72 bg-[#0f172a]/90 backdrop-blur-md border border-white/10 rounded-lg shadow-2xl overflow-hidden font-sans"
    >
       <div className="bg-game-india-orange text-black px-4 py-2 flex justify-between items-center">
          <span className="font-bold text-xs uppercase tracking-widest">Raj's Profile Stats</span>
          <div className="flex items-center gap-1">
             <div className="w-2 h-2 rounded-full bg-green-600 animate-pulse"></div>
             <span className="text-[10px] font-bold">LIVE</span>
          </div>
       </div>
       <div className="p-4 space-y-3">
          <div className="flex items-center gap-3 text-sm text-slate-300">
             <CheckCircle size={16} className="text-green-500" />
             <span>8 Offers submitted this season</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-slate-300">
             <TrendingUp size={16} className="text-blue-500" />
             <span>50+ Recruiters viewed this week</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-slate-300">
             <Trophy size={16} className="text-yellow-500" />
             <span>3 Achievements unlocked (Jun)</span>
          </div>
          <div className="pt-2 border-t border-white/10 flex items-center gap-2 text-[10px] text-slate-500">
             <Clock size={12} />
             <span>Last Updated: 5 days ago</span>
          </div>
       </div>
    </motion.div>
  );
};

export const BadgeSection: React.FC<{ badges: Badge[] }> = ({ badges }) => {
  return (
    <div className="bg-black/40 border border-white/10 rounded-xl p-6 mb-12 backdrop-blur-sm">
       <h3 className="text-2xl font-sport font-bold text-white uppercase italic mb-6 flex items-center gap-2">
          <Star className="text-yellow-500" fill="currentColor" /> Hall of Fame Badges
       </h3>
       <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {badges.map((badge, i) => (
             <motion.div 
               key={badge.id}
               initial={{ opacity: 0, scale: 0.8 }}
               whileInView={{ opacity: 1, scale: 1 }}
               transition={{ delay: i * 0.1 }}
               whileHover={{ scale: 1.05, y: -5 }}
               className="bg-[#0f172a] border border-white/10 rounded-lg p-4 flex flex-col items-center text-center group hover:border-game-india-blue transition-colors cursor-help relative"
             >
                <div className={`w-12 h-12 rounded-full ${badge.color} bg-opacity-20 flex items-center justify-center text-2xl mb-3 border border-white/10 group-hover:bg-opacity-40 transition-all`}>
                   {badge.icon}
                </div>
                <h4 className="font-bold text-white text-xs uppercase tracking-wide mb-1 leading-tight">{badge.name}</h4>
                <div className="absolute inset-0 bg-black/90 flex items-center justify-center p-2 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg z-10">
                   <p className="text-[10px] text-slate-300 leading-tight">{badge.description}</p>
                </div>
             </motion.div>
          ))}
       </div>
    </div>
  );
};

export const UpdatesTimeline: React.FC<{ updates: LatestUpdate[] }> = ({ updates }) => {
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-12 backdrop-blur-sm">
       <h3 className="text-xl font-sport font-bold text-white uppercase italic mb-4 flex items-center gap-2">
          <Zap className="text-game-india-blue" /> Latest Career Updates
       </h3>
       <div className="space-y-4">
          {updates.map((update, i) => (
             <div key={i} className="flex gap-4 items-start">
                <div className="flex flex-col items-center mt-1">
                   <div className="w-2 h-2 rounded-full bg-game-india-orange"></div>
                   {i !== updates.length - 1 && <div className="w-px h-full bg-white/10 my-1"></div>}
                </div>
                <div>
                   <span className="text-[10px] text-slate-400 font-mono uppercase bg-white/5 px-2 py-0.5 rounded">{update.date}</span>
                   <p className="text-sm text-slate-200 mt-1 font-medium">{update.text}</p>
                   <span className="text-[10px] text-game-india-blue font-bold uppercase tracking-wider">{update.type}</span>
                </div>
             </div>
          ))}
       </div>
    </div>
  );
};