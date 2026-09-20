import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HighlightBanner } from './components/HighlightBanner';
import { LiveResultCards } from './components/LiveResultCards';
import { LeakJodiSection } from './components/LeakJodiSection';
import { MonthlyRecordChart } from './components/MonthlyRecordChart';
import { TimeTableSection } from './components/TimeTableSection';
import { NumberAnalyzer } from './components/NumberAnalyzer';
import { DisclaimerFooter } from './components/DisclaimerFooter';
import { ExportHostingModal } from './components/ExportHostingModal';
import { AdminEditModal } from './components/AdminEditModal';
import {
  INITIAL_MARKETS,
  INITIAL_LEAK_INFO,
  INITIAL_CHART_RECORDS,
  INITIAL_CONFIG
} from './data/initialData';
import { MarketItem, LeakInfo, DayRecord, SiteConfig } from './types';
import { Download, RefreshCw, Server } from 'lucide-react';

export default function App() {
  const [lang, setLang] = useState<'hi' | 'en'>('hi');
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);
  const [isExportOpen, setIsExportOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Persistence in localStorage
  const [markets, setMarkets] = useState<MarketItem[]>(() => {
    const saved = localStorage.getItem('sk_markets');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return INITIAL_MARKETS;
  });

  const [leakInfo, setLeakInfo] = useState<LeakInfo>(() => {
    const saved = localStorage.getItem('sk_leak_info');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return INITIAL_LEAK_INFO;
  });

  const [records, setRecords] = useState<DayRecord[]>(() => {
    const saved = localStorage.getItem('sk_records');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return INITIAL_CHART_RECORDS;
  });

  const [config, setConfig] = useState<SiteConfig>(() => {
    const saved = localStorage.getItem('sk_config');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return INITIAL_CONFIG;
  });

  // Save to localStorage when updated
  const handleSaveMarkets = (newMarkets: MarketItem[]) => {
    setMarkets(newMarkets);
    localStorage.setItem('sk_markets', JSON.stringify(newMarkets));
    showToast(lang === 'hi' ? 'बाज़ार परिणाम सफलतापूर्वक अपडेट हो गए!' : 'Market results updated!');
  };

  const handleSaveLeakInfo = (newLeak: LeakInfo) => {
    setLeakInfo(newLeak);
    localStorage.setItem('sk_leak_info', JSON.stringify(newLeak));
  };

  const handleSaveConfig = (newConfig: SiteConfig) => {
    setConfig(newConfig);
    localStorage.setItem('sk_config', JSON.stringify(newConfig));
  };

  const handleResetDefaults = () => {
    if (window.confirm(lang === 'hi' ? 'क्या आप सभी परिणाम डिफ़ॉल्ट रीसेट करना चाहते हैं?' : 'Reset to default data?')) {
      setMarkets(INITIAL_MARKETS);
      setLeakInfo(INITIAL_LEAK_INFO);
      setRecords(INITIAL_CHART_RECORDS);
      setConfig(INITIAL_CONFIG);
      localStorage.removeItem('sk_markets');
      localStorage.removeItem('sk_leak_info');
      localStorage.removeItem('sk_records');
      localStorage.removeItem('sk_config');
      showToast(lang === 'hi' ? 'डेटा डिफ़ॉल्ट पर रीसेट हो गया!' : 'Data reset to defaults!');
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      showToast(lang === 'hi' ? '⚡ परिणाम रिफ्रेश: सभी बाज़ार नवीनतम स्थिति में हैं!' : '⚡ Refreshed: All markets up to date!');
    }, 800);
  };

  // Find featured highlighted market (Disawer or first declared)
  const featuredMarket = markets.find((m) => m.id === 'disawer') || markets[0];

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 flex flex-col selection:bg-amber-500 selection:text-black">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-amber-500 text-slate-950 font-black px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2 text-xs sm:text-sm border border-amber-300 animate-bounce">
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Navigation Header */}
      <Header
        config={config}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenExport={() => setIsExportOpen(true)}
        onRefresh={handleRefresh}
        isRefreshing={isRefreshing}
        lang={lang}
        onToggleLang={() => setLang(lang === 'hi' ? 'en' : 'hi')}
      />

      {/* Shared Hosting Floating Action Banner on Top */}
      <div className="bg-gradient-to-r from-blue-900/40 via-slate-900 to-amber-950/40 border-b border-slate-800 py-2.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2 text-slate-300">
            <Server className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              <strong>{lang === 'hi' ? 'शेयर्ड होस्टिंग फ्रेंडली:' : 'Shared Hosting Ready:'}</strong>{' '}
              {lang === 'hi'
                ? 'यह वेबसाइट शुद्ध HTML और CSS में आसानी से डाउनलोड करके cPanel, Hostinger या लोकल सर्वर पर डाली जा सकती है।'
                : 'Download pure static HTML & CSS files ready to drop into cPanel public_html or local hosting.'}
            </span>
          </div>

          <button
            onClick={() => setIsExportOpen(true)}
            className="shrink-0 flex items-center gap-1.5 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 px-3 py-1 rounded-md font-bold transition-all text-[11px]"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{lang === 'hi' ? 'HTML + CSS फाइलें डाउनलोड करें' : 'Get HTML + CSS Files'}</span>
          </button>
        </div>
      </div>

      {/* Main Body Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 pt-6 sm:pt-8">
        {/* Featured Big Card (e.g. Disawer) */}
        <HighlightBanner market={featuredMarket} lang={lang} />

        {/* Live Market Results Grid */}
        <LiveResultCards markets={markets} lang={lang} />

        {/* Daily Lucky Jodi & Haruf Guessing Section */}
        <LeakJodiSection leakInfo={leakInfo} lang={lang} />

        {/* 31 Days Monthly Record Chart */}
        <MonthlyRecordChart records={records} lang={lang} />

        {/* Market Opening & Closing Time Table */}
        <TimeTableSection markets={markets} lang={lang} />

        {/* Jodi Frequency Analyzer */}
        <NumberAnalyzer records={records} lang={lang} />
      </main>

      {/* Legal Disclaimer & Footer */}
      <DisclaimerFooter config={config} lang={lang} />

      {/* Shared Hosting Export Modal */}
      <ExportHostingModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        markets={markets}
        leakInfo={leakInfo}
        records={records}
        config={config}
        lang={lang}
      />

      {/* Admin / Result Editor Modal */}
      <AdminEditModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        markets={markets}
        onSaveMarkets={handleSaveMarkets}
        leakInfo={leakInfo}
        onSaveLeakInfo={handleSaveLeakInfo}
        config={config}
        onSaveConfig={handleSaveConfig}
        onResetDefaults={handleResetDefaults}
        lang={lang}
      />
    </div>
  );
}
