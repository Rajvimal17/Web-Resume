import React, { useState, useEffect } from 'react';
import { ResumeData, Experience, Project } from '../types';
import { MatchDetailModal } from './MatchDetailModal';
import { ContactForm } from './ContactForm';
import { SkillCard } from './SkillCard';
import { ScrollStadium } from './ScrollStadium';
import { TutorialModal } from './TutorialModal';
import { IntroSequence } from './IntroSequence';
import { InfoTooltip } from './InfoTooltip';
import { QuickStatsCard, BadgeSection, UpdatesTimeline } from './GamificationWidgets'; // Imported new widgets
import { Play, Trophy, Shield, Mail, Zap, ChevronRight, TrendingUp, Monitor, Gamepad2, Award, Target, BarChart2, Users, Brain, ChevronDown, Star, Activity, Clock, Zap as ZapIcon, Layout, ArrowUp, Share2, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { playHoverSound, playClickSound } from '../utils/audio';

interface Props {
  data: ResumeData;
  onSwitchView: () => void;
  onShare: () => void;
}

type GameMode = 'QUICK_PLAY' | 'TEST' | 'ODI' | 'T20';

export const CricketOTT: React.FC<Props> = ({ data, onSwitchView, onShare }) => {
  const [activeItem, setActiveItem] = useState<Experience | Project | null>(null);
  const [activeType, setActiveType] = useState<'experience' | 'project' | null>(null);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [gameMode, setGameMode] = useState<GameMode>('QUICK_PLAY');
  const [mounted, setMounted] = useState(false);
  
  // Mobile UI States
  const [showStickyHeader, setShowStickyHeader] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  
  // Intro State
  const [introComplete, setIntroComplete] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check if intro has been seen in this session
    const hasSeenIntro = sessionStorage.getItem('intro_seen_v1');
    if (hasSeenIntro) {
      setIntroComplete(true);
    }

    // Scroll Listener for Sticky Elements
    const handleScroll = () => {
      setShowStickyHeader(window.scrollY > 200);
      setShowBackToTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleIntroFinish = () => {
    setIntroComplete(true);
    sessionStorage.setItem('intro_seen_v1', 'true');
  };

  const handleOpenDetail = (item: Experience | Project, type: 'experience' | 'project') => {
    setActiveItem(item);
    setActiveType(type);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // --- MODE FILTERING LOGIC ---
  const getFilteredExperience = () => {
    switch (gameMode) {
      case 'TEST':
        return data.experience.filter(e => 
          e.company.includes('InfoEdge') || 
          e.company.includes('Affinity')
        );
      case 'ODI':
        return data.experience.filter(e => 
          e.company.includes('Leverage') || 
          e.company.includes('Tekin') ||
          e.company.includes('Live Cities')
        );
      case 'T20':
        return data.experience.filter(e => 
          e.company.includes("BYJU")
        );
      default:
        return data.experience;
    }
  };

  const filteredExperience = getFilteredExperience();

  // Scout Report Text based on Mode
  const getScoutReport = () => {
    switch (gameMode) {
      case 'TEST':
        return {
          title: "The Test Specialist",
          subtitle: "Strategy • Architecture • Long Innings",
          desc: "Raj excels in building long-term SEO architecture and editorial frameworks. At InfoEdge and Affinity, he played the long game—building authority, scaling content ops, and delivering compounding organic growth over multiple quarters.",
          stats: "Avg. Tenure: 2+ Years | Focus: Sustainable Growth",
          color: "text-red-500",
          bg: "border-red-500"
        };
      case 'ODI':
        return {
          title: "The ODI Anchor",
          subtitle: "Campaigns • Pace • Adaptability",
          desc: "Versatile performance across varied domains. At Leverage Edu and Tekin, Raj managed targeted campaigns and pivoted strategies quickly to capture 'Sarkari Naukri' traffic and niche health segments, delivering impactful numbers in limited timeframes.",
          stats: "Focus: Cluster Authority | Lead Gen Speed",
          color: "text-blue-400",
          bg: "border-blue-400"
        };
      case 'T20':
        return {
          title: "The T20 Striker",
          subtitle: "Impact • ROI • High Volume",
          desc: "High strike-rate performance. At BYJU'S, Raj handled massive daily traffic volumes (12k+ visitors) during peak exam seasons. He delivered immediate, result-oriented outcomes where speed and real-time trend jacking were critical.",
          stats: "Metric: 12k Daily Visitors | Focus: Real-time Trends",
          color: "text-fuchsia-400",
          bg: "border-fuchsia-400"
        };
      default:
        return {
          title: "Quick Play Mode",
          subtitle: "Complete Career Overview",
          desc: "Viewing all matches. From building scratch-to-scale strategies to managing high-traffic newsrooms, this timeline covers Raj's complete journey across EdTech and Media.",
          stats: "Total Experience: 8+ Years | All Formats",
          color: "text-game-india-orange",
          bg: "border-game-india-orange"
        };
    }
  };

  const scoutReport = getScoutReport();

  const getCategoryIcon = (name: string) => {
     switch(name) {
        case 'Strategy': return <Target size={20} className="text-game-india-blue" />;
        case 'Execution': return <Zap size={20} className="text-yellow-400" />;
        case 'Leadership': return <Users size={20} className="text-green-500" />;
        case 'Analytics': return <BarChart2 size={20} className="text-purple-500" />;
        default: return <Brain size={20} className="text-white" />;
     }
  };

  return (
    <div className="min-h-screen bg-game-bg text-white font-sans overflow-x-hidden selection:bg-game-india-orange selection:text-black relative">
      
      {/* Gamification Widget (Sticky) */}
      <QuickStatsCard />

      {/* INTRO SEQUENCE - Plays Once Per Session */}
      <AnimatePresence>
        {!introComplete && <IntroSequence onComplete={handleIntroFinish} />}
      </AnimatePresence>

      {/* FIRST TIME VISITOR TUTORIAL - Only after intro */}
      {introComplete && <TutorialModal />}

      {/* INTERACTIVE BACKGROUND */}
      <ScrollStadium mode={gameMode} />

      {/* --- MOBILE STICKY HEADER (Glass-morphism) --- */}
      <AnimatePresence>
        {showStickyHeader && (
          <motion.div 
            initial={{ y: -100 }} animate={{ y: 0 }} exit={{ y: -100 }}
            className="fixed top-0 left-0 w-full h-14 bg-slate-900/90 backdrop-blur-md border-b border-white/10 z-[60] md:hidden flex items-center justify-between px-4 shadow-xl"
          >
            <div className="font-sport font-bold text-xl uppercase italic text-white truncate max-w-[100px]">Raj Vimal</div>
            <div className={`text-[10px] font-bold px-2 py-1 rounded border ${scoutReport.bg} ${scoutReport.color} uppercase bg-black/50`}>{gameMode.replace('_', ' ')}</div>
            <button 
              onClick={() => { scrollToSection('hero'); }}
              className="bg-game-india-orange text-black text-[10px] font-bold px-3 py-2 rounded uppercase tracking-wider min-h-[32px]"
            >
              Change Mode
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- TOP HUD (Desktop) --- */}
      <header className="fixed top-0 w-full z-50 px-6 py-4 hidden md:flex items-center justify-between border-b border-white/10 bg-game-bg/90 backdrop-blur-md">
         <div className="flex items-center gap-4 cursor-pointer" onClick={() => scrollToSection('hero')}>
            <div className="bg-gradient-to-br from-game-india-orange to-red-600 p-2 transform -skew-x-12 shadow-[0_0_15px_rgba(255,153,51,0.5)] group hover:scale-110 transition-transform">
               <Gamepad2 className="text-white transform skew-x-12" size={24} />
            </div>
            <div className="flex flex-col leading-none">
               <span className="text-[10px] text-game-india-orange font-bold tracking-[0.2em] uppercase">EA SPORTS STYLE</span>
               <span className="text-2xl font-sport font-bold italic tracking-wide text-white">CRICKET <span className="text-game-india-blue">'26</span></span>
            </div>
         </div>

         {/* Mode Indicator / Switcher in Header */}
         <div className="flex items-center gap-4">
             <div className="text-right">
                <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Current Mode</div>
                <div className={`font-sport font-bold text-xl uppercase ${scoutReport.color}`}>{gameMode.replace('_', ' ')}</div>
             </div>
             {gameMode !== 'QUICK_PLAY' && (
                <button 
                  onClick={() => { setGameMode('QUICK_PLAY'); scrollToSection('hero'); }}
                  className="px-3 py-1 border border-white/20 text-xs font-bold uppercase hover:bg-white/10 rounded"
                >
                   Change Mode
                </button>
             )}
         </div>

         <div className="flex items-center gap-4">
             <button 
               onClick={onShare}
               className="flex items-center justify-center p-3 hover:bg-white/10 rounded-full transition-colors border border-white/5"
               title="Share Profile"
             >
                <Share2 size={18} className="text-slate-300" />
             </button>
             <button 
               onClick={() => { playClickSound(); onSwitchView(); }}
               className="flex items-center gap-2 px-4 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 skew-btn transition group hover:shadow-[0_0_10px_rgba(255,255,255,0.2)] min-h-[48px]"
               onMouseEnter={playHoverSound}
             >
                <div className="flex items-center gap-2 uppercase font-bold text-xs tracking-wider transform skew-x-[15deg]">
                   <Monitor size={14} className="text-game-india-blue group-hover:text-white transition-colors" /> View CV
                </div>
             </button>
             <button 
               onClick={() => { playClickSound(); setIsContactOpen(true); }}
               className="bg-game-india-orange hover:bg-orange-500 text-black px-6 py-2 skew-btn font-bold uppercase tracking-wider shadow-[0_0_20px_rgba(255,153,51,0.4)] transition hover:scale-105 active:scale-95 group overflow-hidden relative min-h-[48px]"
               onMouseEnter={playHoverSound}
             >
                {/* Shine Effect */}
                <div className="absolute inset-0 bg-white/30 transform -skew-x-12 -translate-x-full group-hover:animate-shine"></div>
                <div className="flex items-center gap-2 transform skew-x-[15deg]">
                   <Mail size={16} /> Negotiate
                </div>
             </button>
         </div>
      </header>

      {/* --- FOLD 1: HERO / MODE SELECTOR --- */}
      <section id="hero" className="relative min-h-screen flex flex-col lg:flex-row items-center justify-center py-20 lg:py-24 px-4 md:px-8 z-10">
         <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mt-12 lg:mt-0">
            
            {/* --- MOBILE HEADER (Visible < lg) --- */}
            <div className="lg:hidden flex flex-col items-center text-center order-1 gap-4 mb-4 mt-8">
                <div className="relative">
                   {/* Mobile Avatar Badge */}
                   <div className="w-24 h-24 rounded-full border-[3px] border-game-india-orange shadow-[0_0_20px_rgba(255,153,51,0.4)] overflow-hidden bg-slate-800 relative z-10">
                      <img 
                        src="https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=2667&auto=format&fit=crop" 
                        className="w-full h-full object-cover"
                        alt="Profile"
                        loading="eager"
                      />
                   </div>
                   <div className="absolute -bottom-2 -right-2 bg-white text-black font-sport font-bold text-sm px-2 py-0.5 rounded border border-game-india-blue z-20 transform -rotate-12">
                      99 CM
                   </div>
                </div>

                <div className="space-y-1">
                   <h1 className="text-3xl font-extrabold uppercase tracking-tight text-white leading-none">{data.name}</h1>
                   <div className="text-slate-400 font-medium text-sm">{data.title.split('|')[0]}</div>
                   <div className="text-game-india-orange font-bold text-sm italic">SEO & Editorial Strategy</div>
                   <div className="text-[10px] text-slate-500 font-mono bg-white/5 inline-block px-2 py-0.5 rounded mt-1">8+ Years • EdTech Specialist</div>
                </div>

                {/* Mobile Actions */}
                <div className="grid grid-cols-2 gap-3 w-full max-w-xs mt-2">
                   <button 
                     onClick={() => { playClickSound(); setIsContactOpen(true); }}
                     className="bg-game-india-orange text-black font-bold py-3 rounded text-sm uppercase tracking-wider min-h-[48px]"
                   >
                     Negotiate
                   </button>
                   <button 
                     onClick={() => { playClickSound(); onSwitchView(); }}
                     className="bg-white/10 text-white font-bold py-3 rounded text-sm uppercase tracking-wider min-h-[48px]"
                   >
                     View CV
                   </button>
                </div>
            </div>

            {/* --- LEFT: Player Card (Desktop Only) --- */}
            <motion.div 
               initial={{ x: -100, opacity: 0 }}
               animate={{ x: 0, opacity: 1 }}
               transition={{ duration: 0.8 }}
               className="hidden lg:flex lg:col-span-5 flex-col items-center lg:items-end relative group perspective-card order-2"
            >
                <motion.div 
                  whileHover={{ rotateY: 5, rotateX: 5, scale: 1.02 }}
                  className="relative w-full max-w-md aspect-[3/4] bg-gradient-to-b from-slate-800 to-black border-[6px] border-game-india-orange rounded-2xl shadow-[0_0_60px_rgba(19,99,223,0.4)] overflow-hidden transition-all duration-300"
               >
                  {/* Card Background Graphics */}
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-30"></div>
                  <div className="absolute top-0 w-full h-2/3 bg-gradient-to-b from-game-india-blue/60 to-transparent mix-blend-overlay"></div>
                  
                  {/* OVR Badge */}
                  <div className="absolute top-6 left-6 flex flex-col items-center z-20">
                     <span className="text-7xl font-sport font-bold text-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)]">99</span>
                     <span className="text-xl font-bold text-game-india-orange uppercase tracking-wider">CM</span>
                  </div>

                  {/* Player Image */}
                  <img 
                     src="https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=2667&auto=format&fit=crop" 
                     className="absolute bottom-0 right-[-15%] w-[115%] h-[90%] object-cover object-top mix-blend-normal filter contrast-125 saturate-0 group-hover:saturate-100 transition-all duration-700"
                     alt="Player"
                     loading="eager"
                  />
                  
                  {/* Name Plate */}
                  <div className="absolute bottom-8 left-0 w-full text-center z-20">
                     <div className="bg-white/90 backdrop-blur mx-6 py-3 transform skew-x-[-10deg] shadow-lg border-l-8 border-game-india-orange">
                        <h1 className="text-5xl font-sport font-bold text-black uppercase transform skew-x-[10deg] leading-none tracking-tight">
                           {data.name}
                        </h1>
                     </div>
                  </div>
               </motion.div>
            </motion.div>

            {/* --- RIGHT: Intro & MODE SELECTOR --- */}
            <motion.div 
               initial={{ x: 100, opacity: 0 }}
               animate={{ x: 0, opacity: 1 }}
               transition={{ duration: 0.8, delay: 0.2 }}
               className="lg:col-span-7 space-y-6 lg:space-y-8 order-3 w-full"
            >
               {/* Desktop Intro Title (Hidden on Mobile) */}
               <div className="hidden lg:block space-y-4">
                  <h2 className="text-5xl md:text-7xl font-sport font-bold uppercase italic leading-[0.85]">
                     Select <span className="text-game-india-orange text-glow-orange">Match Format</span>
                  </h2>
                  <p className="text-slate-300 text-lg max-w-xl leading-relaxed">
                     Choose a game mode to view Raj's experience tailored to your team's needs.
                  </p>
               </div>

               {/* Mobile CTA Hint */}
               <div className="lg:hidden text-center">
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-4">Select Format to Begin</p>
               </div>

               {/* MODE SELECTION GRID */}
               <div className="grid grid-cols-2 gap-3 md:gap-4">
                  
                  {/* TEST MODE */}
                  <button 
                     onClick={() => { setGameMode('TEST'); playClickSound(); scrollToSection('quick-stats'); }}
                     onMouseEnter={playHoverSound}
                     className="group relative bg-[#2a0a0a] border border-red-900/50 hover:border-red-500 p-3 lg:p-6 rounded-lg text-left transition-all hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(220,38,38,0.3)] overflow-hidden"
                  >
                     <div className="absolute right-[-10px] top-[-10px] lg:right-[-20px] lg:top-[-20px] text-red-900/20 group-hover:text-red-900/40 transition-colors">
                        <Clock className="w-16 h-16 lg:w-24 lg:h-24" />
                     </div>
                     <div className="relative z-10">
                        <div className="flex items-center gap-1.5 mb-1">
                           <span className="text-red-500 font-bold text-[10px] lg:text-xs uppercase tracking-widest">Red Ball</span>
                           <InfoTooltip text="In cricket, Test matches last 5 days. Here: Focus on long-term strategy, architecture, and sustainable growth." />
                        </div>
                        <h3 className="text-xl lg:text-3xl font-sport font-bold text-white uppercase italic">Test Mode</h3>
                        <p className="text-slate-400 text-[10px] lg:text-xs mt-1 lg:mt-2 line-clamp-2">Strategy & Architecture<br className="hidden lg:block"/>(InfoEdge, Affinity)</p>
                     </div>
                  </button>

                  {/* ODI MODE */}
                  <button 
                     onClick={() => { setGameMode('ODI'); playClickSound(); scrollToSection('quick-stats'); }}
                     onMouseEnter={playHoverSound}
                     className="group relative bg-[#0a1a2a] border border-blue-900/50 hover:border-blue-500 p-3 lg:p-6 rounded-lg text-left transition-all hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] overflow-hidden"
                  >
                     <div className="absolute right-[-10px] top-[-10px] lg:right-[-20px] lg:top-[-20px] text-blue-900/20 group-hover:text-blue-900/40 transition-colors">
                        <Activity className="w-16 h-16 lg:w-24 lg:h-24" />
                     </div>
                     <div className="relative z-10">
                        <div className="flex items-center gap-1.5 mb-1">
                           <span className="text-blue-400 font-bold text-[10px] lg:text-xs uppercase tracking-widest">Day / Night</span>
                           <InfoTooltip text="One Day International (ODI) matches require versatility. Here: Adaptability, campaign management, and pivoting strategies." />
                        </div>
                        <h3 className="text-xl lg:text-3xl font-sport font-bold text-white uppercase italic">ODI Mode</h3>
                        <p className="text-slate-400 text-[10px] lg:text-xs mt-1 lg:mt-2 line-clamp-2">Campaigns & Agility<br className="hidden lg:block"/>(Leverage, Live Cities)</p>
                     </div>
                  </button>

                  {/* T20 MODE */}
                  <button 
                     onClick={() => { setGameMode('T20'); playClickSound(); scrollToSection('quick-stats'); }}
                     onMouseEnter={playHoverSound}
                     className="group relative bg-[#1a052a] border border-fuchsia-900/50 hover:border-fuchsia-500 p-3 lg:p-6 rounded-lg text-left transition-all hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(217,70,239,0.3)] overflow-hidden"
                  >
                     <div className="absolute right-[-10px] top-[-10px] lg:right-[-20px] lg:top-[-20px] text-fuchsia-900/20 group-hover:text-fuchsia-900/40 transition-colors">
                        <ZapIcon className="w-16 h-16 lg:w-24 lg:h-24" />
                     </div>
                     <div className="relative z-10">
                        <div className="flex items-center gap-1.5 mb-1">
                           <span className="text-fuchsia-400 font-bold text-[10px] lg:text-xs uppercase tracking-widest">Powerplay</span>
                           <InfoTooltip text="In cricket, Powerplay refers to aggressive early innings. Here: High-impact quick wins, speed, and immediate ROI." />
                        </div>
                        <h3 className="text-xl lg:text-3xl font-sport font-bold text-white uppercase italic">T20 Mode</h3>
                        <p className="text-slate-400 text-[10px] lg:text-xs mt-1 lg:mt-2 line-clamp-2">High Impact & ROI<br className="hidden lg:block"/>(BYJU'S)</p>
                     </div>
                  </button>

                   {/* QUICK PLAY */}
                   <button 
                     onClick={() => { setGameMode('QUICK_PLAY'); playClickSound(); scrollToSection('quick-stats'); }}
                     onMouseEnter={playHoverSound}
                     className="group relative bg-white/5 border border-white/10 hover:border-game-india-orange p-3 lg:p-6 rounded-lg text-left transition-all hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(255,153,51,0.3)] overflow-hidden"
                  >
                     <div className="absolute right-[-10px] top-[-10px] lg:right-[-20px] lg:top-[-20px] text-white/5 group-hover:text-white/10 transition-colors">
                        <Layout className="w-16 h-16 lg:w-24 lg:h-24" />
                     </div>
                     <div className="relative z-10">
                        <div className="text-game-india-orange font-bold text-[10px] lg:text-xs uppercase tracking-widest mb-1">Overview</div>
                        <h3 className="text-xl lg:text-3xl font-sport font-bold text-white uppercase italic">Quick Play</h3>
                        <p className="text-slate-400 text-[10px] lg:text-xs mt-1 lg:mt-2 line-clamp-2">All Roles, All Companies<br className="hidden lg:block"/>8+ Years Experience</p>
                     </div>
                  </button>
               </div>

            </motion.div>
         </div>

         {/* Scroll Indicator */}
         <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 animate-pulse pointer-events-none">
            <span className="text-[10px] uppercase tracking-[0.3em]">Scroll for Timeline</span>
            <ChevronDown size={20} />
         </div>
      </section>

      {/* --- QUICK STATS (Mobile Optimized) --- */}
      <section id="quick-stats" className="py-8 bg-black/20 border-b border-white/5 md:hidden">
        <div className="px-4">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Quick Stats</h3>
          <div className="grid grid-cols-2 gap-3">
             {data.impactMetrics.slice(0, 4).map((m, i) => (
                <div key={i} className="bg-white/5 p-3 rounded border border-white/5">
                   <div className="text-xl font-sport font-bold text-game-india-blue">{m.value}</div>
                   <div className="text-[10px] text-slate-400 uppercase leading-tight">{m.label}</div>
                </div>
             ))}
          </div>
        </div>
      </section>


      {/* --- FOLD 2: CAREER MODE (Filtered) --- */}
      <section id="career" className="relative py-24 px-4 md:px-8 bg-black/40 border-t border-white/5 backdrop-blur-sm z-10 min-h-[80vh]">
         <div className="max-w-6xl mx-auto">
            
            {/* Context Header for Career Timeline */}
            <div className="mb-6 flex items-center gap-3 opacity-80">
               <Clock className="text-game-india-orange" size={20} />
               <p className="text-sm md:text-base text-slate-300 font-bold uppercase tracking-wide">
                  📅 Raj's career journey — From 2017 to present, across leading companies
               </p>
            </div>

            {/* SCOUT REPORT PANEL */}
            <motion.div
               key={gameMode} 
               initial={{ opacity: 0, y: -20 }}
               animate={{ opacity: 1, y: 0 }}
               className={`mb-12 p-6 rounded-lg border-l-4 ${scoutReport.bg} bg-black/60 backdrop-blur-md relative overflow-hidden`}
            >
               <div className="absolute top-0 right-0 p-4 opacity-10">
                  <Activity size={80} />
               </div>
               <div className="relative z-10">
                  <div className={`text-xs font-bold uppercase tracking-widest mb-2 ${scoutReport.color}`}>Scout Report: {gameMode.replace('_', ' ')}</div>
                  <h3 className="text-3xl font-sport font-bold text-white uppercase italic mb-2">{scoutReport.title}</h3>
                  <div className="flex flex-wrap gap-4 text-sm text-slate-300 mb-4">
                     <span className="font-bold text-white">{scoutReport.subtitle}</span>
                     <span className="opacity-50">|</span>
                     <span>{scoutReport.stats}</span>
                  </div>
                  <p className="text-slate-400 max-w-3xl leading-relaxed text-sm">
                     {scoutReport.desc}
                  </p>
               </div>
            </motion.div>

            {/* Timeline / List */}
            <div className="space-y-6">
               <AnimatePresence mode="wait">
                  {filteredExperience.length > 0 ? (
                     filteredExperience.map((exp, i) => (
                        <motion.div 
                           key={`${exp.company}-${gameMode}`}
                           initial={{ opacity: 0, x: -50 }}
                           whileInView={{ opacity: 1, x: 0 }}
                           viewport={{ once: true }}
                           transition={{ delay: i * 0.1 }}
                           whileHover={{ scale: 1.01, x: 10 }}
                           onClick={() => { handleOpenDetail(exp, 'experience'); playClickSound(); }}
                           onMouseEnter={playHoverSound}
                           className={`group relative min-h-[128px] md:h-40 bg-game-panel border-l-8 hover:border-game-india-blue transition-all cursor-pointer flex flex-col md:flex-row items-stretch overflow-hidden rounded-r-lg shadow-lg hover:shadow-2xl hover:bg-white/5 ${scoutReport.bg}`}
                        >
                           {/* Background Image / Texture */}
                           <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none">
                              <img src={exp.image} className="w-full h-full object-cover grayscale" alt="bg" loading="lazy" />
                           </div>
                           <div className="absolute inset-0 bg-gradient-to-r from-game-panel via-game-panel/90 to-transparent pointer-events-none"></div>

                           {/* Date Block (Match Day) - Top on mobile, Left on desktop */}
                           <div className="relative md:w-48 flex md:flex-col items-center justify-between md:justify-center px-4 py-2 md:p-0 border-b md:border-b-0 md:border-r border-white/5 z-10 bg-black/20 group-hover:bg-game-india-blue/10 transition-colors shrink-0">
                              <span className={`font-bold text-xs md:text-sm uppercase tracking-widest ${scoutReport.color}`}>{exp.startDate.split(' ')[1]}</span>
                              <span className="text-white font-sport text-3xl md:text-5xl">{exp.startDate.split(' ')[0]}</span>
                              <div className="md:hidden text-[10px] text-slate-400 font-mono bg-black/50 px-2 rounded">
                                 {exp.keyOutcome}
                              </div>
                           </div>

                           {/* Info Block */}
                           <div className="relative flex-1 p-4 md:px-12 z-10 flex flex-col justify-center">
                              <h4 className="text-xl md:text-4xl font-sport font-bold text-white uppercase italic group-hover:text-game-india-blue md:group-hover:translate-x-2 transition-all duration-300">
                                 {exp.role}
                              </h4>
                              <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4 mt-1 md:mt-2">
                                 <span className="text-slate-300 font-bold uppercase tracking-wider text-xs md:text-sm md:border-r border-slate-600 md:pr-4">{exp.company}</span>
                                 <span className={`font-mono text-xs hidden md:inline-block ${scoutReport.color}`}>KEY STAT: {exp.keyOutcome}</span>
                              </div>
                           </div>

                           {/* Action Icon */}
                           <div className="relative hidden md:flex px-8 z-10 opacity-30 group-hover:opacity-100 group-hover:scale-125 transition-all items-center">
                              <div className="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center">
                                 <Play fill="white" size={20} />
                              </div>
                           </div>
                        </motion.div>
                     ))
                  ) : (
                     <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-12 text-center text-slate-500 font-sport text-2xl uppercase">
                        No matches found in this format.
                     </motion.div>
                  )}
               </AnimatePresence>
            </div>
         </div>
      </section>

      {/* --- FOLD 3: LOCKER ROOM (Stats & Highlights) --- */}
      <section id="stats" className="relative py-24 px-4 md:px-8 z-10">
         <div className="max-w-7xl mx-auto">
            
            {/* BADGES SECTION */}
            <BadgeSection badges={data.badges} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* COLUMN 1: PLAYER ATTRIBUTES */}
              <div id="attributes">
                <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="flex flex-col gap-2 mb-12 border-b-4 border-white/10 pb-4"
                >
                    <div className="flex items-center gap-4">
                      <Shield className="text-game-india-orange" size={32} />
                      <h3 className="text-3xl font-sport font-bold uppercase italic">
                          Player Attributes <span className="text-sm text-slate-400 font-sans normal-case ml-2 opacity-70 tracking-normal not-italic">(Skill Ratings)</span>
                      </h3>
                    </div>
                    <p className="text-slate-400 text-sm">📊 What Raj excels at — Rated on technical depth and real-world impact.</p>
                </motion.div>

                <div className="grid gap-6">
                    {data.skillCategories.map((cat, i) => (
                      <motion.div 
                          key={i}
                          initial={{ opacity: 0, x: -30 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="bg-game-panel/80 backdrop-blur border border-white/10 p-6 rounded-lg hover:border-game-india-blue/50 transition-colors"
                      >
                          <h4 className="font-sport text-2xl uppercase tracking-widest border-b border-white/10 pb-2 mb-4 flex justify-between items-center text-white">
                            <span className="flex items-center gap-3">
                                {getCategoryIcon(cat.name)}
                                {cat.name}
                            </span>
                            <div className="flex items-center gap-2">
                                <span className="text-xs text-slate-500 font-sans tracking-normal">RATING</span>
                                <span className="text-game-india-orange font-bold">9{8-i}</span>
                            </div>
                          </h4>
                          <div className="space-y-3">
                            {cat.items.map((skill, s) => (
                                <SkillCard key={s} skill={skill} />
                            ))}
                          </div>
                      </motion.div>
                    ))}
                    
                    {/* Emerging Skills */}
                    <motion.div 
                      whileInView={{ opacity: 1 }} 
                      className="bg-gradient-to-br from-game-panel to-blue-900/20 border border-blue-500/20 p-6 rounded-lg"
                    >
                        <h4 className="font-sport text-xl uppercase tracking-widest text-blue-400 mb-4 flex items-center gap-2">
                           <Sparkles size={18} /> Emerging Tech & Skills
                        </h4>
                        <div className="flex flex-wrap gap-2">
                           {data.emergingSkills.map((skill, i) => (
                              <span key={i} className="bg-blue-500/10 text-blue-200 border border-blue-500/20 px-3 py-1.5 rounded text-xs font-bold uppercase">
                                 {skill}
                              </span>
                           ))}
                        </div>
                    </motion.div>
                </div>
              </div>

              {/* COLUMN 2: HIGHLIGHTS & UPDATES */}
              <div id="highlights">
                
                {/* LATEST UPDATES */}
                <UpdatesTimeline updates={data.latestUpdates} />

                <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="flex flex-col gap-2 mb-12 border-b-4 border-white/10 pb-4"
                >
                    <div className="flex items-center gap-4">
                      <Play className="text-game-india-blue" size={32} />
                      <div className="flex items-center gap-2">
                          <h3 className="text-3xl font-sport font-bold uppercase italic">
                            Match Replays <span className="text-sm text-slate-400 font-sans normal-case ml-2 opacity-70 tracking-normal not-italic">(Case Studies)</span>
                          </h3>
                          <InfoTooltip text="Real-world examples of Raj's work impact. Click any replay to see detailed project breakdown." />
                      </div>
                    </div>
                    <p className="text-slate-400 text-sm">🎯 What Raj has accomplished — Real projects, real results, real impact.</p>
                </motion.div>

                <div className="space-y-8">
                    {data.projects.map((proj, i) => (
                      <motion.div 
                          key={i}
                          initial={{ opacity: 0, y: 30 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                          onClick={() => { handleOpenDetail(proj, 'project'); playClickSound(); }}
                          onMouseEnter={playHoverSound}
                          className="group relative aspect-video bg-black border-4 border-white/10 hover:border-game-india-orange cursor-pointer overflow-hidden rounded-xl shadow-2xl transition-all hover:scale-[1.02]"
                      >
                          <img 
                            src={proj.image} 
                            alt={proj.title} 
                            className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" 
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
                          
                          {/* Center Play Button */}
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                            <div className="w-20 h-20 rounded-full bg-game-india-orange text-black flex items-center justify-center shadow-[0_0_30px_rgba(255,153,51,0.6)] transform scale-0 group-hover:scale-100 transition-transform">
                                <Play fill="black" size={32} className="ml-1" />
                            </div>
                          </div>

                          {/* Bottom Info */}
                          <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/95 to-transparent z-10">
                            <div className="flex items-center gap-3 mb-2">
                                <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded animate-pulse uppercase">Highlight Reel</span>
                                <span className="text-game-india-blue text-xs font-bold uppercase tracking-wider">Strategy & Execution</span>
                            </div>
                            <h3 className="text-white font-sport text-3xl uppercase leading-none truncate">{proj.title}</h3>
                            <p className="text-slate-400 text-sm mt-1 truncate">{proj.subtitle}</p>
                          </div>
                      </motion.div>
                    ))}

                    {/* Locked Slots */}
                    <div className="grid grid-cols-2 gap-4">
                        {[1, 2].map(n => (
                          <div key={`lock-${n}`} className="aspect-video bg-white/5 border-2 border-white/5 flex flex-col items-center justify-center text-slate-600 rounded-lg hover:bg-white/10 transition-colors">
                              <Award size={32} className="mb-2 opacity-50" />
                              <span className="font-sport text-xl uppercase tracking-widest opacity-50">Locked</span>
                          </div>
                        ))}
                    </div>
                </div>
              </div>
            </div>

         </div>
      </section>

      {/* --- BACK TO TOP BUTTON (Mobile/Desktop) --- */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }} 
            animate={{ scale: 1, opacity: 1 }} 
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-16 right-4 w-14 h-14 bg-game-india-orange text-black rounded-full shadow-[0_0_20px_rgba(255,153,51,0.5)] z-[40] flex items-center justify-center print:hidden border-2 border-white/20 hover:scale-110 transition-transform"
            aria-label="Back to top"
          >
            <ArrowUp size={24} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* --- FOOTER --- */}
      <footer className="relative bg-black border-t border-white/10 py-12 px-8 z-10 pb-20">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
             <div className="text-center md:text-left">
                <h4 className="font-sport text-3xl font-bold text-white uppercase italic">Raj Vimal</h4>
                <p className="text-slate-500 text-sm">Content Manager | SEO Strategist | Leader</p>
             </div>
             <div className="flex gap-6">
                 <button onClick={() => window.open('https://linkedin.com/in/rjvimal', '_blank')} className="text-slate-400 hover:text-game-india-blue transition-colors p-2 min-h-[48px] min-w-[48px] flex items-center justify-center"><Monitor size={24} /></button>
                 <button onClick={() => setIsContactOpen(true)} className="text-slate-400 hover:text-game-india-orange transition-colors p-2 min-h-[48px] min-w-[48px] flex items-center justify-center"><Mail size={24} /></button>
             </div>
             <div className="text-xs text-slate-600 font-mono">
                © 2026 EA SPORTS STYLE RESUME. PRESS START TO BEGIN.
             </div>
          </div>
      </footer>

      {/* --- BOTTOM TICKER --- */}
      <div className="fixed bottom-0 w-full h-10 bg-black border-t border-white/20 z-50 flex items-center">
         <div className="bg-game-india-orange text-black font-bold px-4 h-full flex items-center text-xs uppercase tracking-widest shrink-0">
            News Feed
         </div>
         <div className="flex-1 overflow-hidden relative h-full">
            <div className="animate-marquee whitespace-nowrap flex items-center gap-12 text-slate-400 text-xs font-mono h-full px-4">
               <span>• RAJ VIMAL HITS 50% ORGANIC GROWTH AT INFOEDGE •</span>
               <span>• TRANSFER RUMORS: TOP COMPANIES SCOUTING FOR NEW CONTENT LEAD •</span>
               <span>• SEO STRATEGY RATED 99/99 BY GOOGLE ANALYTICS •</span>
               <span>• NEW HIGH SCORE: 7,000 QUALIFIED LEADS GENERATED •</span>
            </div>
         </div>
      </div>

      {/* Modals */}
      <MatchDetailModal 
        item={activeItem} 
        type={activeType} 
        onClose={() => setActiveItem(null)} 
      />

      <ContactForm 
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </div>
  );
};