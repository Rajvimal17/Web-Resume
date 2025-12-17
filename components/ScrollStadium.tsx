import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface Props {
  mode: 'QUICK_PLAY' | 'TEST' | 'ODI' | 'T20';
}

export const ScrollStadium: React.FC<Props> = ({ mode }) => {
  const { scrollYProgress } = useScroll({
    offset: ["start start", "end end"]
  });

  // Dynamic Colors based on Mode
  const getAtmosphere = () => {
    switch (mode) {
      case 'TEST': // Red Ball / Day Test (Warm/Classic)
        return {
           bg: 'bg-[#1a0505]',
           overlay: 'from-red-900/30 via-transparent to-[#1a0505]',
           pitch: 'from-yellow-100/10 to-green-900/20',
           fog: 'bg-red-500/10'
        };
      case 'ODI': // Blue Jersey / Day-Night (Blue/Cool)
        return {
           bg: 'bg-[#06182c]',
           overlay: 'from-blue-900/40 via-transparent to-[#06182c]',
           pitch: 'from-blue-100/10 to-green-900/20',
           fog: 'bg-blue-500/10'
        };
      case 'T20': // IPL Style / Night (Purple/Pink/Dark)
        return {
           bg: 'bg-[#0f0214]',
           overlay: 'from-fuchsia-900/40 via-transparent to-[#0f0214]',
           pitch: 'from-pink-100/10 to-purple-900/20',
           fog: 'bg-fuchsia-500/10'
        };
      default: // Quick Play (Default Navy)
        return {
           bg: 'bg-[#0f1014]',
           overlay: 'from-[#0f1014] via-transparent to-[#0f1014]',
           pitch: 'from-yellow-600/10 to-green-900/10',
           fog: 'bg-slate-500/10'
        };
    }
  };

  const theme = getAtmosphere();

  // Parallax Animations
  const batsmanY = useTransform(scrollYProgress, [0, 1], ["15vh", "85vh"]);
  const batsmanX = useTransform(scrollYProgress, [0, 1], ["5vw", "80vw"]);
  const batsmanScale = useTransform(scrollYProgress, [0, 1], [0.5, 1.8]);
  const batsmanOpacity = useTransform(scrollYProgress, [0, 0.1, 0.8, 1], [0, 1, 1, 0]);
  const pitchY = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]);
  const pitchRotate = useTransform(scrollYProgress, [0, 1], ["60deg", "45deg"]);

  return (
    <div className={`fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden transition-colors duration-700 ${theme.bg}`}>
      
      {/* Layer 1: Global Stadium Atmosphere */}
      <div className="absolute inset-0 z-0">
        <img 
            src="https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=2667&auto=format&fit=crop"
            alt="Stadium"
            className="w-full h-full object-cover opacity-20 mix-blend-overlay"
        />
        {/* Dynamic Gradient Overlay */}
        <div className={`absolute inset-0 bg-gradient-to-b ${theme.overlay} transition-all duration-700`}></div>
        <div className={`absolute inset-0 bg-gradient-to-r ${theme.overlay} transition-all duration-700`}></div>
      </div>

      {/* Layer 2: The 3D Pitch Markings */}
      <motion.div 
        style={{ y: pitchY }}
        className="absolute inset-0 flex justify-center items-center perspective-[100px] opacity-30"
      >
         {/* The Pitch Strip */}
         <motion.div 
            style={{ rotateX: pitchRotate }}
            className={`w-[60vw] md:w-[30vw] h-[150vh] bg-gradient-to-b border-x-2 border-white/5 relative transition-colors duration-700 ${theme.pitch}`}
         >
            {/* Crease Lines */}
            <div className="absolute top-[10%] left-0 w-full h-1 bg-white/20"></div>
            <div className="absolute top-[30%] left-0 w-full h-1 bg-white/10"></div>
            <div className="absolute top-[50%] left-0 w-full h-1 bg-white/10"></div>
            <div className="absolute top-[70%] left-0 w-full h-1 bg-white/10"></div>
            <div className="absolute top-[90%] left-0 w-full h-1 bg-white/20"></div>
            
            {/* Center Wicket Line */}
            <div className="absolute top-0 left-1/2 h-full w-1 bg-white/5 md:bg-white/10 border-r border-dashed border-white/20"></div>
         </motion.div>
      </motion.div>

      {/* Layer 3: The Running Batsman (Silhouette) */}
      <motion.div
        style={{ 
          top: batsmanY, 
          left: batsmanX, 
          scale: batsmanScale,
          opacity: batsmanOpacity
        }}
        className="absolute z-10 w-32 h-32 md:w-48 md:h-48"
      >
         {/* Using a CSS Shape/Image mask for a batsman silhouette effect */}
         <div className="w-full h-full relative">
            <img 
               src="https://cdn-icons-png.flaticon.com/512/1256/1256660.png" 
               className="w-full h-full object-contain filter invert opacity-30 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]"
               alt="Runner"
            />
            {/* Motion Blur Effect - Dynamic Color */}
            <div className={`absolute top-0 left-0 w-full h-full blur-xl rounded-full transform -translate-x-4 skew-x-12 mix-blend-overlay ${theme.fog}`}></div>
         </div>
      </motion.div>

      {/* Layer 4: Floating Particles (Atmosphere) */}
      <div className="absolute inset-0">
         <div className={`w-2 h-2 bg-white/10 rounded-full absolute top-1/4 left-1/4 animate-pulse ${theme.fog}`}></div>
         <div className="w-1 h-1 bg-white/20 rounded-full absolute top-1/2 left-3/4 animate-pulse duration-1000"></div>
         <div className="w-3 h-3 bg-white/10 rounded-full absolute bottom-1/3 left-1/2 animate-bounce duration-[3000ms]"></div>
      </div>

    </div>
  );
};