import React, { useState } from 'react';
import { X, Save, RotateCcw, Plus, Trash2, CheckCircle2, Shield } from 'lucide-react';
import { MarketItem, LeakInfo, SiteConfig } from '../types';

interface AdminEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  markets: MarketItem[];
  onSaveMarkets: (markets: MarketItem[]) => void;
  leakInfo: LeakInfo;
  onSaveLeakInfo: (info: LeakInfo) => void;
  config: SiteConfig;
  onSaveConfig: (cfg: SiteConfig) => void;
  onResetDefaults: () => void;
  lang: 'hi' | 'en';
}

export const AdminEditModal: React.FC<AdminEditModalProps> = ({
  isOpen,
  onClose,
  markets,
  onSaveMarkets,
  leakInfo,
  onSaveLeakInfo,
  config,
  onSaveConfig,
  onResetDefaults,
  lang
}) => {
  const [editedMarkets, setEditedMarkets] = useState<MarketItem[]>(markets);
  const [editedLeak, setEditedLeak] = useState<LeakInfo>(leakInfo);
  const [editedConfig, setEditedConfig] = useState<SiteConfig>(config);
  const [activeSubTab, setActiveSubTab] = useState<'markets' | 'leak' | 'settings'>('markets');
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Sync state if modal reopens
  React.useEffect(() => {
    if (isOpen) {
      setEditedMarkets(markets);
      setEditedLeak(leakInfo);
      setEditedConfig(config);
      setSavedSuccess(false);
    }
  }, [isOpen, markets, leakInfo, config]);

  if (!isOpen) return null;

  const handleMarketChange = (index: number, field: keyof MarketItem, value: string) => {
    const updated = [...editedMarkets];
    updated[index] = { ...updated[index], [field]: value };
    setEditedMarkets(updated);
  };

  const handleSaveAll = () => {
    onSaveMarkets(editedMarkets);
    onSaveLeakInfo(editedLeak);
    onSaveConfig(editedConfig);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-[#0f172a] border-2 border-slate-700 rounded-2xl w-full max-w-3xl shadow-2xl overflow-hidden my-6 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-slate-900 border-b border-slate-800 p-4 sm:p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-amber-500/20 p-2 rounded-xl text-amber-400">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-white font-['Rajdhani',sans-serif]">
                {lang === 'hi' ? 'रिजल्ट एवं जानकारी एडमिन पैनल (Result Manager)' : 'Results & Info Manager'}
              </h2>
              <p className="text-xs text-slate-400">
                {lang === 'hi' ? 'यहाँ से परिणाम, समय, लीक जोड़ियां और वेबसाइट की जानकारी आसानी से बदलें' : 'Easily update live results, timings, guessing jodi and notifications'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-slate-800 bg-slate-900/50 px-4 text-xs font-bold">
          <button
            onClick={() => setActiveSubTab('markets')}
            className={`py-3 px-4 border-b-2 transition-colors ${
              activeSubTab === 'markets' ? 'border-amber-500 text-amber-400' : 'border-transparent text-slate-400'
            }`}
          >
            ⚡ {lang === 'hi' ? 'बाज़ार परिणाम (Live Results)' : 'Market Results'}
          </button>

          <button
            onClick={() => setActiveSubTab('leak')}
            className={`py-3 px-4 border-b-2 transition-colors ${
              activeSubTab === 'leak' ? 'border-amber-500 text-amber-400' : 'border-transparent text-slate-400'
            }`}
          >
            🎯 {lang === 'hi' ? 'लीक जोड़ियां व हरूफ (Guessing)' : 'Leak Jodi & Haruf'}
          </button>

          <button
            onClick={() => setActiveSubTab('settings')}
            className={`py-3 px-4 border-b-2 transition-colors ${
              activeSubTab === 'settings' ? 'border-amber-500 text-amber-400' : 'border-transparent text-slate-400'
            }`}
          >
            ⚙️ {lang === 'hi' ? 'वेबसाइट सेटिंग्स (Notices)' : 'Site Settings'}
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 overflow-y-auto flex-1 space-y-4">
          {savedSuccess && (
            <div className="bg-emerald-950/80 border border-emerald-500/80 text-emerald-300 p-3 rounded-xl flex items-center gap-2 text-xs sm:text-sm font-bold animate-fadeIn">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>सफलतापूर्वक सेव हो गया! वेबसाइट और डाउनलोड फाइलें तुरंत अपडेट हो गईं।</span>
            </div>
          )}

          {/* SubTab: Markets Results */}
          {activeSubTab === 'markets' && (
            <div className="space-y-4">
              <div className="text-xs text-slate-400">
                प्रत्येक बाज़ार का आज का परिणाम (Today), कल का परिणाम (Yesterday), और स्थिति (Declared/Waiting) सीधे यहाँ से बदलें:
              </div>

              <div className="space-y-3">
                {editedMarkets.map((m, idx) => (
                  <div
                    key={m.id}
                    className="bg-slate-900 border border-slate-800 rounded-xl p-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                  >
                    <div className="w-40 shrink-0">
                      <span className="font-bold text-slate-200 text-sm">{m.name}</span>
                      <span className="text-xs text-amber-400 block">{m.hindiName}</span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 w-full">
                      <div>
                        <label className="text-[10px] text-slate-400 block mb-0.5">कल (Yesterday)</label>
                        <input
                          type="text"
                          maxLength={2}
                          value={m.yesterdayResult}
                          onChange={(e) => handleMarketChange(idx, 'yesterdayResult', e.target.value)}
                          className="w-full bg-slate-950 border border-slate-700 text-slate-300 rounded px-2 py-1 text-sm font-mono text-center"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] text-amber-400 block mb-0.5">आज (Today)</label>
                        <input
                          type="text"
                          maxLength={2}
                          value={m.todayResult}
                          onChange={(e) => handleMarketChange(idx, 'todayResult', e.target.value)}
                          className="w-full bg-slate-950 border border-amber-500/70 text-amber-300 font-bold rounded px-2 py-1 text-sm font-mono text-center"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] text-slate-400 block mb-0.5">समय (Open Time)</label>
                        <input
                          type="text"
                          value={m.openTime}
                          onChange={(e) => handleMarketChange(idx, 'openTime', e.target.value)}
                          className="w-full bg-slate-950 border border-slate-700 text-slate-300 rounded px-2 py-1 text-xs text-center"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] text-slate-400 block mb-0.5">स्थिति (Status)</label>
                        <select
                          value={m.status}
                          onChange={(e) => handleMarketChange(idx, 'status', e.target.value as 'declared' | 'waiting')}
                          className="w-full bg-slate-950 border border-slate-700 text-slate-300 rounded px-2 py-1 text-xs"
                        >
                          <option value="declared">घोषित (Declared)</option>
                          <option value="waiting">इंतजार (Waiting)</option>
                        </select>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SubTab: Leak & Haruf */}
          {activeSubTab === 'leak' && (
            <div className="space-y-4">
              <div>
                <label className="text-xs text-slate-300 font-bold block mb-1">दिनांक (Date String)</label>
                <input
                  type="text"
                  value={editedLeak.date}
                  onChange={(e) => setEditedLeak({ ...editedLeak, date: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 text-slate-200 rounded-lg p-2 text-xs"
                />
              </div>

              <div>
                <label className="text-xs text-amber-400 font-bold block mb-1">सिंगल जोड़ी (कॉमा लगाकर लिखें, जैसे: 42, 97)</label>
                <input
                  type="text"
                  value={editedLeak.singleJodi.join(', ')}
                  onChange={(e) =>
                    setEditedLeak({
                      ...editedLeak,
                      singleJodi: e.target.value.split(',').map((s) => s.trim()).filter(Boolean)
                    })
                  }
                  className="w-full bg-slate-900 border border-amber-500/70 text-amber-300 font-mono font-bold rounded-lg p-2 text-sm"
                />
              </div>

              <div>
                <label className="text-xs text-blue-300 font-bold block mb-1">सपोर्ट जोड़ी (कॉमा लगाकर लिखें, जैसे: 18, 63, 75, 80)</label>
                <input
                  type="text"
                  value={editedLeak.supportJodi.join(', ')}
                  onChange={(e) =>
                    setEditedLeak({
                      ...editedLeak,
                      supportJodi: e.target.value.split(',').map((s) => s.trim()).filter(Boolean)
                    })
                  }
                  className="w-full bg-slate-900 border border-blue-500/70 text-blue-200 font-mono font-bold rounded-lg p-2 text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-slate-300 font-bold block mb-1">अंदर हरूफ (Ander Haruf)</label>
                  <input
                    type="text"
                    value={editedLeak.harufAnder}
                    onChange={(e) => setEditedLeak({ ...editedLeak, harufAnder: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 text-slate-200 rounded-lg p-2 text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-300 font-bold block mb-1">बाहर हरूफ (Bahar Haruf)</label>
                  <input
                    type="text"
                    value={editedLeak.harufBahar}
                    onChange={(e) => setEditedLeak({ ...editedLeak, harufBahar: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 text-slate-200 rounded-lg p-2 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-300 font-bold block mb-1">सूचना / नोटिस (Notice Text)</label>
                <textarea
                  rows={2}
                  value={editedLeak.noticeHindi}
                  onChange={(e) => setEditedLeak({ ...editedLeak, noticeHindi: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 text-slate-200 rounded-lg p-2 text-xs"
                />
              </div>
            </div>
          )}

          {/* SubTab: Site Settings */}
          {activeSubTab === 'settings' && (
            <div className="space-y-4">
              <div>
                <label className="text-xs text-slate-300 font-bold block mb-1">वेबसाइट का मुख्य नाम (Site Title)</label>
                <input
                  type="text"
                  value={editedConfig.siteTitle}
                  onChange={(e) => setEditedConfig({ ...editedConfig, siteTitle: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 text-slate-200 rounded-lg p-2 text-xs sm:text-sm font-bold"
                />
              </div>

              <div>
                <label className="text-xs text-slate-300 font-bold block mb-1">टैगलाइन (Tagline / Slogan)</label>
                <input
                  type="text"
                  value={editedConfig.tagline}
                  onChange={(e) => setEditedConfig({ ...editedConfig, tagline: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 text-slate-200 rounded-lg p-2 text-xs"
                />
              </div>

              <div>
                <label className="text-xs text-amber-300 font-bold block mb-1">ऊपर चलने वाला लाइव नोटिस (Marquee Notice)</label>
                <input
                  type="text"
                  value={editedConfig.helplineNotice}
                  onChange={(e) => setEditedConfig({ ...editedConfig, helplineNotice: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 text-slate-200 rounded-lg p-2 text-xs"
                />
              </div>

              <div>
                <label className="text-xs text-slate-300 font-bold block mb-1">वैधानिक चेतावनी / अस्वीकरण (Disclaimer)</label>
                <textarea
                  rows={3}
                  value={editedConfig.disclaimerText}
                  onChange={(e) => setEditedConfig({ ...editedConfig, disclaimerText: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 text-slate-200 rounded-lg p-2 text-xs"
                />
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-900 border-t border-slate-800 p-4 flex items-center justify-between gap-3">
          <button
            onClick={onResetDefaults}
            className="flex items-center gap-1.5 text-xs text-red-400 hover:text-red-300 font-medium px-3 py-1.5 rounded hover:bg-slate-800 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>डिफ़ॉल्ट रीसेट करें (Reset)</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs px-4 py-2 rounded-lg transition-colors"
            >
              रद्द करें (Cancel)
            </button>
            <button
              onClick={handleSaveAll}
              className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs px-5 py-2 rounded-lg transition-all shadow-md shadow-emerald-900/30"
            >
              <Save className="w-4 h-4" />
              <span>सेव करें (Save Changes)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
