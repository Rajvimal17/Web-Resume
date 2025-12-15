import React, { useRef, useState } from 'react';
import { Resume } from './components/Resume';
import { AiFeedbackModal } from './components/AiFeedbackModal';
import { CricketOTT } from './components/CricketOTT';
import { resumeData } from './data';
import { analyzeResume } from './services/geminiService';
import { AiFeedbackResponse } from './types';
import { Sparkles, Printer, Share2, Monitor, Download } from 'lucide-react';

type ViewMode = 'web' | 'print';

export default function App() {
  const componentRef = useRef<HTMLDivElement>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('web');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<AiFeedbackResponse | null>(null);
  const [copied, setCopied] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadPdf = async () => {
    const element = componentRef.current;
    if (!element) return;

    setIsDownloading(true);

    // Remove shadow for cleaner PDF
    element.classList.remove('shadow-2xl');

    const opt = {
      margin: 0,
      filename: 'Raj_Vimal_Resume.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, scrollY: 0 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    try {
      if ((window as any).html2pdf) {
        await (window as any).html2pdf().set(opt).from(element).save();
      } else {
        window.print();
      }
    } catch (e) {
      console.error("PDF Download Error:", e);
      window.print(); // Fallback
    } finally {
      // Restore shadow
      if (element) element.classList.add('shadow-2xl');
      setIsDownloading(false);
    }
  };

  const handleAiAnalysis = async () => {
    setIsModalOpen(true);
    if (feedback) return; 

    setAiLoading(true);
    setAiError(null);
    try {
      // Enforce a minimum 2s wait time for the dramatic "Third Umpire" effect (Reduced from 3.5s)
      const [result] = await Promise.all([
        analyzeResume(resumeData),
        new Promise(resolve => setTimeout(resolve, 2000))
      ]);
      setFeedback(result);
    } catch (err: any) {
      console.error(err);
      setAiError(err.message || "Failed to analyze resume. Please check API Key.");
    } finally {
      setAiLoading(false);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`min-h-screen ${viewMode === 'print' ? 'bg-slate-100' : 'bg-[#0f1014]'} relative font-sans print:bg-white`}>
      
      {/* WEB MODE (Interactive Theme) */}
      {viewMode === 'web' && (
        <div className="print:hidden">
           <CricketOTT data={resumeData} onSwitchView={() => setViewMode('print')} />
           
           {/* Floating Action Button for AI Review - Adjusted style for Prime theme */}
           <button 
             onClick={handleAiAnalysis}
             className="fixed bottom-8 right-8 z-50 flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full shadow-lg hover:shadow-blue-500/30 hover:-translate-y-1 transition-all group font-bold text-sm border border-white/10"
             title="Ask Third Umpire"
           >
             <Sparkles size={16} className="group-hover:animate-pulse" />
             <span className="hidden md:inline">Third Umpire Review</span>
           </button>
        </div>
      )}

      {/* DOCUMENT MODE (Print Preview) */}
      <div className={`${viewMode === 'web' ? 'hidden print:block' : 'block'} print:w-full`}>
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
                onClick={handleDownloadPdf}
                disabled={isDownloading}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs font-bold uppercase tracking-wide transition shadow-sm active:scale-95 disabled:opacity-70 disabled:cursor-wait"
              >
                {isDownloading ? <span className="animate-spin">⏳</span> : <Download size={14} />} 
                {isDownloading ? 'Downloading...' : 'Download PDF'}
              </button>

              <button 
                onClick={handleCopyLink}
                className="flex items-center gap-2 px-3 py-1.5 text-slate-500 hover:text-slate-800 rounded text-xs font-bold uppercase tracking-wide transition"
              >
                {copied ? <span className="text-green-600">Copied</span> : <Share2 size={14} />}
              </button>
            </div>
          </div>
        </nav>

        {/* Resume Paper */}
        <main className="mt-8 px-4 pb-24 print:mt-0 print:px-0 print:pb-0 flex justify-center">
          <Resume ref={componentRef} data={resumeData} />
        </main>
      </div>

      <div className="print:hidden">
        <AiFeedbackModal 
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          feedback={feedback}
          isLoading={aiLoading}
          error={aiError}
        />
      </div>
    </div>
  );
}