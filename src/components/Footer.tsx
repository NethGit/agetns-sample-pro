import React from 'react';
import { Activity, Lock, RefreshCw, Layers } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-20 bg-[#0a0e19] border-t border-[#2a2e39] py-10 px-4 md:px-8 text-xs text-[#787b86]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left Brand & Disclaimer */}
        <div className="flex flex-col gap-2 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 text-white font-bold text-sm">
            <svg width="24" height="18" viewBox="0 0 36 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14 22H7V11H0V4H14V22Z" fill="#2962ff" />
              <path d="M18 22H25V11H32V4H18V22Z" fill="#2962ff" />
            </svg>
            <span>Market Terminal</span>
          </div>
          <p className="max-w-xl text-[#787b86]">
            Market data provided for informational and educational purposes. Real-time updates powered by high-frequency streaming architecture.
          </p>
        </div>

        {/* Center Links */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-[#d1d4dc]">
          <a href="#" className="hover:text-[#2962ff] transition-colors">Products</a>
          <a href="#" className="hover:text-[#2962ff] transition-colors">Screeners</a>
          <a href="#" className="hover:text-[#2962ff] transition-colors">Economic Calendar</a>
          <a href="#" className="hover:text-[#2962ff] transition-colors">Broker Directory</a>
          <a href="#" className="hover:text-[#2962ff] transition-colors">API Docs</a>
        </div>

        {/* Right Status Indicator */}
        <div className="flex items-center gap-2 bg-[#171b26] border border-[#2a2e39] px-3 py-1.5 rounded-full font-mono text-[11px] text-[#d1d4dc]">
          <span className="w-2 h-2 rounded-full bg-[#089981] animate-pulse"></span>
          <span>System Nominal (Latency: 14ms)</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-8 pt-4 border-t border-[#1f2330] text-center text-[#525666] text-[11px]">
        © 2026 Market Terminal Inc. All rights reserved. Registered Trademarks belong to their respective owners.
      </div>
    </footer>
  );
};
