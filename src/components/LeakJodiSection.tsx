import React, { useState } from 'react';
import { Target, Sparkles, Copy, Check, Info } from 'lucide-react';
import { LeakInfo } from '../types';

interface LeakJodiSectionProps {
  leakInfo: LeakInfo;
  lang: 'hi' | 'en';
}

export const LeakJodiSection: React.FC<LeakJodiSectionProps> = ({ leakInfo, lang }) => {
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopyAll = () => {
    const text = `🎯 आज का अनकट लीक नंबर (${leakInfo.date})\n★ सिंगल जोड़ी: ${leakInfo.singleJodi.join(', ')}\n★ सपोर्ट जोड़ी: ${leakInfo.supportJodi.join(', ')}\n★ अंदर हरूफ: ${leakInfo.harufAnder}\n★ बाहर हरूफ: ${leakInfo.harufBahar}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="mb-10 bg-gradient-to-r from-blue-950/40 via-slate-900 to-indigo-950/40 border-2 border-blue-600/40 rounded-2xl p-5 sm:p-7 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-blue-800/40 pb-4 mb-5">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600/20 p-2.5 rounded-xl border border-blue-500/30 text-blue-400">
            <Target className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2 font-['Rajdhani',sans-serif]">
              <span>{lang === 'hi' ? 'आज का अनकट लीक नंबर व हरूफ (Guessing Info)' : 'Today Leak Jodi & Haruf Guessing'}</span>
              <Sparkles className="w-4 h-4 text-amber-400" />
            </h2>
            <p className="text-xs text-blue-200/80">
              {lang === 'hi' ? `दिनांक: ${leakInfo.date} • सॉलिड अनकट अंक विश्लेषण` : `Date: ${leakInfo.date} • Solid Uncut Statistical Info`}
            </p>
          </div>
        </div>

        <button
          onClick={handleCopyAll}
          className="inline-flex items-center justify-center gap-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-bold px-4 py-2 rounded-lg transition-colors shadow-md shadow-blue-900/30 self-start sm:self-auto"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-emerald-300" />
              <span>{lang === 'hi' ? 'सभी जोड़ियां कॉपी हुईं!' : 'Copied!'}</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              <span>{lang === 'hi' ? 'सभी जोड़ियां कॉपी करें' : 'Copy All Jodi'}</span>
            </>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Single Jodi Box */}
        <div className="bg-slate-900/80 border border-amber-500/50 rounded-xl p-4 text-center shadow-inner relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-amber-500 text-slate-950 text-[10px] font-black uppercase px-2 py-0.5 rounded-bl">
            HOT
          </div>
          <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block mb-2">
            ★ {lang === 'hi' ? 'सिंगल जोड़ी (Single Jodi)' : 'Single Jodi'}
          </span>
          <div className="flex items-center justify-center gap-3 py-1">
            {leakInfo.singleJodi.map((num, idx) => (
              <span
                key={idx}
                className="bg-amber-500/20 text-amber-300 border border-amber-500/60 font-mono text-3xl font-black px-4 py-1.5 rounded-lg shadow-sm"
              >
                {num}
              </span>
            ))}
          </div>
          <p className="text-[11px] text-slate-400 mt-2">
            {lang === 'hi' ? 'दिसावर, गली, फरीदाबाद, गाजियाबाद में उपयोगी' : 'Primary lucky pick'}
          </p>
        </div>

        {/* Support Jodi Box */}
        <div className="bg-slate-900/80 border border-blue-500/40 rounded-xl p-4 text-center shadow-inner">
          <span className="text-xs font-bold text-blue-300 uppercase tracking-wider block mb-2">
            ★ {lang === 'hi' ? 'सपोर्ट जोड़ी (Support Jodi)' : 'Support Jodi'}
          </span>
          <div className="flex flex-wrap items-center justify-center gap-2 py-1">
            {leakInfo.supportJodi.map((num, idx) => (
              <span
                key={idx}
                className="bg-blue-900/40 text-blue-200 border border-blue-500/40 font-mono text-2xl font-bold px-3 py-1 rounded-md"
              >
                {num}
              </span>
            ))}
          </div>
          <p className="text-[11px] text-slate-400 mt-2">
            {lang === 'hi' ? 'सुरक्षित बैकअप सपोर्ट अंक' : 'Secondary backup numbers'}
          </p>
        </div>

        {/* Haruf Ander / Bahar */}
        <div className="bg-slate-900/80 border border-emerald-500/40 rounded-xl p-4 text-center shadow-inner">
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block mb-2">
            ★ {lang === 'hi' ? 'अनकट हरूफ (Haruf Ander / Bahar)' : 'Uncut Haruf (A/B)'}
          </span>
          <div className="grid grid-cols-2 gap-2 mt-2">
            <div className="bg-slate-950/80 p-2 rounded-lg border border-slate-800">
              <div className="text-[10px] text-slate-400">{lang === 'hi' ? 'अंदर हरूफ (A)' : 'Inside (A)'}</div>
              <div className="text-2xl font-black font-mono text-amber-400 mt-0.5">
                {leakInfo.harufAnder}
              </div>
            </div>
            <div className="bg-slate-950/80 p-2 rounded-lg border border-slate-800">
              <div className="text-[10px] text-slate-400">{lang === 'hi' ? 'बाहर हरूफ (B)' : 'Outside (B)'}</div>
              <div className="text-2xl font-black font-mono text-emerald-400 mt-0.5">
                {leakInfo.harufBahar}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Notice info */}
      <div className="mt-4 flex items-center gap-2 text-xs text-slate-400 bg-slate-950/50 p-2.5 rounded-lg border border-slate-800">
        <Info className="w-4 h-4 text-blue-400 shrink-0" />
        <span>{leakInfo.noticeHindi}</span>
      </div>
    </section>
  );
};
