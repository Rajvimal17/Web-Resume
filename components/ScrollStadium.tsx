import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const ScrollStadium = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"]
  });

  // Parallax Animations based on scroll depth
  
  // 1. The Batsman: Runs from far (top) to near (bottom-right)
  const batsmanY = useTransform(scrollYProgress, [0, 1], ["10vh", "85vh"]);
  const batsmanX = useTransform(scrollYProgress, [0, 1], ["10vw", "70vw"]);
  const batsmanScale = useTransform(scrollYProgress, [0, 1], [0.4, 1.5]);
  const batsmanOpacity = useTransform(scrollYProgress, [0, 0.1, 0.8, 1], [0, 1, 1, 0]);

  // 2. The Pitch: Moves vertically to simulate camera tracking
  const pitchY = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);

  return (
    <div ref={ref} className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
      
      {/* Layer 1: Global Stadium Atmosphere (Darkened) */}
      <div className="absolute inset-0 bg-[#0f1014]">
        <img 
            src="https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=2667&auto=format&fit=crop"
            alt="Stadium"
            className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f1014] via-transparent to-[#0f1014]"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0f1014] via-transparent to-[#0f1014]"></div>
      </div>

      {/* Layer 2: The 3D Pitch Markings */}
      <motion.div 
        style={{ y: pitchY }}
        className="absolute inset-0 flex justify-center items-center perspective-[100px] opacity-20"
      >
         {/* The Pitch Strip */}
         <div className="w-[60vw] md:w-[30vw] h-[150vh] bg-gradient-to-b from-yellow-600/10 to-green-900/10 transform rotate-x-[60deg] border-x-2 border-white/5 relative">
            {/* Crease Lines */}
            <div className="absolute top-[10%] left-0 w-full h-1 bg-white/20"></div>
            <div className="absolute top-[30%] left-0 w-full h-1 bg-white/10"></div>
            <div className="absolute top-[50%] left-0 w-full h-1 bg-white/10"></div>
            <div className="absolute top-[70%] left-0 w-full h-1 bg-white/10"></div>
            <div className="absolute top-[90%] left-0 w-full h-1 bg-white/20"></div>
            
            {/* Center Wicket Line */}
            <div className="absolute top-0 left-1/2 h-full w-1 bg-white/5 md:bg-white/10 border-r border-dashed border-white/20"></div>
         </div>
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
               className="w-full h-full object-contain filter invert opacity-30 drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]"
               alt="Runner"
            />
            {/* Motion Blur Effect */}
            <div className="absolute top-0 left-0 w-full h-full bg-blue-500/20 blur-xl rounded-full transform -translate-x-4 skew-x-12 mix-blend-overlay"></div>
         </div>
      </motion.div>

      {/* Layer 4: Floating Particles (Dust/Atmosphere) */}
      <div className="absolute inset-0">
         <div className="w-2 h-2 bg-white/10 rounded-full absolute top-1/4 left-1/4 animate-pulse"></div>
         <div className="w-1 h-1 bg-blue-500/20 rounded-full absolute top-1/2 left-3/4 animate-pulse duration-1000"></div>
         <div className="w-3 h-3 bg-yellow-500/10 rounded-full absolute bottom-1/3 left-1/2 animate-bounce duration-[3000ms]"></div>
      </div>

    </div>
  );
};