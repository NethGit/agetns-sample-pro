import React, { useState } from 'react';
import { Search, Globe, User, ChevronDown, TrendingUp, Sparkles, SlidersHorizontal, Bell } from 'lucide-react';
import { Asset } from '../types';

interface HeaderProps {
  onSearchClick: () => void;
  watchlistCount: number;
  onOpenWatchlist: () => void;
  tickerAssets: Asset[];
  onSelectAsset: (asset: Asset) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onSearchClick,
  watchlistCount,
  onOpenWatchlist,
  tickerAssets,
  onSelectAsset,
}) => {
  const [currentLang, setCurrentLang] = useState('EN');
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const [activeNav, setActiveNav] = useState('Markets');

  const languages = [
    { code: 'EN', name: 'English' },
    { code: 'ES', name: 'Español' },
    { code: 'DE', name: 'Deutsch' },
    { code: 'FR', name: 'Français' },
    { code: 'JP', name: '日本語' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#0f131e] border-b border-[#2a2e39]">
      {/* Top Ticker Tape Bar */}
      <div className="bg-[#0a0e19] border-b border-[#1f2330] py-1.5 px-4 overflow-hidden whitespace-nowrap text-xs font-mono select-none">
        <div className="inline-flex items-center gap-6 animate-ticker">
          {tickerAssets.map((a) => {
            const isPos = a.change >= 0;
            return (
              <button
                key={a.id}
                onClick={() => onSelectAsset(a)}
                className="inline-flex items-center gap-2 hover:opacity-80 transition-opacity cursor-pointer group"
              >
                <span className="font-semibold text-[#d1d4dc] group-hover:text-[#2962ff] transition-colors">
                  {a.symbol}
                </span>
                <span className="text-[#a0a4b8]">
                  {a.price < 10 ? a.price.toFixed(4) : a.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
                <span className={`inline-flex items-center ${isPos ? 'text-[#089981]' : 'text-[#f23645]'}`}>
                  {isPos ? '+' : ''}
                  {a.changePercent.toFixed(2)}%
                </span>
                <span className="text-[#2a2e39] ml-2">|</span>
              </button>
            );
          })}
          {/* Duplicate for smooth infinite scroll effect */}
          {tickerAssets.map((a) => {
            const isPos = a.change >= 0;
            return (
              <button
                key={`dup-${a.id}`}
                onClick={() => onSelectAsset(a)}
                className="inline-flex items-center gap-2 hover:opacity-80 transition-opacity cursor-pointer group"
              >
                <span className="font-semibold text-[#d1d4dc] group-hover:text-[#2962ff] transition-colors">
                  {a.symbol}
                </span>
                <span className="text-[#a0a4b8]">
                  {a.price < 10 ? a.price.toFixed(4) : a.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
                <span className={`inline-flex items-center ${isPos ? 'text-[#089981]' : 'text-[#f23645]'}`}>
                  {isPos ? '+' : ''}
                  {a.changePercent.toFixed(2)}%
                </span>
                <span className="text-[#2a2e39] ml-2">|</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Header */}
      <div className="h-16 px-4 md:px-6 flex items-center justify-between gap-4">
        {/* Left Side: Logo & Search */}
        <div className="flex items-center gap-6">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 text-white hover:text-[#2962ff] transition-colors group">
            <svg width="36" height="28" viewBox="0 0 36 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14 22H7V11H0V4H14V22Z" fill="currentColor" />
              <path d="M18 22H25V11H32V4H18V22Z" fill="currentColor" />
            </svg>
          </a>

          {/* Search Trigger */}
          <div className="relative w-48 sm:w-64 md:w-72">
            <button
              onClick={onSearchClick}
              className="w-full flex items-center justify-between gap-2 px-3 py-1.5 bg-[#171b26] border border-[#2a2e39] rounded text-sm text-[#787b86] hover:text-[#d1d4dc] hover:border-[#363a45] transition-all group cursor-pointer"
            >
              <div className="flex items-center gap-2 overflow-hidden">
                <Search className="w-4 h-4 text-[#787b86] group-hover:text-[#d1d4dc] transition-colors shrink-0" />
                <span className="truncate">Search (Ctrl+K)</span>
              </div>
              <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono text-[#787b86] bg-[#0a0e19] border border-[#2a2e39] rounded">
                ⌘K
              </kbd>
            </button>
          </div>

          {/* Main Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {['Products', 'Community', 'Markets', 'Brokers', 'More'].map((item) => {
              const isActive = activeNav === item;
              return (
                <button
                  key={item}
                  onClick={() => setActiveNav(item)}
                  className={`px-3 py-1.5 text-sm font-medium rounded transition-colors cursor-pointer ${
                    isActive
                      ? 'text-[#2962ff] bg-[#2962ff]/10 font-semibold'
                      : 'text-[#d1d4dc] hover:bg-[#171b26] hover:text-white'
                  }`}
                >
                  {item}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {/* Watchlist Quick Button */}
          <button
            onClick={onOpenWatchlist}
            className="relative px-3 py-1.5 bg-[#171b26] hover:bg-[#2a2e39] border border-[#2a2e39] text-[#d1d4dc] rounded text-sm font-medium flex items-center gap-2 transition-colors cursor-pointer"
            title="Open Watchlist"
          >
            <TrendingUp className="w-4 h-4 text-[#2962ff]" />
            <span className="hidden sm:inline">Watchlist</span>
            {watchlistCount > 0 && (
              <span className="bg-[#2962ff] text-white text-[11px] font-bold px-1.5 py-0.2 rounded-full">
                {watchlistCount}
              </span>
            )}
          </button>

          {/* Language Picker */}
          <div className="relative">
            <button
              onClick={() => setShowLangDropdown(!showLangDropdown)}
              className="text-[#787b86] hover:text-[#d1d4dc] flex items-center gap-1 text-sm font-medium py-1.5 px-2 rounded hover:bg-[#171b26] transition-colors cursor-pointer"
            >
              <Globe className="w-4 h-4" />
              <span>{currentLang}</span>
            </button>

            {showLangDropdown && (
              <div className="absolute right-0 mt-2 w-36 bg-[#1e222d] border border-[#2a2e39] rounded shadow-xl py-1 z-50">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setCurrentLang(lang.code);
                      setShowLangDropdown(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between hover:bg-[#2a2e39] transition-colors ${
                      currentLang === lang.code ? 'text-[#2962ff] font-semibold' : 'text-[#d1d4dc]'
                    }`}
                  >
                    <span>{lang.name}</span>
                    <span className="text-[#787b86] text-[10px]">{lang.code}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* User Profile */}
          <button className="text-[#787b86] hover:text-[#d1d4dc] p-1.5 rounded hover:bg-[#171b26] transition-colors cursor-pointer">
            <User className="w-5 h-5" />
          </button>

          {/* Get Started Button */}
          <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-1.5 rounded text-sm font-medium transition-all shadow-md shadow-blue-900/20 active:scale-95 cursor-pointer">
            Get started
          </button>
        </div>
      </div>
    </header>
  );
};
