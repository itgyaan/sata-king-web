import React, { useState, useMemo } from 'react';
import { Calendar, Search, ArrowUpDown, Filter, Printer } from 'lucide-react';
import { DayRecord } from '../types';

interface MonthlyRecordChartProps {
  records: DayRecord[];
  lang: 'hi' | 'en';
}

export const MonthlyRecordChart: React.FC<MonthlyRecordChartProps> = ({ records, lang }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');
  const [selectedMonth, setSelectedMonth] = useState<string>('current');

  const filteredAndSorted = useMemo(() => {
    let list = [...records];

    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      list = list.filter(
        (r) =>
          r.day.toString().includes(q) ||
          r.disawer.toLowerCase().includes(q) ||
          r.faridabad.toLowerCase().includes(q) ||
          r.ghaziabad.toLowerCase().includes(q) ||
          r.gali.toLowerCase().includes(q) ||
          (r.delhiBazar && r.delhiBazar.toLowerCase().includes(q)) ||
          (r.shriGanesh && r.shriGanesh.toLowerCase().includes(q))
      );
    }

    list.sort((a, b) => (sortOrder === 'asc' ? a.day - b.day : b.day - a.day));
    return list;
  }, [records, searchQuery, sortOrder]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <section className="mb-12">
      {/* Section Header with Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 border-b border-slate-800 pb-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-100 flex items-center gap-2 font-['Rajdhani',sans-serif]">
            <Calendar className="w-5 h-5 text-amber-400" />
            <span>{lang === 'hi' ? 'मंथली रिकॉर्ड चार्ट (Monthly Record Chart)' : 'Monthly Record Chart'}</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            {lang === 'hi' ? 'सभी मुख्य बाज़ारों का तारीख अनुसार पूरा रिकॉर्ड' : 'Complete date-wise history for all markets'}
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={lang === 'hi' ? 'नंबर या तारीख खोजें...' : 'Search number or date...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-slate-900 border border-slate-700 text-xs sm:text-sm rounded-lg pl-9 pr-3 py-1.5 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500 w-44 sm:w-52"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
              >
                ✕
              </button>
            )}
          </div>

          <button
            onClick={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')}
            className="flex items-center gap-1 bg-slate-900 hover:bg-slate-800 border border-slate-700 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-300 transition-colors"
            title="Sort Date"
          >
            <ArrowUpDown className="w-3.5 h-3.5 text-amber-400" />
            <span>{sortOrder === 'desc' ? (lang === 'hi' ? 'नई से पुरानी' : 'Latest First') : (lang === 'hi' ? 'पुरानी से नई' : 'Oldest First')}</span>
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center gap-1 bg-slate-900 hover:bg-slate-800 border border-slate-700 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-300 transition-colors"
            title="Print Chart"
          >
            <Printer className="w-3.5 h-3.5 text-emerald-400" />
            <span>{lang === 'hi' ? 'प्रिंट' : 'Print'}</span>
          </button>
        </div>
      </div>

      {/* Chart Table */}
      <div className="overflow-x-auto rounded-xl border border-slate-800 bg-[#0d1322] shadow-xl">
        <table className="w-full text-center border-collapse">
          <thead>
            <tr className="bg-slate-900 border-b border-slate-800 text-slate-300 text-xs uppercase tracking-wider">
              <th className="py-3 px-3 border-r border-slate-800/80 font-bold text-amber-400 sticky left-0 bg-slate-900 z-10">
                {lang === 'hi' ? 'तारीख' : 'DATE'}
              </th>
              <th className="py-3 px-3 border-r border-slate-800/80 font-bold text-emerald-400">
                {lang === 'hi' ? 'दिसावर (05:00 AM)' : 'DISAWER (05:00 AM)'}
              </th>
              <th className="py-3 px-3 border-r border-slate-800/80 font-bold text-blue-400">
                {lang === 'hi' ? 'फरीदाबाद (06:15 PM)' : 'FARIDABAD (06:15 PM)'}
              </th>
              <th className="py-3 px-3 border-r border-slate-800/80 font-bold text-purple-400">
                {lang === 'hi' ? 'गाजियाबाद (08:30 PM)' : 'GHAZIABAD (08:30 PM)'}
              </th>
              <th className="py-3 px-3 border-r border-slate-800/80 font-bold text-amber-300">
                {lang === 'hi' ? 'गली (11:30 PM)' : 'GALI (11:30 PM)'}
              </th>
              <th className="py-3 px-3 border-r border-slate-800/80 font-bold text-slate-400">
                {lang === 'hi' ? 'दिल्ली बाज़ार' : 'DELHI BAZAR'}
              </th>
              <th className="py-3 px-3 font-bold text-slate-400">
                {lang === 'hi' ? 'श्री गणेश' : 'SHRI GANESH'}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 font-mono text-sm">
            {filteredAndSorted.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-8 text-center text-slate-500 font-sans text-sm">
                  {lang === 'hi' ? 'कोई रिकॉर्ड नहीं मिला।' : 'No matching records found.'}
                </td>
              </tr>
            ) : (
              filteredAndSorted.map((row) => {
                const isHighlightMatch = (val: string | undefined) =>
                  searchQuery.trim() && val && val.toLowerCase().includes(searchQuery.trim().toLowerCase());

                return (
                  <tr
                    key={row.day}
                    className="hover:bg-slate-800/50 transition-colors group"
                  >
                    <td className="py-2.5 px-3 border-r border-slate-800/80 font-bold text-amber-400/90 font-sans sticky left-0 bg-[#0d1322] group-hover:bg-slate-800/80 z-10">
                      {lang === 'hi' ? `${row.day} तारीख` : `Day ${row.day}`}
                    </td>
                    <td
                      className={`py-2.5 px-3 border-r border-slate-800/80 font-black text-base ${
                        isHighlightMatch(row.disawer)
                          ? 'bg-amber-500/30 text-amber-300 ring-2 ring-amber-400'
                          : 'text-emerald-400'
                      }`}
                    >
                      {row.disawer}
                    </td>
                    <td
                      className={`py-2.5 px-3 border-r border-slate-800/80 font-black text-base ${
                        isHighlightMatch(row.faridabad)
                          ? 'bg-amber-500/30 text-amber-300 ring-2 ring-amber-400'
                          : 'text-blue-300'
                      }`}
                    >
                      {row.faridabad}
                    </td>
                    <td
                      className={`py-2.5 px-3 border-r border-slate-800/80 font-black text-base ${
                        isHighlightMatch(row.ghaziabad)
                          ? 'bg-amber-500/30 text-amber-300 ring-2 ring-amber-400'
                          : 'text-purple-300'
                      }`}
                    >
                      {row.ghaziabad}
                    </td>
                    <td
                      className={`py-2.5 px-3 border-r border-slate-800/80 font-black text-base ${
                        isHighlightMatch(row.gali)
                          ? 'bg-amber-500/30 text-amber-300 ring-2 ring-amber-400'
                          : row.gali === 'XX'
                          ? 'text-red-500 font-bold'
                          : 'text-amber-300'
                      }`}
                    >
                      {row.gali}
                    </td>
                    <td
                      className={`py-2.5 px-3 border-r border-slate-800/80 font-semibold text-slate-300 ${
                        isHighlightMatch(row.delhiBazar) ? 'bg-amber-500/30 text-amber-300' : ''
                      }`}
                    >
                      {row.delhiBazar || '-'}
                    </td>
                    <td
                      className={`py-2.5 px-3 font-semibold text-slate-300 ${
                        isHighlightMatch(row.shriGanesh) ? 'bg-amber-500/30 text-amber-300' : ''
                      }`}
                    >
                      {row.shriGanesh || '-'}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      <div className="flex flex-wrap items-center justify-between text-xs text-slate-400 mt-2.5 px-1">
        <span>{lang === 'hi' ? `कुल दिखाए गए रिकॉर्ड: ${filteredAndSorted.length} दिन` : `Showing ${filteredAndSorted.length} days of records`}</span>
        <span className="text-amber-400/80">{lang === 'hi' ? '💡 किसी भी नंबर की खोज के लिए ऊपर सर्च बॉक्स का उपयोग करें' : '💡 Tip: Use the search box above to locate any jodi quickly'}</span>
      </div>
    </section>
  );
};
