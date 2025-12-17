import React from 'react';
import { ResumeData } from '../types';
import { Copy, Check } from 'lucide-react';
import { playClickSound } from '../utils/audio';

interface Props {
  data: ResumeData;
  onClose: () => void;
}

export const PlainTextResume: React.FC<Props> = ({ data, onClose }) => {
  const [copied, setCopied] = React.useState(false);

  const generateText = () => {
    return `
${data.name.toUpperCase()}
${data.title}
${data.contact.email} | ${data.contact.phone} | ${data.contact.location}
LinkedIn: ${data.contact.linkedin}

SUMMARY
${data.summary}

EXPERIENCE
${data.experience.map(exp => `
${exp.role.toUpperCase()}
${exp.company} | ${exp.startDate} - ${exp.endDate}
${exp.bullets.map(b => `- ${b}`).join('\n')}
`).join('\n')}

EDUCATION
${data.education.degree}
${data.education.institution} | ${data.education.year}

SKILLS
${data.skillCategories.map(cat => `${cat.name}: ${cat.items.map(i => i.name).join(', ')}`).join('\n')}
Tools: ${data.tools.join(', ')}

PROJECTS
${data.projects.map(p => `
${p.title}
${p.description}
Metrics: ${p.metrics.join('; ')}
`).join('\n')}
    `.trim();
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generateText());
    playClickSound();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-white p-4 overflow-y-auto font-mono text-sm text-slate-800">
      <div className="max-w-4xl mx-auto">
        <div className="sticky top-0 bg-white border-b border-slate-200 py-4 mb-6 flex justify-between items-center z-10">
          <div>
            <h1 className="font-bold text-lg">Plain Text Resume (ATS Compatible)</h1>
            <p className="text-slate-500 text-xs">Formatted for easy copying into applicant tracking systems.</p>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={handleCopy}
              className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded font-bold text-xs uppercase tracking-wide transition"
            >
              {copied ? <Check size={16} className="text-green-600"/> : <Copy size={16} />}
              {copied ? 'Copied' : 'Copy Text'}
            </button>
            <button 
              onClick={onClose}
              className="px-4 py-2 bg-slate-900 text-white hover:bg-slate-800 rounded font-bold text-xs uppercase tracking-wide transition"
            >
              Close
            </button>
          </div>
        </div>
        
        <pre className="whitespace-pre-wrap bg-slate-50 p-6 rounded border border-slate-200 selection:bg-blue-100">
          {generateText()}
        </pre>
      </div>
    </div>
  );
};