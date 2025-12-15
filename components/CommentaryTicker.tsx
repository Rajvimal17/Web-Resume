import React from 'react';
import { ResumeData } from '../types';

interface Props {
  data: ResumeData;
}

export const CommentaryTicker: React.FC<Props> = ({ data }) => {
  // Helper to extract key numbers from strings
  const extractMetric = (text: string) => {
    const match = text.match(/(\d+(?:\.\d+)?(?:%|\+|k|K| Lakh)?)/);
    return match ? match[0] : "Massive Numbers";
  };

  // Fun/Gen Z Templates
  const generateCommentary = () => {
    const commentary: string[] = [];

    // 1. InfoEdge (Latest)
    const infoEdge = data.experience.find(e => e.company.includes("InfoEdge"));
    if (infoEdge) {
      commentary.push(`🚨 BREAKING: Traffic at InfoEdge went 📈 ${extractMetric(infoEdge.bullets[0])}! Straight bussin. No cap.`);
      commentary.push(`POV: You optimize ATF placements and hit ${extractMetric(infoEdge.bullets[1])}. CEO of SEO behavior. 💅`);
    }

    // 2. Leverage Edu
    const levEdu = data.experience.find(e => e.company.includes("Leverage"));
    if (levEdu) {
      commentary.push(`Leverage Edu Era: We dropped ${extractMetric(levEdu.bullets[0])} growth. We understood the assignment. 🤝`);
      commentary.push(`200+ Articles? Raj really cooked at Leverage Edu. 🍳🔥`);
    }

    // 3. Affinity
    const affinity = data.experience.find(e => e.company.includes("Affinity"));
    if (affinity) {
      commentary.push(`Affinity check: ${extractMetric(affinity.bullets[0])} visits. Main character energy only. ✨`);
    }

    // 4. General Flex
    commentary.push(`Skills loading... GA4, SEMrush, Excel. It's giving hired. 💼`);
    commentary.push(`Raj Vimal: 8+ Years XP. The math is mathing. 🧠`);

    return commentary;
  };

  const highlights = generateCommentary();

  return (
    <div className="fixed bottom-0 left-0 right-0 h-12 bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600 border-t border-white/20 z-50 print:hidden overflow-hidden flex items-center shadow-[0_-5px_20px_rgba(124,58,237,0.5)]">
      
      {/* Static Label */}
      <div className="bg-yellow-400 text-slate-900 font-sport font-bold px-6 h-full flex items-center justify-center z-20 text-xl uppercase tracking-widest shadow-xl skew-x-[-10deg] ml-[-10px] pl-8 border-r-4 border-slate-900">
        <span className="skew-x-[10deg] animate-pulse">📢 HOT TAKES</span>
      </div>
      
      {/* Scrolling Text */}
      <div className="flex-1 overflow-hidden relative h-full flex items-center">
        <div className="animate-marquee hover-pause whitespace-nowrap flex gap-12 absolute left-0 text-white font-bold text-base tracking-wide items-center cursor-default">
          {highlights.map((text, i) => (
            <span key={i} className="flex items-center gap-3 px-2 py-1 hover:bg-white/20 rounded-lg transition-colors">
              <span className="text-xl">⚡</span>
              {text}
            </span>
          ))}
           {/* Duplicate to ensure smooth loop */}
           {highlights.map((text, i) => (
            <span key={`dup-${i}`} className="flex items-center gap-3 px-2 py-1 hover:bg-white/20 rounded-lg transition-colors">
              <span className="text-xl">⚡</span>
              {text}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};