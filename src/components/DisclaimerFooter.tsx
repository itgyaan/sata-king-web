import React from 'react';
import { ShieldAlert, Info, Globe, Heart } from 'lucide-react';
import { SiteConfig } from '../types';

interface DisclaimerFooterProps {
  config: SiteConfig;
  lang: 'hi' | 'en';
}

export const DisclaimerFooter: React.FC<DisclaimerFooterProps> = ({ config, lang }) => {
  return (
    <footer className="mt-14 border-t border-slate-800/80 bg-[#060a12] pt-10 pb-8 text-slate-400">
      <div className="max-w-7xl mx-auto px-4">
        {/* Warning Box */}
        <div className="bg-amber-950/30 border border-amber-500/40 rounded-xl p-4 sm:p-5 mb-8">
          <div className="flex items-start gap-3">
            <ShieldAlert className="w-6 h-6 text-amber-400 shrink-0 mt-0.5" />
            <div className="space-y-1.5 text-xs sm:text-sm">
              <h4 className="font-bold text-amber-400 text-sm sm:text-base">
                {lang === 'hi' ? 'वैधानिक चेतावनी एवं अस्वीकरण (Legal Notice & Disclaimer)' : 'Statutory Notice & Disclaimer'}
              </h4>
              <p className="text-slate-300 leading-relaxed">
                {config.disclaimerText}
              </p>
              <p className="text-[11px] text-slate-400">
                {lang === 'hi'
                  ? 'यह वेबसाइट 100% शुद्ध स्टैटिक HTML और CSS संरचना पर आधारित है। इसे किसी भी शेयर्ड होस्टिंग अथवा लोकल सर्वर पर सुरक्षित रूप से होस्ट किया जा सकता है।'
                  : 'This website is built with lightweight static HTML and CSS, fully compatible with local environments and shared web hosting.'}
              </p>
            </div>
          </div>
        </div>

        {/* Footer Bottom Line */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs border-t border-slate-800/60 pt-6">
          <div className="text-center sm:text-left">
            <p className="font-bold text-slate-300">{config.siteTitle} © {new Date().getFullYear()}</p>
            <p className="text-slate-400 mt-0.5">
              {lang === 'hi' ? 'भारत का नंबर 1 सुपर फास्ट लाइव रिजल्ट पोर्टल' : "India's Leading Live Results & Record Portal"}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-slate-400">
            <span className="hover:text-amber-400 transition-colors cursor-pointer">
              {lang === 'hi' ? 'गोपनीयता नीति (Privacy)' : 'Privacy Policy'}
            </span>
            <span>•</span>
            <span className="hover:text-amber-400 transition-colors cursor-pointer">
              {lang === 'hi' ? 'नियम व शर्तें (Terms)' : 'Terms of Use'}
            </span>
            <span>•</span>
            <span className="hover:text-amber-400 transition-colors cursor-pointer">
              {lang === 'hi' ? 'अस्वीकरण (Disclaimer)' : 'Disclaimer'}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
