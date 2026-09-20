import React, { useState } from 'react';
import { Clock, Check, Copy, TrendingUp, AlertTriangle } from 'lucide-react';
import { MarketItem } from '../types';

interface LiveResultCardsProps {
  markets: MarketItem[];
  lang: 'hi' | 'en';
}

export const LiveResultCards: React.FC<LiveResultCardsProps> = ({ markets, lang }) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1800);
  };

  return (
    <section className="mb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-5 border-b border-slate-800 pb-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-100 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-amber-400" />
            <span>{lang === 'hi' ? 'लाइव रिजल्ट बोर्ड (सभी मुख्य बाज़ार)' : 'Live Results Board (All Markets)'}</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            {lang === 'hi' ? 'सुपर फास्ट लाइव अपडेट, कल और आज का परिणाम' : 'Super fast live updates, yesterday & today numbers'}
          </p>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <span className="inline-flex items-center gap-1.5 text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2.5 py-1 rounded-full font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            {lang === 'hi' ? 'परिणाम घोषित' : 'Declared'}
          </span>
          <span className="inline-flex items-center gap-1.5 text-amber-400 bg-amber-950/60 border border-amber-800/60 px-2.5 py-1 rounded-full font-medium">
            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
            {lang === 'hi' ? 'प्रतीक्षारत (Waiting)' : 'Waiting'}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {markets.map((market) => {
          const isWaiting = market.todayResult === 'XX' || market.status === 'waiting';
          return (
            <div
              key={market.id}
              className="bg-[#111827] border border-slate-800 hover:border-amber-500/60 transition-all duration-200 rounded-xl p-4 flex flex-col justify-between shadow-lg relative group overflow-hidden"
            >
              {/* Card Header */}
              <div className="flex items-start justify-between gap-2 border-b border-slate-800/80 pb-3 mb-3">
                <div>
                  <h3 className="font-extrabold text-base sm:text-lg text-slate-100 font-['Rajdhani',sans-serif] tracking-wide">
                    {market.name}
                  </h3>
                  <div className="text-xs text-amber-400 font-medium">
                    {market.hindiName} {market.city ? `• ${market.city}` : ''}
                  </div>
                </div>

                <div className="flex items-center gap-1 bg-slate-900 border border-slate-700/80 px-2 py-1 rounded text-[11px] font-mono text-amber-300 shrink-0">
                  <Clock className="w-3 h-3 text-amber-400" />
                  <span>{market.openTime}</span>
                </div>
              </div>

              {/* Numbers Comparison */}
              <div className="grid grid-cols-2 gap-2 text-center py-2 bg-slate-900/60 rounded-lg border border-slate-800/60 mb-3">
                {/* Yesterday */}
                <div className="border-r border-slate-800/80 pr-1">
                  <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                    {lang === 'hi' ? 'कल का रिजल्ट' : 'Yesterday'}
                  </div>
                  <div className="text-2xl sm:text-3xl font-black font-mono text-slate-400 mt-0.5">
                    {market.yesterdayResult || '--'}
                  </div>
                </div>

                {/* Today */}
                <div className="pl-1">
                  <div className="text-[10px] uppercase font-bold text-amber-400 tracking-wider flex items-center justify-center gap-1">
                    <span>{lang === 'hi' ? 'आज का रिजल्ट' : 'Today'}</span>
                  </div>
                  <div
                    className={`text-2xl sm:text-3xl font-black font-mono mt-0.5 ${
                      isWaiting
                        ? 'text-red-500 animate-pulse'
                        : 'text-emerald-400 drop-shadow-[0_0_12px_rgba(52,211,153,0.3)]'
                    }`}
                  >
                    {market.todayResult || 'XX'}
                  </div>
                </div>
              </div>

              {/* Status Footer */}
              <div className="flex items-center justify-between text-xs pt-1">
                <div className="flex items-center gap-1.5">
                  {isWaiting ? (
                    <span className="flex items-center gap-1 text-amber-400 text-[11px] font-medium">
                      <AlertTriangle className="w-3 h-3 text-amber-400" />
                      {lang === 'hi' ? 'समय पर आएगा...' : 'Coming Soon...'}
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-emerald-400 text-[11px] font-medium">
                      <Check className="w-3 h-3 text-emerald-400" />
                      {lang === 'hi' ? 'रिजल्ट आ चुका है' : 'Declared'}
                    </span>
                  )}
                </div>

                {!isWaiting && market.todayResult && (
                  <button
                    onClick={() =>
                      handleCopy(
                        market.id,
                        `${market.name} (${market.hindiName}) Today: ${market.todayResult}`
                      )
                    }
                    className="text-slate-400 hover:text-amber-400 transition-colors p-1 rounded hover:bg-slate-800 text-[11px] flex items-center gap-1"
                    title="Copy Result"
                  >
                    {copiedId === market.id ? (
                      <span className="text-emerald-400 font-medium">{lang === 'hi' ? 'कॉपी हुआ!' : 'Copied!'}</span>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>{lang === 'hi' ? 'कॉपी' : 'Copy'}</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
