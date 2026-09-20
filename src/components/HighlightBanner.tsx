import React from 'react';
import { Flame, Clock, Calendar, CheckCircle2, AlertCircle } from 'lucide-react';
import { MarketItem } from '../types';

interface HighlightBannerProps {
  market: MarketItem | undefined;
  lang: 'hi' | 'en';
}

export const HighlightBanner: React.FC<HighlightBannerProps> = ({ market, lang }) => {
  if (!market) return null;

  const todayDate = new Date().toLocaleDateString(lang === 'hi' ? 'hi-IN' : 'en-US', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <section className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-[#162035] via-[#0f172a] to-[#0b101b] border-2 border-amber-500/80 p-5 sm:p-7 shadow-2xl shadow-amber-500/10 mb-8">
      {/* Decorative Glow Elements */}
      <div className="absolute -top-24 -right-24 w-60 h-60 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-24 -left-24 w-60 h-60 bg-red-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        {/* Market Info */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 bg-amber-500/20 text-amber-300 border border-amber-500/40 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span>{lang === 'hi' ? 'विशेष मुख्य रिजल्ट' : 'FEATURED SUPER RESULT'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-wide font-['Rajdhani',sans-serif]">
            {market.name} <span className="text-amber-400 font-normal text-2xl">({market.hindiName})</span>
          </h2>

          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs sm:text-sm text-slate-300">
            <span className="flex items-center gap-1 text-slate-300">
              <Calendar className="w-4 h-4 text-amber-400" />
              <span>{todayDate}</span>
            </span>
            <span className="flex items-center gap-1 text-slate-300">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>{lang === 'hi' ? 'ओपन टाइम' : 'Open'}: <strong>{market.openTime}</strong></span>
            </span>
            <span className="bg-slate-800/80 px-2.5 py-0.5 rounded text-slate-300 border border-slate-700">
              {lang === 'hi' ? 'कल का रिजल्ट' : 'Yesterday'}: <strong className="text-amber-300">{market.yesterdayResult || '--'}</strong>
            </span>
          </div>
        </div>

        {/* Big Highlight Number Display */}
        <div className="flex flex-col items-center bg-[#070b14]/90 border border-amber-500/40 rounded-2xl px-8 py-5 shadow-inner">
          <div className="text-xs uppercase font-bold text-amber-400 tracking-wider mb-1 flex items-center gap-1">
            {market.status === 'declared' ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>{lang === 'hi' ? 'आज का लाइव नंबर' : "Today's Declared Result"}</span>
              </>
            ) : (
              <>
                <AlertCircle className="w-3.5 h-3.5 text-amber-400 animate-spin" />
                <span>{lang === 'hi' ? 'रिजल्ट का इंतजार' : 'Waiting for result'}</span>
              </>
            )}
          </div>

          <div className="text-5xl sm:text-7xl font-black font-mono tracking-widest text-transparent bg-clip-text bg-gradient-to-b from-emerald-300 via-emerald-400 to-teal-500 drop-shadow-[0_0_25px_rgba(16,185,129,0.4)]">
            {market.todayResult || 'XX'}
          </div>

          <span className="text-[11px] text-slate-400 mt-1">
            {market.status === 'declared'
              ? (lang === 'hi' ? `घोषित समय: ${market.lastUpdated || 'OK'}` : `Declared: ${market.lastUpdated || 'OK'}`)
              : (lang === 'hi' ? `समय पर अपडेट होगा: ${market.openTime}` : `Will update at ${market.openTime}`)}
          </span>
        </div>
      </div>
    </section>
  );
};
