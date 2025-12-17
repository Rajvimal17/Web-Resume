import React, { useRef, useState } from 'react';
import { Resume } from './components/Resume';
import { PlainTextResume } from './components/PlainTextResume';
import { AiFeedbackModal } from './components/AiFeedbackModal';
import { CricketOTT } from './components/CricketOTT';
import { ShareModal } from './components/ShareModal';
import { resumeData } from './data';
import { analyzeResume } from './services/geminiService';
import { AiFeedbackResponse } from './types';
import { Sparkles, Printer, Share2, Monitor, Download, Activity, FileText } from 'lucide-react';

type ViewMode = 'web' | 'print' | 'plain-text';

export default function App() {
  const componentRef = useRef<HTMLDivElement>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('web');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<AiFeedbackResponse | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  // ATS Optimization: Prefer native print for text-selectable PDF
  const handleDownloadPdf = () => {
    // We force the print view briefly if not already there
    const prevMode = viewMode;
    setViewMode('print');
    
    // Allow React to render the print view
    setTimeout(() => {
      window.print();
      // Restore previous mode after print dialog closes (or user interacts)
      // Note: This is approximate as we can't detect when print dialog closes in all browsers
      // Ideally user manually switches back, but we can set a timeout or listener
    }, 500);
  };

  const handleAiAnalysis = async () => {
    setIsModalOpen(true);
    if (feedback) return; 

    setAiLoading(true);
    setAiError(null);
    try {
      // Enforce a minimum 4.5s wait time for the dramatic "Third Umpire" DRS animation effect
      const [result] = await Promise.all([
        analyzeResume(resumeData),
        new Promise(resolve => setTimeout(resolve, 4500))
      ]);
      setFeedback(result);
    } catch (err: any) {
      console.error(err);
      setAiError(err.message || "Failed to analyze resume. Please check API Key.");
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className={`min-h-screen ${viewMode === 'print' ? 'bg-slate-100' : 'bg-[#020617]'} relative font-sans print:bg-white`}>
      
      {/* WEB MODE (Interactive Theme) */}
      {viewMode === 'web' && (
        <div className="print:hidden">
           <CricketOTT 
              data={resumeData} 
              onSwitchView={() => setViewMode('print')} 
              onShare={() => setIsShareOpen(true)}
           />
           
           {/* Floating Action Button for AI Review - DRS Style */}
           <button 
             onClick={handleAiAnalysis}
             className="fixed bottom-8 right-8 z-50 flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-red-600 to-red-800 text-white rounded-md shadow-[0_0_20px_rgba(220,38,38,0.5)] hover:shadow-[0_0_30px_rgba(220,38,38,0.8)] hover:scale-105 transition-all group font-bold text-sm border-2 border-white/20 uppercase tracking-wide font-sport skew-btn"
             title="Ask Third Umpire"
           >
             <div className="transform skew-x-12 flex items-center gap-2">
                <div className="relative">
                   <div className="absolute inset-0 bg-white rounded-full animate-ping opacity-75"></div>
                   <Activity size={20} className="relative z-10" />
                </div>
                <div className="flex flex-col items-start leading-none">
                   <span className="text-[10px] text-red-200 tracking-widest">DECISION REVIEW</span>
                   <span className="text-lg">ASK THIRD UMPIRE</span>
                </div>
             </div>
           </button>
        </div>
      )}

      {/* PLAIN TEXT MODE */}
      {viewMode === 'plain-text' && (
        <PlainTextResume data={resumeData} onClose={() => setViewMode('web')} />
      )}

      {/* DOCUMENT MODE (Print Preview) */}
      <div className={`${viewMode === 'web' || viewMode === 'plain-text' ? 'hidden print:block' : 'block'} print:w-full`}>
        {/* Control Bar */}
        <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm px-4 py-3 print:hidden">
          <div className="max-w-5xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => setViewMode('web')}>
               <span className="font-bold text-slate-900 text-sm uppercase tracking-wider">Raj Vimal</span>
            </div>

            <div className="flex items-center gap-3">
              <button 
                onClick={() => setViewMode('web')}
                className="flex items-center gap-2 px-3 py-1.5 text-slate-600 hover:text-blue-600 hover:bg-slate-50 rounded text-xs font-bold uppercase tracking-wide transition"
              >
                <Monitor size={14} /> Web View
              </button>

              <button 
                onClick={() => setViewMode('plain-text')}
                className="flex items-center gap-2 px-3 py-1.5 text-slate-600 hover:text-blue-600 hover:bg-slate-50 rounded text-xs font-bold uppercase tracking-wide transition"
              >
                <FileText size={14} /> Plain Text
              </button>
              
              <button 
                onClick={handleDownloadPdf}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs font-bold uppercase tracking-wide transition shadow-sm active:scale-95"
              >
                <Download size={14} /> Download PDF
              </button>

              <button 
                onClick={() => setIsShareOpen(true)}
                className="flex items-center gap-2 px-3 py-1.5 text-slate-500 hover:text-slate-800 rounded text-xs font-bold uppercase tracking-wide transition"
              >
                <Share2 size={14} />
              </button>
            </div>
          </div>
        </nav>

        {/* Resume Paper */}
        <main className="mt-8 px-4 pb-24 print:mt-0 print:px-0 print:pb-0 flex justify-center">
          <Resume ref={componentRef} data={resumeData} />
        </main>
      </div>

      {/* Modals */}
      <div className="print:hidden">
        <AiFeedbackModal 
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          feedback={feedback}
          isLoading={aiLoading}
          error={aiError}
        />
        <ShareModal 
          isOpen={isShareOpen} 
          onClose={() => setIsShareOpen(false)}
          url={typeof window !== 'undefined' ? window.location.href : 'https://rajvimal.com'}
        />
      </div>
    </div>
  );
}