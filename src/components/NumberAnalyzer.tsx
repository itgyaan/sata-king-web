import React, { useState } from 'react';
import { Search, Sparkles, Hash, Award } from 'lucide-react';
import { DayRecord } from '../types';

interface NumberAnalyzerProps {
  records: DayRecord[];
  lang: 'hi' | 'en';
}

export const NumberAnalyzer: React.FC<NumberAnalyzerProps> = ({ records, lang }) => {
  const [selectedNum, setSelectedNum] = useState<string>('89');

  const analysis = React.useMemo(() => {
    const q = selectedNum.trim();
    if (!q) return null;

    let occurrences: { day: number; market: string }[] = [];
    records.forEach((r) => {
      if (r.disawer === q) occurrences.push({ day: r.day, market: 'दिसावर (Disawer)' });
      if (r.faridabad === q) occurrences.push({ day: r.day, market: 'फरीदाबाद (Faridabad)' });
      if (r.ghaziabad === q) occurrences.push({ day: r.day, market: 'गाजियाबाद (Ghaziabad)' });
      if (r.gali === q) occurrences.push({ day: r.day, market: 'गली (Gali)' });
      if (r.delhiBazar === q) occurrences.push({ day: r.day, market: 'दिल्ली बाज़ार' });
      if (r.shriGanesh === q) occurrences.push({ day: r.day, market: 'श्री गणेश' });
    });

    return {
      count: occurrences.length,
      occurrences,
      lastDay: occurrences.length > 0 ? occurrences[occurrences.length - 1].day : null
    };
  }, [records, selectedNum]);

  return (
    <section className="mb-12 bg-[#0e1626] border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-lg">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="bg-amber-500/20 p-2 rounded-lg text-amber-400">
            <Hash className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-100 font-['Rajdhani',sans-serif]">
              {lang === 'hi' ? 'जोड़ी फ्रीक्वेंसी व रिकॉर्ड चेकर (Jodi Checker)' : 'Jodi Frequency & History Checker'}
            </h3>
            <p className="text-xs text-slate-400">
              {lang === 'hi' ? 'कोई भी 2 अंकों का नंबर डालें और देखें वह कितनी बार और कब खुला है' : 'Check how many times any 2-digit number has appeared in records'}
            </p>
          </div>
        </div>

        {/* Input for number */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-300 font-medium">{lang === 'hi' ? 'नंबर चुनें:' : 'Number:'}</span>
          <input
            type="text"
            maxLength={2}
            value={selectedNum}
            onChange={(e) => setSelectedNum(e.target.value.replace(/\D/g, ''))}
            className="w-16 text-center font-mono font-black text-lg bg-slate-900 border border-amber-500/70 text-amber-400 rounded-lg py-1 focus:outline-none focus:ring-2 focus:ring-amber-500"
            placeholder="00"
          />
        </div>
      </div>

      {analysis && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800 text-center">
            <span className="text-xs text-slate-400 uppercase font-bold">{lang === 'hi' ? 'कुल उपस्थिति' : 'Total Count'}</span>
            <div className="text-3xl font-black font-mono text-emerald-400 mt-1">
              {analysis.count} {lang === 'hi' ? 'बार' : 'times'}
            </div>
            <span className="text-[11px] text-slate-500">{lang === 'hi' ? 'इस महीने के रिकॉर्ड में' : 'in current records'}</span>
          </div>

          <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800 text-center">
            <span className="text-xs text-slate-400 uppercase font-bold">{lang === 'hi' ? 'अंतिम बार कब आया' : 'Last Appeared'}</span>
            <div className="text-3xl font-black font-mono text-amber-400 mt-1">
              {analysis.lastDay ? (lang === 'hi' ? `तारीख ${analysis.lastDay}` : `Day ${analysis.lastDay}`) : '--'}
            </div>
            <span className="text-[11px] text-slate-500">{lang === 'hi' ? 'हालिया तारीख' : 'Recent occurrence'}</span>
          </div>

          <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800 flex flex-col justify-center">
            <span className="text-xs text-slate-400 uppercase font-bold mb-1">{lang === 'hi' ? 'किस-किस बाज़ार में खुला' : 'Markets Appeared'}</span>
            <div className="flex flex-wrap gap-1.5 max-h-20 overflow-y-auto">
              {analysis.occurrences.length === 0 ? (
                <span className="text-xs text-slate-500">{lang === 'hi' ? 'यह नंबर रिकॉर्ड में नहीं आया' : 'Not appeared yet'}</span>
              ) : (
                analysis.occurrences.map((occ, i) => (
                  <span key={i} className="text-[11px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700">
                    तारीख {occ.day}: {occ.market}
                  </span>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
