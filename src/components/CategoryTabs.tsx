import React from 'react';
import { ChevronRight } from 'lucide-react';
import { MarketCategory } from '../types';

interface CategoryTabsProps {
  selectedCategory: MarketCategory;
  onSelectCategory: (category: MarketCategory) => void;
}

const CATEGORIES: MarketCategory[] = [
  'US stocks',
  'World stocks',
  'Crypto',
  'Futures',
  'Forex',
  'Government bonds',
  'Corporate bonds',
  'ETFs',
  'Economy',
];

export const CategoryTabs: React.FC<CategoryTabsProps> = ({ selectedCategory, onSelectCategory }) => {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
      {/* Category Section Header */}
      <h2
        onClick={() => {
          // Cycle to next category for fun or keep as title
          const idx = CATEGORIES.indexOf(selectedCategory);
          onSelectCategory(CATEGORIES[(idx + 1) % CATEGORIES.length]);
        }}
        className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-1.5 cursor-pointer hover:text-[#2962ff] transition-colors group select-none shrink-0"
      >
        <span>{selectedCategory === 'US stocks' ? 'Indices' : selectedCategory}</span>
        <ChevronRight className="w-6 h-6 mt-1 text-[#787b86] group-hover:text-[#2962ff] group-hover:translate-x-1 transition-all" />
      </h2>

      {/* Pill Tabs Container */}
      <div className="flex overflow-x-auto tv-scrollbar pb-2 md:pb-0 border border-[#2a2e39] rounded-full p-1 bg-[#0a0e19] w-full md:w-auto max-w-full">
        {CATEGORIES.map((category) => {
          const isSelected = selectedCategory === category;
          return (
            <button
              key={category}
              onClick={() => onSelectCategory(category)}
              className={`whitespace-nowrap px-4 py-1.5 text-xs sm:text-sm font-medium rounded-full transition-all cursor-pointer ${
                isSelected
                  ? 'bg-[#313441] text-white shadow-sm font-semibold'
                  : 'text-[#d1d4dc] hover:text-white hover:bg-[#171b26]'
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>
    </div>
  );
};
