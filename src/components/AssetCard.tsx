import React from 'react';
import { Asset } from '../types';
import { Bookmark, TrendingUp, TrendingDown } from 'lucide-react';

interface AssetCardProps {
  asset: Asset;
  onClick: () => void;
  isWatchlisted: boolean;
  onToggleWatchlist: (e: React.MouseEvent) => void;
}

export const AssetCard: React.FC<AssetCardProps> = ({
  asset,
  onClick,
  isWatchlisted,
  onToggleWatchlist,
}) => {
  const isPositive = asset.change >= 0;

  // Generate SVG path for sparkline
  const generateSvgPath = (data: number[]) => {
    if (!data || data.length === 0) return { linePath: '', areaPath: '' };
    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;

    const points = data.map((val, idx) => {
      const x = (idx / (data.length - 1)) * 100;
      const y = 90 - ((val - min) / range) * 70; // Keep within 10-90 bounds
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    });

    const linePath = `M ${points.join(' L ')}`;
    const areaPath = `M 0,100 L ${points.join(' L ')} L 100,100 Z`;

    return { linePath, areaPath };
  };

  const { linePath, areaPath } = generateSvgPath(asset.sparklineData);

  return (
    <div
      onClick={onClick}
      className={`group relative bg-[#0a0e19] border border-[#2a2e39] rounded-lg p-4 hover:bg-[#171b26] transition-all cursor-pointer shadow-md hover:border-[#363a45] flex flex-col justify-between overflow-hidden`}
    >
      {/* Top Header Row */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          {/* Round badge matching TradingView style */}
          <div
            className={`w-10 h-10 rounded-full ${asset.badgeBgColor} flex items-center justify-center text-white font-bold text-xs sm:text-sm shadow-sm shrink-0 uppercase tracking-tighter`}
          >
            {asset.badgeText}
          </div>
          <div>
            <h3 className="text-base font-semibold text-white group-hover:text-[#2962ff] transition-colors leading-tight">
              {asset.symbol}
            </h3>
            <p className="text-xs text-[#787b86] line-clamp-1">{asset.name}</p>
          </div>
        </div>

        {/* Watchlist Bookmark Icon */}
        <button
          onClick={onToggleWatchlist}
          className={`p-1.5 rounded-full hover:bg-[#2a2e39] transition-colors cursor-pointer ${
            isWatchlisted ? 'text-[#2962ff]' : 'text-[#787b86] opacity-0 group-hover:opacity-100'
          }`}
          title={isWatchlisted ? 'Remove from Watchlist' : 'Add to Watchlist'}
        >
          <Bookmark className={`w-4 h-4 ${isWatchlisted ? 'fill-[#2962ff]' : ''}`} />
        </button>
      </div>

      {/* Middle Price Row */}
      <div className="mt-4 flex items-baseline justify-between">
        <div>
          <span className="text-xl sm:text-2xl font-bold font-mono text-white tracking-tight">
            {asset.price < 10
              ? asset.price.toFixed(4)
              : asset.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
          <span className="ml-1 text-xs text-[#787b86] font-mono">{asset.currency}</span>
        </div>

        <div
          className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded font-mono ${
            isPositive ? 'text-[#089981] bg-[#089981]/10' : 'text-[#f23645] bg-[#f23645]/10'
          }`}
        >
          {isPositive ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
          <span>
            {isPositive ? '+' : ''}
            {asset.change.toFixed(2)} ({isPositive ? '+' : ''}
            {asset.changePercent.toFixed(2)}%)
          </span>
        </div>
      </div>

      {/* Bottom Sparkline Graph */}
      <div className="h-14 mt-3 relative flex items-end">
        <svg className="w-full h-full absolute inset-0 overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 100">
          <defs>
            <linearGradient id={`grad-${asset.id}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={isPositive ? '#089981' : '#f23645'} stopOpacity="0.25" />
              <stop offset="100%" stopColor={isPositive ? '#089981' : '#f23645'} stopOpacity="0.0" />
            </linearGradient>
          </defs>
          <path d={areaPath} fill={`url(#grad-${asset.id})`} />
          <path
            d={linePath}
            fill="none"
            stroke={isPositive ? '#089981' : '#f23645'}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
};
