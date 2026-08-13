import React, { useState, useEffect, useRef } from 'react';
import { Search, X, TrendingUp, TrendingDown, ArrowRight } from 'lucide-react';
import { Asset } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  assets: Asset[];
  onSelectAsset: (asset: Asset) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  assets,
  onSelectAsset,
}) => {
  const [query, setQuery] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('All');
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const categories = ['All', 'US stocks', 'Crypto', 'Futures', 'Forex', 'ETFs'];

  const filteredAssets = assets.filter((asset) => {
    const matchesQuery =
      asset.symbol.toLowerCase().includes(query.toLowerCase()) ||
      asset.name.toLowerCase().includes(query.toLowerCase()) ||
      asset.category.toLowerCase().includes(query.toLowerCase());

    const matchesCategory =
      selectedCategoryFilter === 'All' || asset.category === selectedCategoryFilter;

    return matchesQuery && matchesCategory;
  });

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredAssets.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredAssets.length) % Math.max(1, filteredAssets.length));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredAssets[selectedIndex]) {
        onSelectAsset(filteredAssets[selectedIndex]);
        onClose();
      }
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-[#0f131e] border border-[#2a2e39] w-full max-w-2xl rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh] animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        {/* Search Input Bar */}
        <div className="p-4 border-b border-[#2a2e39] bg-[#0a0e19] flex items-center gap-3">
          <Search className="w-5 h-5 text-[#2962ff] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Search symbol, index, stock or crypto (e.g. S&P 500, BTC, NVDA)..."
            className="w-full bg-transparent text-white text-base placeholder-[#787b86] focus:outline-none"
          />
          {query && (
            <button onClick={() => setQuery('')} className="text-[#787b86] hover:text-white p-1">
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="px-1.5 py-0.5 text-[10px] font-mono text-[#787b86] bg-[#171b26] border border-[#2a2e39] rounded">
            ESC
          </kbd>
        </div>

        {/* Category Filters */}
        <div className="p-2 border-b border-[#2a2e39] bg-[#171b26] flex items-center gap-1.5 overflow-x-auto tv-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategoryFilter(cat);
                setSelectedIndex(0);
              }}
              className={`px-3 py-1 text-xs font-medium rounded-full whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategoryFilter === cat
                  ? 'bg-[#2962ff] text-white font-semibold'
                  : 'text-[#787b86] hover:text-white hover:bg-[#2a2e39]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="overflow-y-auto tv-scrollbar p-2 space-y-1 divide-y divide-[#2a2e39]/50">
          {filteredAssets.length > 0 ? (
            filteredAssets.map((asset, index) => {
              const isSelected = index === selectedIndex;
              const isPositive = asset.change >= 0;

              return (
                <div
                  key={asset.id}
                  onClick={() => {
                    onSelectAsset(asset);
                    onClose();
                  }}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`p-3 rounded-lg flex items-center justify-between gap-4 cursor-pointer transition-colors ${
                    isSelected ? 'bg-[#1e222d] border border-[#2962ff]/50' : 'hover:bg-[#171b26]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 rounded-full ${asset.badgeBgColor} flex items-center justify-center text-white font-bold text-xs uppercase shrink-0`}
                    >
                      {asset.badgeText}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-sm">{asset.symbol}</span>
                        <span className="text-[10px] px-1.5 py-0.2 bg-[#0a0e19] text-[#787b86] rounded uppercase font-mono">
                          {asset.category}
                        </span>
                      </div>
                      <p className="text-xs text-[#787b86] truncate max-w-xs sm:max-w-md">{asset.name}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-sm font-mono font-bold text-white">
                      ${asset.price < 10 ? asset.price.toFixed(4) : asset.price.toLocaleString()}
                    </div>
                    <div
                      className={`text-xs font-mono font-semibold flex items-center justify-end gap-1 ${
                        isPositive ? 'text-[#089981]' : 'text-[#f23645]'
                      }`}
                    >
                      {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                      <span>
                        {isPositive ? '+' : ''}
                        {asset.changePercent.toFixed(2)}%
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="py-12 text-center text-[#787b86] text-sm">
              No matching assets found for "<span className="text-white">{query}</span>"
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
