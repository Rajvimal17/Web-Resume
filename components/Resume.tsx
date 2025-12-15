import React, { forwardRef } from 'react';
import { ResumeData } from '../types';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Linkedin
} from 'lucide-react';

interface ResumeProps {
  data: ResumeData;
}

export const Resume = forwardRef<HTMLDivElement, ResumeProps>(({ data }, ref) => {
  return (
    <div 
      ref={ref} 
      className="bg-white text-slate-800 w-full max-w-[210mm] min-h-[297mm] mx-auto shadow-2xl print:shadow-none print:w-full print:max-w-none p-10 md:p-12 relative overflow-hidden font-sans"
    >
      {/* Print Specific Overrides */}
      <style>{`
        @media print {
          @page { margin: 0.5cm; size: auto; }
          body { -webkit-print-color-adjust: exact; }
          .print-break-avoid { break-inside: avoid; page-break-inside: avoid; }
          a { text-decoration: none; color: inherit; }
        }
      `}</style>

      {/* --- HEADER --- */}
      <header className="border-b-2 border-slate-800 pb-6 mb-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-extrabold uppercase tracking-tight text-slate-900 mb-2">
              {data.name}
            </h1>
            <h2 className="text-lg font-medium text-blue-700 tracking-wide">
              {data.title}
            </h2>
          </div>
          <div className="text-right text-xs md:text-sm text-slate-600 leading-relaxed">
             <div className="flex items-center justify-end gap-1.5">
                {data.contact.email} <Mail size={12} />
             </div>
             <div className="flex items-center justify-end gap-1.5">
                {data.contact.phone} <Phone size={12} />
             </div>
             <div className="flex items-center justify-end gap-1.5">
                {data.contact.location} <MapPin size={12} />
             </div>
             <div className="flex items-center justify-end gap-1.5">
                <a href={`https://${data.contact.linkedin}`} target="_blank" rel="noreferrer" className="hover:text-blue-700">
                  {data.contact.linkedin}
                </a> <Linkedin size={12} />
             </div>
          </div>
        </div>
      </header>

      {/* --- SUMMARY --- */}
      <section className="mb-6">
        <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Professional Summary</h3>
        <p className="text-sm leading-relaxed text-slate-800 text-justify">
          {data.summary}
        </p>
      </section>

      {/* --- KEY ACHIEVEMENTS (Text based grid) --- */}
      <section className="mb-8 bg-slate-50 border border-slate-200 rounded p-4 print:bg-slate-50 print:border-slate-300">
        <h3 className="text-xs font-bold uppercase tracking-widest text-slate-900 mb-3 border-b border-slate-200 pb-2">
          Key Impact & Metrics
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
           {data.impactMetrics?.slice(0, 4).map((m, i) => (
             <div key={i} className="print-break-avoid">
                <div className="text-lg font-extrabold text-blue-800">{m.value}</div>
                <div className="text-xs font-bold text-slate-700 uppercase mb-0.5">{m.label}</div>
                <div className="text-[10px] text-slate-500 leading-tight">{m.description}</div>
             </div>
           ))}
        </div>
      </section>

      {/* --- PROFESSIONAL EXPERIENCE --- */}
      <section className="mb-8">
        <h3 className="text-sm font-bold uppercase tracking-widest text-slate-900 mb-4 border-b-2 border-slate-800 pb-1">
          Professional Experience
        </h3>
        <div className="space-y-6">
          {data.experience?.map((exp, i) => (
            <div key={i} className="print-break-avoid relative pl-4 border-l-2 border-slate-200">
              <div className="flex justify-between items-baseline mb-1">
                <h4 className="font-bold text-slate-900 text-base">{exp.role}</h4>
                <span className="text-xs font-bold text-slate-500 whitespace-nowrap">{exp.startDate} – {exp.endDate}</span>
              </div>
              <div className="text-sm font-semibold text-blue-700 mb-2">
                {exp.company} <span className="text-slate-400 font-normal">| {exp.location}</span>
              </div>
              
              <ul className="list-disc list-outside ml-4 space-y-1">
                {exp.bullets?.map((bullet, bIndex) => (
                  <li key={bIndex} className="text-sm text-slate-700 leading-snug pl-1 marker:text-slate-400 text-justify">
                    <span dangerouslySetInnerHTML={{ 
                      __html: bullet.replace(
                        /(\d+(?:\.\d+)?(?:%|\+|k|K| Lakh)?)/g, 
                        '<strong class="text-slate-900">$1</strong>'
                      ) 
                    }} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <div className="grid md:grid-cols-12 gap-8 print-break-avoid">
        {/* --- EDUCATION --- */}
        <section className="md:col-span-5">
          <h3 className="text-sm font-bold uppercase tracking-widest text-slate-900 mb-3 border-b-2 border-slate-800 pb-1">
            Education
          </h3>
          <div>
            <div className="font-bold text-slate-900 text-sm">{data.education.degree}</div>
            <div className="text-sm text-slate-700">{data.education.institution}</div>
            <div className="text-xs text-slate-500 mt-1">{data.education.year}</div>
          </div>
        </section>

        {/* --- CORE COMPETENCIES --- */}
        <section className="md:col-span-7">
          <h3 className="text-sm font-bold uppercase tracking-widest text-slate-900 mb-3 border-b-2 border-slate-800 pb-1">
            Skills & Tools
          </h3>
          <div className="space-y-2">
             {data.skillCategories?.map((cat, i) => (
               <div key={i} className="text-sm flex flex-col sm:flex-row sm:gap-4">
                  <span className="font-bold text-slate-800 w-24 flex-shrink-0 text-xs uppercase tracking-wide pt-0.5">{cat.name}:</span>
                  <span className="text-slate-700 flex-1">{cat.items.join(", ")}</span>
               </div>
             ))}
             <div className="text-sm flex flex-col sm:flex-row sm:gap-4 mt-2 pt-2 border-t border-dashed border-slate-200">
                <span className="font-bold text-slate-800 w-24 flex-shrink-0 text-xs uppercase tracking-wide pt-0.5">Tools:</span>
                <span className="text-slate-700 flex-1">{data.tools?.join(", ")}</span>
             </div>
          </div>
        </section>
      </div>
      
    </div>
  );
});

Resume.displayName = 'Resume';