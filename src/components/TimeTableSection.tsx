import React from 'react';
import { Clock, MapPin, CheckCircle2, AlertCircle } from 'lucide-react';
import { MarketItem } from '../types';

interface TimeTableSectionProps {
  markets: MarketItem[];
  lang: 'hi' | 'en';
}

export const TimeTableSection: React.FC<TimeTableSectionProps> = ({ markets, lang }) => {
  return (
    <section className="mb-12">
      <div className="flex items-center gap-2 mb-4 border-b border-slate-800 pb-3">
        <Clock className="w-5 h-5 text-amber-400" />
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-100 font-['Rajdhani',sans-serif]">
            {lang === 'hi' ? 'बाज़ार समय सारणी (Market Time Table)' : 'Market Time Table & Schedule'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            {lang === 'hi' ? 'सभी मुख्य सट्टा किंग बाज़ारों के खुलने का आधिकारिक समय' : 'Official opening and result declaration times'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {markets.map((m) => (
          <div
            key={m.id}
            className="bg-[#111827] border border-slate-800 rounded-xl p-3.5 flex items-center justify-between gap-3 hover:border-slate-700 transition-colors"
          >
            <div>
              <div className="font-extrabold text-sm text-slate-100 font-['Rajdhani',sans-serif]">
                {m.name}
              </div>
              <div className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                <MapPin className="w-3 h-3 text-slate-500" />
                <span>{m.hindiName} {m.city ? `(${m.city})` : ''}</span>
              </div>
            </div>

            <div className="text-right shrink-0">
              <div className="text-sm font-black font-mono text-amber-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                {m.openTime}
              </div>
              <div className="text-[10px] mt-1">
                {m.status === 'declared' ? (
                  <span className="text-emerald-400 font-medium inline-flex items-center gap-0.5">
                    <CheckCircle2 className="w-2.5 h-2.5" />
                    {lang === 'hi' ? 'घोषित' : 'Done'}
                  </span>
                ) : (
                  <span className="text-amber-400 font-medium inline-flex items-center gap-0.5">
                    <AlertCircle className="w-2.5 h-2.5" />
                    {lang === 'hi' ? 'प्रतीक्षारत' : 'Pending'}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
