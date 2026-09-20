import React, { useState, useEffect } from 'react';
import { Sparkles, Download, Settings, RefreshCw, Volume2, VolumeX, ShieldAlert, Globe } from 'lucide-react';
import { SiteConfig } from '../types';

interface HeaderProps {
  config: SiteConfig;
  onOpenAdmin: () => void;
  onOpenExport: () => void;
  onRefresh: () => void;
  isRefreshing: boolean;
  lang: 'hi' | 'en';
  onToggleLang: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  config,
  onOpenAdmin,
  onOpenExport,
  onRefresh,
  isRefreshing,
  lang,
  onToggleLang
}) => {
  const [currentTime, setCurrentTime] = useState<string>('');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true
        })
      );
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const playNotificationChime = () => {
    if (!soundEnabled) return;
    try {
      const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.15); // A5
      gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.3);
    } catch {
      // AudioContext fallback
    }
  };

  const handleRefreshClick = () => {
    playNotificationChime();
    onRefresh();
  };

  return (
    <header className="w-full bg-[#070b14] border-b border-slate-800 sticky top-0 z-40 shadow-xl">
      {/* Top Ticker Bar */}
      <div className="bg-gradient-to-r from-amber-950 via-slate-900 to-amber-950 border-b border-amber-600/30 px-3 py-1.5 text-xs text-amber-300 font-medium">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 overflow-hidden whitespace-nowrap">
            <span className="bg-red-600 text-white font-black px-2 py-0.5 rounded text-[11px] uppercase tracking-wider animate-pulse inline-flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
              {lang === 'hi' ? 'लाइव अपडेट' : 'LIVE'}
            </span>
            <span className="truncate text-amber-200">
              {config.helplineNotice}
            </span>
          </div>

          <div className="flex items-center gap-3 shrink-0 text-slate-300">
            <span className="font-mono bg-slate-900/80 px-2 py-0.5 rounded border border-slate-700 text-amber-400">
              ⏱ {currentTime || 'Loading...'}
            </span>
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              title={soundEnabled ? 'Mute Chime' : 'Enable Chime'}
              className="hover:text-amber-400 transition-colors p-1"
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
            </button>
            <button
              onClick={onToggleLang}
              className="flex items-center gap-1 bg-slate-800 hover:bg-slate-700 px-2 py-0.5 rounded border border-slate-600 text-xs text-slate-200 transition-colors"
            >
              <Globe className="w-3.5 h-3.5 text-amber-400" />
              <span>{lang === 'hi' ? 'EN' : 'हिन्दी'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Header Container */}
      <div className="max-w-7xl mx-auto px-4 py-4 sm:py-5 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Brand & Titles */}
        <div className="text-center md:text-left">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500/20 via-amber-400/10 to-transparent border-l-4 border-amber-500 px-3 py-1 mb-1.5 rounded-r">
            <Sparkles className="w-4 h-4 text-amber-400 animate-spin" />
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
              {lang === 'hi' ? 'सुपर फास्ट लाइव रिजल्ट' : 'SUPER FAST LIVE RESULT'}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-500 drop-shadow-sm font-['Rajdhani',sans-serif]">
            {config.siteTitle}
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5 font-medium">
            {config.tagline}
          </p>
        </div>

        {/* Quick Actions Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2.5">
          <button
            id="refresh-results-btn"
            onClick={handleRefreshClick}
            disabled={isRefreshing}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all border shadow-sm ${
              isRefreshing
                ? 'bg-slate-800 text-slate-500 border-slate-700 cursor-not-allowed'
                : 'bg-emerald-600 hover:bg-emerald-500 text-white border-emerald-500 shadow-emerald-900/30'
            }`}
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>{isRefreshing ? (lang === 'hi' ? 'रिफ्रेश हो रहा है...' : 'Refreshing...') : (lang === 'hi' ? 'रिजल्ट रिफ्रेश' : 'Refresh')}</span>
          </button>

          <button
            id="open-admin-btn"
            onClick={onOpenAdmin}
            className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-700 hover:border-amber-500/50 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all shadow-sm"
          >
            <Settings className="w-4 h-4 text-amber-400" />
            <span>{lang === 'hi' ? 'रिजल्ट एडिट (Admin)' : 'Update Result'}</span>
          </button>

          <button
            id="export-hosting-btn"
            onClick={onOpenExport}
            className="flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-black transition-all shadow-md shadow-amber-500/20"
          >
            <Download className="w-4 h-4" />
            <span>{lang === 'hi' ? 'शेयर्ड होस्टिंग कोड (HTML+CSS)' : 'Download HTML/CSS'}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
