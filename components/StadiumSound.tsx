import React, { useEffect, useState, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export const StadiumSound = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);

  // Simple "Broadcast Intro" jingle generator
  const playIntro = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    
    const ctx = audioContextRef.current;
    if (ctx.state === 'suspended') ctx.resume();

    // Create a simple melody
    const notes = [440, 554, 659, 880]; // A major
    const now = ctx.currentTime;

    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + i * 0.15);
      
      gain.gain.setValueAtTime(0.1, now + i * 0.15);
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.15 + 0.5);

      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start(now + i * 0.15);
      osc.stop(now + i * 0.15 + 0.5);
    });

    // Simulated "Stadium Hum" (Pink Noiseish)
    // For simplicity, we stick to the jingle as continuous noise is annoying without assets.
    setIsPlaying(true);
    setTimeout(() => setIsPlaying(false), 2000);
  };

  return (
    <button 
      onClick={playIntro}
      className={`
        fixed bottom-16 right-4 z-50 p-3 rounded-full shadow-xl transition-all
        ${isPlaying ? 'bg-green-500 scale-110' : 'bg-white text-slate-900 border border-slate-200 hover:bg-slate-50'}
        print:hidden flex items-center gap-2
      `}
      title="Play Broadcast Intro"
    >
      {isPlaying ? (
        <div className="flex gap-1 h-4 items-end">
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
      ) : (
        <Volume2 size={20} />
      )}
    </button>
  );
};