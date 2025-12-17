import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, Send, Loader2, DollarSign, Briefcase, AlertCircle, RefreshCw, ChevronDown } from 'lucide-react';
import { playClickSound } from '../utils/audio';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

interface FormErrors {
  name?: string;
  company?: string;
  email?: string;
  contract?: string;
}

export const ContactForm: React.FC<Props> = ({ isOpen, onClose }) => {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    message: '',
    offerType: 'Full-time',
    location: 'Remote'
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const validate = () => {
    const newErrors: FormErrors = {};
    if (formData.company.length < 3) newErrors.company = "Min 3 chars required";
    if (formData.name.length < 2) newErrors.name = "Min 2 chars required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Invalid email address";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('submitting');
    playClickSound();

    try {
      // Simulate network request
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate random error (rare)
      if (Math.random() > 0.98) throw new Error("Network error");
      
      setStatus('success');
    } catch (error) {
      console.error("Submission error", error);
      setStatus('error');
    }
  };

  const resetForm = () => {
    setStatus('idle');
    setFormData({ name: '', company: '', email: '', message: '', offerType: 'Full-time', location: 'Remote' });
    setErrors({});
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    // Clear error when user types
    if (errors[e.target.name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [e.target.name]: undefined }));
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-y-auto">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/95 backdrop-blur-md"
        />

        <motion.div 
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="relative w-full max-w-lg bg-[#0f172a] border border-game-india-orange/30 shadow-[0_0_60px_rgba(255,153,51,0.15)] overflow-hidden my-auto"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-6 border-b border-white/10 flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-sport font-bold text-white uppercase tracking-widest italic">
                Transfer <span className="text-game-india-orange">Negotiation</span>
              </h2>
              <p className="text-slate-400 text-[10px] uppercase tracking-wide mt-1">
                Submit Contract Offer for Raj Vimal
              </p>
            </div>
            <button onClick={onClose} className="text-slate-500 hover:text-white transition p-2 min-h-[48px] min-w-[48px] flex items-center justify-center -mr-2">
              <X size={24} />
            </button>
          </div>

          {/* Form Content */}
          <div className="p-6 md:p-8">
            {status === 'success' ? (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/5 border border-white/10 p-6 rounded-lg relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-green-500"></div>
                
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center border border-green-500 text-green-500">
                    <CheckCircle size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-sport font-bold text-white uppercase">Offer Submitted</h3>
                    <p className="text-xs text-slate-400">Transaction ID: #TR-{Math.floor(Math.random()*10000)}</p>
                  </div>
                </div>

                <div className="space-y-4 text-sm text-slate-300 bg-black/30 p-4 rounded mb-6 font-mono border-l-2 border-game-india-orange">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Club:</span>
                    <span className="text-white font-bold">{formData.company}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Scout:</span>
                    <span className="text-white font-bold">{formData.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Terms:</span>
                    <span className="text-white font-bold">{formData.offerType}, {formData.location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Contact:</span>
                    <span className="text-white truncate max-w-[150px]">{formData.email}</span>
                  </div>
                </div>

                <p className="text-slate-400 text-xs mb-6 text-center">
                  Raj will review the terms and respond within 24-48 business hours.
                </p>

                <div className="flex gap-3">
                  <button 
                    onClick={onClose}
                    className="flex-1 bg-white/10 hover:bg-white/20 text-white font-bold py-3 text-sm uppercase tracking-wider transition rounded min-h-[48px]"
                  >
                    Close
                  </button>
                  <button 
                    onClick={resetForm}
                    className="flex-1 bg-game-india-blue hover:bg-blue-600 text-white font-bold py-3 text-sm uppercase tracking-wider transition rounded min-h-[48px]"
                  >
                    New Offer
                  </button>
                </div>
              </motion.div>
            ) : status === 'error' ? (
               <div className="text-center py-8">
                  <div className="inline-block p-4 bg-red-500/20 rounded-full text-red-500 mb-4 border border-red-500">
                     <AlertCircle size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Submission Failed</h3>
                  <p className="text-slate-400 text-sm mb-6">Please check your connection and try again.</p>
                  <button 
                    onClick={() => setStatus('idle')}
                    className="bg-white text-black font-bold px-6 py-3 rounded uppercase tracking-wider hover:bg-slate-200 transition min-h-[48px] flex items-center gap-2 mx-auto"
                  >
                     <RefreshCw size={16} /> Retry
                  </button>
               </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                     <label className="text-[10px] font-bold text-game-india-blue uppercase tracking-wider flex justify-between">
                        Club / Company
                        {errors.company && <span className="text-red-500 normal-case">{errors.company}</span>}
                     </label>
                     <input 
                        name="company" value={formData.company} onChange={handleChange}
                        placeholder="InfoEdge FC"
                        className={`w-full bg-black/40 border p-3 text-white text-sm focus:outline-none transition-colors rounded-none ${errors.company ? 'border-red-500' : 'border-white/10 focus:border-game-india-orange'}`}
                     />
                  </div>
                  <div className="space-y-1">
                     <label className="text-[10px] font-bold text-game-india-blue uppercase tracking-wider flex justify-between">
                        Scout Name
                        {errors.name && <span className="text-red-500 normal-case">{errors.name}</span>}
                     </label>
                     <input 
                        name="name" value={formData.name} onChange={handleChange}
                        placeholder="Manager Name"
                        className={`w-full bg-black/40 border p-3 text-white text-sm focus:outline-none transition-colors rounded-none ${errors.name ? 'border-red-500' : 'border-white/10 focus:border-game-india-orange'}`}
                     />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-game-india-blue uppercase tracking-wider flex justify-between">
                     Official Email
                     {errors.email && <span className="text-red-500 normal-case">{errors.email}</span>}
                  </label>
                  <input 
                    name="email" value={formData.email} onChange={handleChange}
                    placeholder="scout@club.com"
                    className={`w-full bg-black/40 border p-3 text-white text-sm focus:outline-none transition-colors rounded-none ${errors.email ? 'border-red-500' : 'border-white/10 focus:border-game-india-orange'}`}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   <div className="space-y-1">
                      <label className="text-[10px] font-bold text-game-india-blue uppercase tracking-wider">Position Type</label>
                      <div className="grid grid-cols-3 gap-2">
                         {['Full-time', 'Freelance', 'Consult'].map(type => (
                            <button
                              key={type}
                              type="button"
                              onClick={() => setFormData({...formData, offerType: type})}
                              className={`py-3 md:py-2 text-[10px] md:text-xs font-bold uppercase border transition-all min-h-[44px] ${formData.offerType === type ? 'bg-game-india-orange text-black border-game-india-orange' : 'bg-transparent text-slate-500 border-white/10 hover:border-white/30'}`}
                            >
                               {type}
                            </button>
                         ))}
                      </div>
                   </div>
                   <div className="space-y-1">
                      <label className="text-[10px] font-bold text-game-india-blue uppercase tracking-wider">Location</label>
                      <div className="relative">
                         <select 
                           name="location"
                           value={formData.location}
                           onChange={handleChange}
                           className="w-full bg-black/40 border border-white/10 p-3 text-white text-sm focus:border-game-india-orange focus:outline-none appearance-none rounded-none min-h-[44px]"
                         >
                            <option value="Remote">Remote</option>
                            <option value="Hybrid">Hybrid</option>
                            <option value="On-site">On-site</option>
                            <option value="Flexible">Flexible</option>
                         </select>
                         <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                      </div>
                   </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-game-india-blue uppercase tracking-wider">Additional Clauses (Optional)</label>
                  <textarea 
                    rows={3} name="message" value={formData.message} onChange={handleChange}
                    placeholder="We are looking for a key player to lead our SEO attack..."
                    maxLength={500}
                    className="w-full bg-black/40 border border-white/10 p-3 text-white text-sm focus:border-game-india-orange focus:outline-none transition-colors rounded-none"
                  />
                  <div className="text-[10px] text-right text-slate-600">{formData.message.length}/500</div>
                </div>

                <button 
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full bg-gradient-to-r from-game-india-blue to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-sport font-bold text-xl py-4 uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg mt-2 min-h-[56px] disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {status === 'submitting' ? (
                    <>
                       <Loader2 size={20} className="animate-spin" /> Submitting...
                    </>
                  ) : (
                    <>
                      <DollarSign size={20} /> Submit Bid
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};