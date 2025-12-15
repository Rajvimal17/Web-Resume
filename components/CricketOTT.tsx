import React, { useState } from 'react';
import { ResumeData, Experience, Project } from '../types';
import { MatchDetailModal } from './MatchDetailModal';
import { ScrollStadium } from './ScrollStadium';
import { Play, ChevronRight, Star, MonitorPlay, Zap, Activity, Briefcase, Trophy, TrendingUp, BarChart3, Shield, Target, Linkedin, Mail, Phone, MapPin, Twitter } from 'lucide-react';
import { motion } from 'framer-motion';
import { playHoverSound, playClickSound } from '../utils/audio';

interface Props {
  data: ResumeData;
  onSwitchView: () => void;
}

export const CricketOTT: React.FC<Props> = ({ data, onSwitchView }) => {
  const [activeItem, setActiveItem] = useState<Experience | Project | null>(null);
  const [activeType, setActiveType] = useState<'experience' | 'project' | null>(null);

  const handleOpenDetail = (item: Experience | Project, type: 'experience' | 'project') => {
    setActiveItem(item);
    setActiveType(type);
  };

  // Scroll with offset to account for fixed navbar
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100; // Adjusted offset
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#0f1014] text-white font-sans selection:bg-blue-600 selection:text-white pb-0 overflow-x-hidden relative">
      
      {/* --- INTERACTIVE BACKGROUND --- */}
      <ScrollStadium />

      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-gradient-to-b from-[#0f1014] via-[#0f1014]/95 to-transparent px-4 md:px-12 py-4 flex items-center justify-between transition-all duration-300">
         <div className="flex items-center gap-8">
            <div 
               className="flex flex-col leading-none cursor-pointer group" 
               onClick={() => window.scrollTo(0,0)}
               onMouseEnter={playHoverSound}
            >
               <div className="flex items-center gap-1.5">
                 <div className="bg-blue-600 w-8 h-8 rounded flex items-center justify-center">
                    <Trophy size={16} fill="white" />
                 </div>
                 <div className="flex flex-col">
                    <div className="flex gap-1">
                        <span className="text-white font-bold text-lg tracking-tight uppercase group-hover:text-blue-400 transition-colors">ALL ROUNDER</span>
                        <span className="text-blue-500 font-bold text-lg tracking-tight uppercase">CV</span>
                    </div>
                 </div>
               </div>
            </div>
            
            <div className="hidden md:flex gap-6 text-sm font-semibold text-slate-300 ml-4">
               <button onMouseEnter={playHoverSound} onClick={() => scrollToSection('hero')} className="hover:text-white hover:scale-105 transition py-2 border-b-2 border-transparent hover:border-blue-500">Home</button>
               <button onMouseEnter={playHoverSound} onClick={() => scrollToSection('impact')} className="hover:text-white hover:scale-105 transition py-2 border-b-2 border-transparent hover:border-blue-500">Stats</button>
               <button onMouseEnter={playHoverSound} onClick={() => scrollToSection('experience')} className="hover:text-white hover:scale-105 transition py-2 border-b-2 border-transparent hover:border-blue-500">Innings</button>
               <button onMouseEnter={playHoverSound} onClick={() => scrollToSection('skills')} className="hover:text-white hover:scale-105 transition py-2 border-b-2 border-transparent hover:border-blue-500">Kit Bag</button>
            </div>
         </div>

         <div className="flex gap-4 items-center">
             <button 
                onClick={() => window.open(`mailto:${data.contact.email}`, '_blank')}
                className="bg-[#fbbf24] hover:bg-[#f59e0b] text-black text-[11px] md:text-xs font-bold px-5 py-2.5 rounded-sm uppercase tracking-wider transition shadow-[0_0_15px_rgba(251,191,36,0.2)] hover:shadow-[0_0_25px_rgba(251,191,36,0.5)] flex items-center gap-2 transform hover:-translate-y-0.5"
                onMouseEnter={playHoverSound}
                onClickCapture={playClickSound}
             >
                <Briefcase size={14} fill="black" /> Hire Raj Now
             </button>
         </div>
      </nav>

      {/* Hero Section */}
      <div id="hero" className="relative w-full min-h-[90vh] flex items-center pt-32 pb-48 md:pb-60">
         {/* Static background removed - ScrollStadium handles it now */}
         <div className="absolute inset-0 z-0 bg-gradient-to-t from-[#0f1014] via-transparent to-transparent"></div>

         <div className="relative z-10 px-4 md:px-12 max-w-3xl">
             <motion.div
               initial={{ opacity: 0, y: 30 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8 }}
             >
               <div className="flex flex-wrap items-center gap-3 text-[10px] md:text-xs font-bold text-slate-300 mb-6 tracking-wide uppercase">
                  <span className="text-blue-400 flex items-center gap-1 bg-blue-500/10 px-2 py-1 rounded border border-blue-500/20"><Zap size={12} fill="currentColor"/> #1 Draft Pick</span>
                  <span className="hidden md:inline w-1 h-1 bg-slate-500 rounded-full"></span>
                  <span className="flex items-center gap-1"><Star size={10} className="text-yellow-500" fill="currentColor"/> 8+ Years XP</span>
                  <span className="hidden md:inline w-1 h-1 bg-slate-500 rounded-full"></span>
                  <span className="bg-slate-800 text-slate-200 px-1.5 py-0.5 rounded border border-slate-700">Captain Material</span>
                  <span className="hidden md:inline w-1 h-1 bg-slate-500 rounded-full"></span>
                  <span>SEO & Strategy</span>
               </div>

               <h1 className="text-6xl md:text-8xl font-sport font-bold text-white mb-4 tracking-tighter leading-[0.9] drop-shadow-2xl">
                  {data.name.split(' ')[0]} <span className="text-transparent bg-clip-text bg-gradient-to-br from-blue-400 to-blue-600">{data.name.split(' ')[1]}</span>
               </h1>

               <h2 className="text-xl md:text-3xl text-slate-200 font-medium mb-6 font-sport tracking-wide flex items-center gap-3">
                  {data.title}
               </h2>

               <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-10 line-clamp-4 md:line-clamp-none max-w-xl drop-shadow-md border-l-2 border-blue-500 pl-4 bg-black/20 backdrop-blur-sm p-4 rounded">
                  {data.summary}
               </p>

               <div className="flex flex-wrap gap-4">
                  <button 
                    onClick={() => { playClickSound(); scrollToSection('experience'); }}
                    className="bg-white text-black px-8 py-3.5 rounded hover:bg-slate-200 transition flex items-center gap-3 font-bold text-sm md:text-base active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.15)] group"
                    onMouseEnter={playHoverSound}
                  >
                     <Play fill="black" size={20} className="group-hover:scale-110 transition-transform" />
                     Watch Highlights
                  </button>
                  <button 
                     onClick={() => { playClickSound(); onSwitchView(); }}
                     className="bg-white/5 backdrop-blur-md text-white px-8 py-3.5 rounded hover:bg-white/10 transition flex items-center gap-3 font-bold text-sm md:text-base border border-white/10 active:scale-95 group"
                     onMouseEnter={playHoverSound}
                  >
                     <MonitorPlay size={20} className="group-hover:text-blue-400 transition-colors" />
                     View Resume
                  </button>
               </div>
             </motion.div>
         </div>
      </div>
      
      {/* Content Trays */}
      <div className="relative z-20 space-y-12 -mt-24 md:-mt-32 pb-0 bg-gradient-to-b from-transparent to-[#0f1014]/90 backdrop-blur-[2px]">
         
         {/* TRAY 1: STATS - TRADING CARD STYLE */}
         <div id="impact" className="pl-4 md:pl-12 pt-12 md:pt-0">
            <h3 className="text-lg md:text-xl font-bold text-white mb-4 flex items-center gap-2 uppercase tracking-wider">
               <BarChart3 className="text-blue-500" /> Stats & Records (Career Best) <ChevronRight size={18} className="text-slate-500" />
            </h3>
            
            <div className="flex gap-6 overflow-x-auto pb-8 hide-scrollbar snap-x pr-8">
               {data.impactMetrics?.map((metric, i) => (
                  <motion.div 
                    key={`global-${i}`}
                    whileHover={{ scale: 1.05, y: -10 }}
                    onMouseEnter={playHoverSound}
                    className="snap-start flex-shrink-0 w-64 h-80 relative rounded-xl overflow-hidden group border border-slate-700 hover:border-blue-500 shadow-2xl bg-black/40 backdrop-blur-md"
                  >
                      {/* Background Image */}
                      <img 
                        src={metric.image} 
                        alt="bg" 
                        className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity duration-500 scale-100 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>

                      {/* Top Badge */}
                      <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-start z-10">
                          <div className="bg-blue-600/90 text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider border border-white/20">
                             Record Breaker
                          </div>
                          <Trophy className="text-yellow-400 drop-shadow-md" size={24} />
                      </div>

                      {/* Center Stats */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pt-8">
                         <div className="text-5xl font-sport font-bold text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] tracking-tight">
                            {metric.value}
                         </div>
                         <div className="h-1 w-12 bg-blue-500 my-2 rounded-full"></div>
                         <div className="text-sm font-bold text-slate-200 uppercase tracking-widest text-center px-4">
                            {metric.label}
                         </div>
                      </div>

                      {/* Bottom Details */}
                      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent z-10">
                          <p className="text-[11px] text-slate-300 font-medium mb-1 line-clamp-2 text-center">
                             {metric.description}
                          </p>
                          {metric.company && (
                             <div className="flex items-center justify-center gap-1 text-[10px] text-blue-400 font-bold uppercase tracking-wide border-t border-white/10 pt-2 mt-2">
                                <Briefcase size={10} /> {metric.company}
                             </div>
                          )}
                      </div>
                  </motion.div>
               ))}
            </div>
         </div>

         {/* TRAY 2: PROJECTS - SUPER SIX ANIMATION */}
         {(data.projects?.length > 0) && (
            <div className="pl-4 md:pl-12">
               <h3 className="text-lg md:text-xl font-bold text-white mb-4 flex items-center gap-2 uppercase tracking-wider">
                  <Star className="text-yellow-500" /> Match Winning Knocks (Highlights) <ChevronRight size={18} className="text-slate-500" />
               </h3>
               <div className="flex gap-4 overflow-x-auto pb-8 hide-scrollbar snap-x pr-8">
                  {data.projects?.map((proj, i) => (
                     <motion.div 
                        key={i}
                        className="relative snap-start flex-shrink-0 w-80 md:w-96 group cursor-pointer"
                        onClick={() => { playClickSound(); handleOpenDetail(proj, 'project'); }}
                        whileHover={{ scale: 1.02 }}
                        onMouseEnter={playHoverSound}
                     >
                        {/* Cricket Ball Animation Container */}
                        <div className="absolute inset-0 z-30 pointer-events-none overflow-hidden rounded-lg">
                           {/* The Ball */}
                           <div className="absolute top-1/2 left-[-50px] w-8 h-8 bg-red-600 rounded-full shadow-[inset_-2px_-2px_6px_rgba(0,0,0,0.5),0_0_15px_rgba(220,38,38,0.8)] opacity-0 group-hover:opacity-100 group-hover:animate-[flyBall_0.8s_ease-out_forwards] flex items-center justify-center border-2 border-white/20">
                              <div className="w-full h-[2px] bg-white/50 rotate-45"></div>
                           </div>
                           
                           {/* The 'SIX!' Text */}
                           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-0 group-hover:scale-100 opacity-0 group-hover:opacity-100 transition-all duration-300 delay-300 z-40">
                              <span className="text-6xl font-sport font-bold text-yellow-400 drop-shadow-[0_4px_0_rgba(0,0,0,1)] stroke-black" style={{ WebkitTextStroke: '1px black' }}>
                                 SIX!
                              </span>
                           </div>
                        </div>

                        {/* Card Content */}
                        <div className="aspect-video w-full rounded-lg overflow-hidden relative border border-white/10 group-hover:border-yellow-500/50 transition-all shadow-xl bg-[#1e293b]/80 backdrop-blur-sm">
                           <img 
                              src={proj.image || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2670&auto=format&fit=crop"} 
                              className="w-full h-full object-cover opacity-60 group-hover:opacity-90 transition-opacity duration-300" 
                           />
                           <div className="absolute inset-0 bg-gradient-to-t from-[#0f1014] via-transparent to-transparent"></div>
                           
                           {/* 'Live' Badge */}
                           <div className="absolute top-3 left-3 bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded animate-pulse flex items-center gap-1 z-20">
                              <span className="w-1.5 h-1.5 bg-white rounded-full"></span> LIVE REPLAY
                           </div>

                           <div className="absolute bottom-0 left-0 right-0 p-5 transform translate-y-2 group-hover:translate-y-0 transition-transform z-20">
                              <h4 className="text-white font-bold text-lg leading-tight mb-1 drop-shadow-md group-hover:text-yellow-400 transition-colors">{proj.title}</h4>
                              <p className="text-slate-300 text-xs line-clamp-2">{proj.description}</p>
                           </div>
                           
                           {/* Play Overlay */}
                           <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10 bg-black/30 backdrop-blur-[2px]">
                               <div className="w-16 h-16 rounded-full border-2 border-white/30 flex items-center justify-center">
                                  <Play fill="white" size={32} />
                               </div>
                           </div>
                        </div>

                        {/* Styles for the ball animation */}
                        <style>{`
                           @keyframes flyBall {
                              0% { left: -50px; top: 110%; transform: scale(0.5); opacity: 1; }
                              50% { top: 20%; transform: scale(1.2); }
                              100% { left: 120%; top: -20%; transform: scale(0.8); opacity: 0; }
                           }
                        `}</style>
                     </motion.div>
                  ))}
               </div>
            </div>
         )}

         {/* TRAY 3: INNINGS - Standard Cards */}
         <div id="experience" className="pl-4 md:pl-12">
            <h3 className="text-lg md:text-xl font-bold text-white mb-4 flex items-center gap-2 uppercase tracking-wider">
               <Target className="text-red-500" /> Innings (Career History) <ChevronRight size={18} className="text-slate-500" />
            </h3>
            <div className="flex gap-4 overflow-x-auto pb-8 hide-scrollbar snap-x pr-8">
               {data.experience?.map((exp, i) => (
                  <PrimeCard 
                     key={i}
                     title={exp.role}
                     subtitle={exp.company}
                     meta={`${exp.startDate} • ${exp.endDate}`}
                     image={exp.image}
                     isPremium={i === 0}
                     label={i === 0 ? "Current Season" : "Classic Match"}
                     onClick={() => handleOpenDetail(exp, 'experience')}
                  />
               ))}
            </div>
         </div>

         {/* TRAY 4: KIT BAG */}
         <div id="skills" className="pl-4 md:pl-12">
            <h3 className="text-lg md:text-xl font-bold text-white mb-4 flex items-center gap-2 uppercase tracking-wider">
               <Shield className="text-purple-500" /> Kit Bag (Skills Arsenal) <ChevronRight size={18} className="text-slate-500" />
            </h3>
            <div className="flex gap-4 overflow-x-auto pb-8 hide-scrollbar snap-x pr-8">
               {data.skillCategories?.map((cat, i) => (
                  <motion.div 
                    key={i} 
                    onMouseEnter={playHoverSound}
                    whileHover={{ y: -5 }}
                    className="snap-start flex-shrink-0 w-64 bg-[#1e293b]/80 backdrop-blur-sm hover:bg-[#252c3d] rounded-lg p-6 transition-all cursor-default border-t-4 border-blue-500 shadow-lg group"
                  >
                     <h4 className={`font-bold text-base uppercase tracking-wider mb-4 flex items-center gap-2 ${
                        i===0 ? 'text-blue-400' : i===1 ? 'text-purple-400' : i===2 ? 'text-green-400' : 'text-orange-400'
                     }`}>
                        {i===0 && <Activity size={16}/>}
                        {cat.name}
                     </h4>
                     <div className="flex flex-wrap gap-2">
                        {cat.items?.map((skill, s) => (
                           <span key={s} className="text-[11px] bg-black/40 px-2 py-1 rounded text-slate-200 font-medium border border-white/5 group-hover:border-white/10 transition-colors">
                              {skill}
                           </span>
                        ))}
                     </div>
                  </motion.div>
               ))}
            </div>
         </div>

         {/* FOOTER: HINGLISH PRESS CONFERENCE */}
         <div id="contact" className="relative mt-24 py-20 px-4 md:px-12 bg-gradient-to-t from-blue-900/20 to-transparent border-t border-white/5 backdrop-blur-md">
             <div className="absolute inset-0 z-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1510051640316-5b3240988c8b?q=80&w=2669&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay"></div>
             
             <div className="relative z-20 max-w-5xl mx-auto text-center flex flex-col items-center">
                <motion.div
                   initial={{ opacity: 0, y: 30 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   transition={{ duration: 0.8 }}
                >
                   <div className="inline-block bg-blue-600/20 text-blue-400 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-blue-500/30">
                      Transfer Window Open
                   </div>
                   <h2 className="text-4xl md:text-7xl font-sport font-bold text-white mb-6 tracking-wide drop-shadow-2xl uppercase">
                       Match Winner <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">Chahiye?</span>
                   </h2>
                   <p className="text-slate-400 text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
                       Strategy solid, execution tez, aur results... next level! <br/>
                       Don't wait for the auction. Seedha <strong>'Direct Transfer'</strong> option is open. <br/>
                       <span className="text-white italic opacity-80 mt-2 block text-sm">Apni team ka run-rate badhao!</span>
                   </p>

                   <div className="flex flex-wrap justify-center gap-6 mb-16">
                       <button 
                           onClick={() => { playClickSound(); window.open(`mailto:${data.contact.email}`); }}
                           onMouseEnter={playHoverSound}
                           className="bg-[#fbbf24] text-black px-8 py-4 rounded font-bold text-lg uppercase tracking-wider hover:bg-[#f59e0b] hover:scale-105 transition shadow-[0_0_20px_rgba(251,191,36,0.3)] flex items-center gap-3 group"
                       >
                           <Mail className="w-5 h-5 group-hover:animate-bounce" /> Offer Letter Bhejo
                       </button>
                       
                        <button 
                           onClick={() => { playClickSound(); window.open(`https://${data.contact.linkedin}`); }}
                           onMouseEnter={playHoverSound}
                           className="bg-blue-600 text-white px-8 py-4 rounded font-bold text-lg uppercase tracking-wider hover:bg-blue-700 hover:scale-105 transition shadow-[0_0_20px_rgba(37,99,235,0.3)] flex items-center gap-3 group"
                       >
                           <Linkedin className="w-5 h-5 group-hover:scale-110 transition-transform" /> Scout Profile
                       </button>
                   </div>

                   <div className="flex justify-center items-center gap-8 md:gap-12 flex-wrap">
                      <a href={`tel:${data.contact.phone}`} className="flex flex-col items-center gap-2 group cursor-pointer" onMouseEnter={playHoverSound} onClick={playClickSound}>
                         <div className="p-4 bg-white/5 rounded-full group-hover:bg-green-500/20 group-hover:text-green-400 transition-colors border border-white/10">
                            <Phone size={24} />
                         </div>
                         <span className="text-xs text-slate-500 font-bold uppercase tracking-widest group-hover:text-green-400">Phone Ghumao</span>
                      </a>
                      
                      <a href={`mailto:${data.contact.email}`} className="flex flex-col items-center gap-2 group cursor-pointer" onMouseEnter={playHoverSound} onClick={playClickSound}>
                         <div className="p-4 bg-white/5 rounded-full group-hover:bg-yellow-500/20 group-hover:text-yellow-400 transition-colors border border-white/10">
                            <Mail size={24} />
                         </div>
                         <span className="text-xs text-slate-500 font-bold uppercase tracking-widest group-hover:text-yellow-400">Mail Drop Karo</span>
                      </a>

                      <a href={`https://twitter.com/${data.contact.twitter.replace('@', '')}`} target="_blank" className="flex flex-col items-center gap-2 group cursor-pointer" onMouseEnter={playHoverSound} onClick={playClickSound}>
                         <div className="p-4 bg-white/5 rounded-full group-hover:bg-blue-400/20 group-hover:text-blue-400 transition-colors border border-white/10">
                            <Twitter size={24} />
                         </div>
                         <span className="text-xs text-slate-500 font-bold uppercase tracking-widest group-hover:text-blue-400">Twitter DM</span>
                      </a>
                      
                      <div className="flex flex-col items-center gap-2 group cursor-default">
                         <div className="p-4 bg-white/5 rounded-full group-hover:bg-red-500/20 group-hover:text-red-400 transition-colors border border-white/10">
                            <MapPin size={24} />
                         </div>
                         <span className="text-xs text-slate-500 font-bold uppercase tracking-widest group-hover:text-red-400">Noida HQ</span>
                      </div>
                   </div>

                   <div className="mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-[10px] md:text-xs text-slate-600 font-bold uppercase tracking-widest gap-4 w-full">
                       <div>© {new Date().getFullYear()} Raj Vimal • The Content Captain</div>
                       <div className="flex gap-4">
                          <span>Privacy Policy (Secrets Safe Hain)</span>
                          <span>Terms (Pehle Hire Karo)</span>
                       </div>
                   </div>
                </motion.div>
             </div>
         </div>

      </div>

      <MatchDetailModal 
        item={activeItem} 
        type={activeType} 
        onClose={() => setActiveItem(null)} 
      />
    </div>
  );
};

const PrimeCard = ({ title, subtitle, meta, image, isPremium, label, onClick }: any) => {
   return (
      <motion.div 
         className="snap-start flex-shrink-0 w-72 md:w-80 group cursor-pointer"
         onClick={() => { playClickSound(); onClick(); }}
         whileHover={{ scale: 1.05, zIndex: 10 }}
         onMouseEnter={playHoverSound}
         transition={{ duration: 0.2 }}
      >
         <div className="aspect-video w-full rounded-md overflow-hidden relative border border-white/5 group-hover:border-blue-500/50 transition-all shadow-lg bg-[#1e293b]/90 backdrop-blur-sm">
            <img 
               src={image || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2670&auto=format&fit=crop"} 
               className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f1014] via-[#0f1014]/60 to-transparent"></div>
            
            {isPremium && (
               <div className="absolute top-2 right-2 bg-[#fbbf24] text-black text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wide shadow-sm z-10">
                  Top Form
               </div>
            )}
            {!isPremium && label && (
                <div className="absolute top-2 right-2 bg-blue-600 text-white text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wide shadow-sm z-10">
                  {label}
                </div>
            )}
            
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
               <div className="bg-white/20 backdrop-blur-md p-3 rounded-full border border-white/30 shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                  <Play fill="white" className="text-white" size={24} />
               </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-1 group-hover:translate-y-0 transition-transform z-10">
               <h4 className="text-white font-bold text-sm line-clamp-1 drop-shadow-md tracking-wide">{title}</h4>
               <p className="text-slate-300 text-xs line-clamp-1 mb-1 font-medium">{subtitle}</p>
               <div className="flex items-center gap-2 text-[10px] text-slate-400 font-medium">
                  {isPremium && <span className="text-green-400 font-bold">98% Match</span>}
                  <span>{meta}</span>
               </div>
            </div>
         </div>
      </motion.div>
   )
}