import React, { useState } from 'react';
import { ChevronDown, Globe2, Activity, ShieldCheck, Zap } from 'lucide-react';

interface HeroSectionProps {
  selectedRegion: string;
  onSelectRegion: (region: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ selectedRegion, onSelectRegion }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const regions = [
    { name: 'Global Markets', desc: 'Worldwide indices, commodities & currencies' },
    { name: 'Americas', desc: 'US, Canada, Mexico & Latin America' },
    { name: 'Europe', desc: 'UK, Germany, France & European Union' },
    { name: 'Asia-Pacific', desc: 'Japan, China, Hong Kong & Australia' },
  ];

  return (
    <section className="pt-10 pb-8 text-center px-4 relative">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        {/* Market Status Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#171b26] border border-[#2a2e39] rounded-full text-xs text-[#d1d4dc] mb-6 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-[#089981] animate-pulse"></span>
          <span className="font-semibold text-white">Market Open:</span>
          <span className="text-[#787b86]">NY & London Trading Hours</span>
          <span className="text-[#2a2e39]">|</span>
          <span className="text-[#2962ff] font-medium flex items-center gap-1">
            <Zap className="w-3 h-3" /> Real-time Feed
          </span>
        </div>

        {/* Hero Title with Interactive Dropdown */}
        <div className="relative inline-block">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="group flex items-center justify-center gap-3 text-4xl sm:text-5xl font-bold text-white tracking-tight hover:text-white/90 transition-all cursor-pointer select-none"
          >
            <span>Markets, everywhere</span>
            <ChevronDown className={`w-8 h-8 text-white transition-transform duration-200 ${showDropdown ? 'rotate-180' : ''}`} />
          </button>

          {/* Region Dropdown */}
          {showDropdown && (
            <div className="absolute left-1/2 -translate-x-1/2 mt-3 w-80 bg-[#1e222d] border border-[#2a2e39] rounded-lg shadow-2xl p-2 z-40 text-left">
              <div className="px-3 py-1.5 text-[11px] font-mono text-[#787b86] uppercase tracking-wider border-b border-[#2a2e39] mb-1">
                Select Market Scope
              </div>
              {regions.map((reg) => (
                <button
                  key={reg.name}
                  onClick={() => {
                    onSelectRegion(reg.name);
                    setShowDropdown(false);
                  }}
                  className={`w-full text-left p-2.5 rounded transition-all cursor-pointer flex flex-col gap-0.5 ${
                    selectedRegion === reg.name
                      ? 'bg-[#2962ff]/20 border border-[#2962ff]/50 text-white'
                      : 'hover:bg-[#2a2e39] text-[#d1d4dc]'
                  }`}
                >
                  <span className="text-sm font-semibold flex items-center justify-between">
                    {reg.name}
                    {selectedRegion === reg.name && <span className="text-[#2962ff] text-xs font-bold">Active</span>}
                  </span>
                  <span className="text-xs text-[#787b86]">{reg.desc}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <p className="mt-3 text-sm text-[#787b86] max-w-lg">
          Track global stocks, crypto, commodities, forex, and bonds with live interactive charts and institutional-grade analytics.
        </p>
      </div>
    </section>
  );
};
