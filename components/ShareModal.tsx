import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, QrCode, Link as LinkIcon, Linkedin, Check } from 'lucide-react';
import { playClickSound } from '../utils/audio';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  url: string;
}

export const ShareModal: React.FC<Props> = ({ isOpen, onClose, url }) => {
  const [copied, setCopied] = React.useState(false);

  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(url)}&color=000000&bgcolor=ffffff`;
  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    playClickSound();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/90 backdrop-blur-sm"
        />

        <motion.div 
          initial={{ scale: 0.9, y: 20, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.9, y: 20, opacity: 0 }}
          className="relative w-full max-w-md bg-[#0f172a] border border-game-india-blue/50 rounded-xl overflow-hidden shadow-2xl"
        >
          <div className="bg-gradient-to-r from-game-india-blue to-blue-800 p-4 flex justify-between items-center">
            <h2 className="text-white font-sport text-xl uppercase italic tracking-wide">Share Profile</h2>
            <button onClick={onClose} className="text-white/80 hover:text-white"><X size={20} /></button>
          </div>

          <div className="p-6 space-y-6">
            
            {/* QR Code Section */}
            <div className="flex flex-col items-center justify-center p-4 bg-white/5 rounded-lg border border-white/10">
              <div className="bg-white p-2 rounded-lg mb-3">
                 <img src={qrUrl} alt="Resume QR" className="w-32 h-32" loading="lazy" />
              </div>
              <p className="text-slate-400 text-xs text-center">Scan to view interactive career mode on mobile.</p>
            </div>

            {/* Actions */}
            <div className="grid grid-cols-2 gap-3">
               <button 
                 onClick={() => window.open(linkedinUrl, '_blank')}
                 className="flex flex-col items-center justify-center gap-2 p-4 bg-[#0077b5] hover:bg-[#006396] text-white rounded-lg transition-colors font-bold text-sm uppercase tracking-wide"
               >
                  <Linkedin size={24} />
                  <span>LinkedIn</span>
               </button>
               <button 
                 onClick={handleCopy}
                 className="flex flex-col items-center justify-center gap-2 p-4 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors font-bold text-sm uppercase tracking-wide border border-white/10"
               >
                  {copied ? <Check size={24} className="text-green-500" /> : <LinkIcon size={24} />}
                  <span>{copied ? 'Copied' : 'Copy Link'}</span>
               </button>
            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};