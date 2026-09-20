import React, { useState } from 'react';
import { X, Download, Copy, Check, FileCode, Server, CheckCircle2, HelpCircle, Code } from 'lucide-react';
import { MarketItem, LeakInfo, DayRecord, SiteConfig } from '../types';
import { generatePureHtml, generatePureCss, downloadFile } from '../utils/exportHtml';

interface ExportHostingModalProps {
  isOpen: boolean;
  onClose: () => void;
  markets: MarketItem[];
  leakInfo: LeakInfo;
  records: DayRecord[];
  config: SiteConfig;
  lang: 'hi' | 'en';
}

export const ExportHostingModal: React.FC<ExportHostingModalProps> = ({
  isOpen,
  onClose,
  markets,
  leakInfo,
  records,
  config,
  lang
}) => {
  const [activeTab, setActiveTab] = useState<'instructions' | 'html' | 'css'>('instructions');
  const [copiedHtml, setCopiedHtml] = useState(false);
  const [copiedCss, setCopiedCss] = useState(false);

  if (!isOpen) return null;

  const htmlCode = generatePureHtml(markets, leakInfo, records, config);
  const cssCode = generatePureCss();

  const handleDownloadHtml = () => {
    downloadFile('index.html', htmlCode, 'text/html');
  };

  const handleDownloadCss = () => {
    downloadFile('style.css', cssCode, 'text/css');
  };

  const handleDownloadSingleFile = () => {
    // Single file with embedded CSS - ready to drop anywhere
    downloadFile('index_standalone.html', htmlCode, 'text/html');
  };

  const handleCopyHtml = () => {
    navigator.clipboard.writeText(htmlCode);
    setCopiedHtml(true);
    setTimeout(() => setCopiedHtml(false), 2000);
  };

  const handleCopyCss = () => {
    navigator.clipboard.writeText(cssCode);
    setCopiedCss(true);
    setTimeout(() => setCopiedCss(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-[#0f172a] border-2 border-amber-500/70 rounded-2xl w-full max-w-4xl shadow-2xl overflow-hidden my-6 flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-amber-600/20 via-slate-900 to-amber-600/20 border-b border-amber-500/40 p-4 sm:p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-amber-500/20 p-2 rounded-xl text-amber-400">
              <Server className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-white font-['Rajdhani',sans-serif]">
                {lang === 'hi' ? 'शेयर्ड होस्टिंग एवं लोकल HTML/CSS एक्सपोर्टर' : 'Shared Hosting & Local HTML/CSS Exporter'}
              </h2>
              <p className="text-xs text-amber-300">
                {lang === 'hi' ? 'cPanel, Hostinger, GoDaddy या अपने कंप्यूटर पर चलाने के लिए तैयार फाइलें' : 'Ready-to-upload static files for cPanel, Shared Hosting, or Local Apache'}
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

        {/* Action Download Buttons Bar */}
        <div className="bg-[#0b101b] border-b border-slate-800 p-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-300">
              {lang === 'hi' ? '⚡ एक क्लिक डाउनलोड:' : '⚡ 1-Click Downloads:'}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleDownloadHtml}
              className="flex items-center gap-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs px-3.5 py-2 rounded-lg transition-all shadow-md"
            >
              <Download className="w-4 h-4" />
              <span>index.html डाउनलोड</span>
            </button>

            <button
              onClick={handleDownloadCss}
              className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs px-3.5 py-2 rounded-lg transition-all shadow-md"
            >
              <Download className="w-4 h-4" />
              <span>style.css डाउनलोड</span>
            </button>

            <button
              onClick={handleDownloadSingleFile}
              className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs px-3.5 py-2 rounded-lg transition-all shadow-md"
              title="Only 1 file needed! Works by just double clicking."
            >
              <Download className="w-4 h-4" />
              <span>Single-File (HTML+CSS संयुक्त)</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-800 bg-slate-900/60 px-4 text-xs font-bold">
          <button
            onClick={() => setActiveTab('instructions')}
            className={`py-3 px-4 border-b-2 flex items-center gap-1.5 transition-colors ${
              activeTab === 'instructions'
                ? 'border-amber-500 text-amber-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>{lang === 'hi' ? 'शेयर्ड होस्टिंग पर कैसे चलाएं (आसान गाइड)' : 'How to Run on Shared Hosting'}</span>
          </button>

          <button
            onClick={() => setActiveTab('html')}
            className={`py-3 px-4 border-b-2 flex items-center gap-1.5 transition-colors ${
              activeTab === 'html'
                ? 'border-amber-500 text-amber-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileCode className="w-4 h-4" />
            <span>index.html कोड देखें</span>
          </button>

          <button
            onClick={() => setActiveTab('css')}
            className={`py-3 px-4 border-b-2 flex items-center gap-1.5 transition-colors ${
              activeTab === 'css'
                ? 'border-amber-500 text-amber-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Code className="w-4 h-4" />
            <span>style.css कोड देखें</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-5 overflow-y-auto flex-1 space-y-4">
          {activeTab === 'instructions' && (
            <div className="space-y-4 text-slate-300 text-sm">
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4">
                <h4 className="font-bold text-amber-400 text-base mb-1 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-amber-400" />
                  <span>100% शुद्ध HTML और CSS — किसी सर्वर/नोड की आवश्यकता नहीं!</span>
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  यह वेबसाइट पूरी तरह से सामान्य (Static) HTML और CSS पर आधारित है। इसे आप सीधे किसी भी शेयर्ड होस्टिंग (Shared Hosting जैसे cPanel, Hostinger, GoDaddy, Bluehost, Namecheap) या लोकल कंप्यूटर (Local PC / XAMPP) पर बिना किसी सेटअप के चला सकते हैं।
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Method 1: Shared Hosting */}
                <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4">
                  <div className="text-amber-400 font-bold text-sm uppercase tracking-wider mb-2 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center text-xs font-black">1</span>
                    <span>शेयर्ड होस्टिंग (cPanel / Hostinger / GoDaddy):</span>
                  </div>
                  <ol className="list-decimal list-inside space-y-2 text-xs text-slate-300">
                    <li>ऊपर दिए गए बटन से <strong>index.html</strong> और <strong>style.css</strong> डाउनलोड करें।</li>
                    <li>अपने होस्टिंग खाते के <strong>cPanel</strong> में लॉगिन करें।</li>
                    <li><strong>File Manager</strong> खोलें और <strong>public_html</strong> फोल्डर में जाएं।</li>
                    <li>दोनों फाइलों (index.html, style.css) को अपलोड (Upload) कर दें।</li>
                    <li>बस! आपका डोमेन (जैसे <code>yourdomain.com</code>) खोलें, साइट तुरंत चालू हो जाएगी!</li>
                  </ol>
                </div>

                {/* Method 2: Local Computer */}
                <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4">
                  <div className="text-blue-400 font-bold text-sm uppercase tracking-wider mb-2 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-xs font-black">2</span>
                    <span>लोकल कंप्यूटर (Local Laptop / PC) पर चलाना:</span>
                  </div>
                  <ol className="list-decimal list-inside space-y-2 text-xs text-slate-300">
                    <li>ऊपर दिए गए <strong>Single-File (HTML+CSS)</strong> या index.html को डाउनलोड करें।</li>
                    <li>डाउनलोड की गई फाइल पर सीधे <strong>डबल क्लिक (Double Click)</strong> करें।</li>
                    <li>यह आपके क्रोम या किसी भी ब्राउज़र में ऑफलाइन/लोकल तुरंत खुल जाएगी।</li>
                    <li>XAMPP या WAMP के <code>htdocs</code> या <code>www</code> फोल्डर में डालकर भी चला सकते हैं।</li>
                  </ol>
                </div>
              </div>

              {/* Maintenance tip */}
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-xs">
                <h5 className="font-bold text-slate-200 mb-1">💡 रिजल्ट कैसे अपडेट करें?</h5>
                <p className="text-slate-400">
                  आप इसी वेब ऐप में ऊपर <strong>"रिजल्ट एडिट (Admin)"</strong> बटन दबाकर किसी भी बाज़ार का नंबर या लीक जोड़ी बदल सकते हैं। बदलने के बाद दोबारा <strong>"index.html डाउनलोड"</strong> दबाएं और अपनी होस्टिंग पर पुरानी फाइल को रिप्लेस (Overwrite) कर दें। या सीधे नोटपैड (Notepad) में खोलकर नंबर बदल सकते हैं!
                </p>
              </div>
            </div>
          )}

          {activeTab === 'html' && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400 pb-1">
                <span>pure semantic HTML5 with SEO meta tags & mobile responsive container</span>
                <button
                  onClick={handleCopyHtml}
                  className="flex items-center gap-1 text-amber-400 hover:text-amber-300 font-bold bg-slate-800 px-3 py-1 rounded"
                >
                  {copiedHtml ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedHtml ? 'कॉपी हो गया!' : 'HTML कोड कॉपी करें'}</span>
                </button>
              </div>
              <pre className="bg-[#070b14] border border-slate-800 rounded-xl p-4 text-xs font-mono text-emerald-300 overflow-x-auto max-h-96 select-all">
                {htmlCode}
              </pre>
            </div>
          )}

          {activeTab === 'css' && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400 pb-1">
                <span>Standalone pure CSS (style.css) with zero external dependencies</span>
                <button
                  onClick={handleCopyCss}
                  className="flex items-center gap-1 text-amber-400 hover:text-amber-300 font-bold bg-slate-800 px-3 py-1 rounded"
                >
                  {copiedCss ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCss ? 'कॉपी हो गया!' : 'CSS कोड कॉपी करें'}</span>
                </button>
              </div>
              <pre className="bg-[#070b14] border border-slate-800 rounded-xl p-4 text-xs font-mono text-blue-300 overflow-x-auto max-h-96 select-all">
                {cssCode}
              </pre>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-slate-900 border-t border-slate-800 p-4 flex items-center justify-end">
          <button
            onClick={onClose}
            className="bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs px-4 py-2 rounded-lg transition-colors"
          >
            {lang === 'hi' ? 'बंद करें (Close)' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
