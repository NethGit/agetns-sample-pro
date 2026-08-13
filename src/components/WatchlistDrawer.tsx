import React from 'react';
import { X, Trash2, TrendingUp, TrendingDown, Star } from 'lucide-react';
import { Asset } from '../types';

interface WatchlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  watchlistAssets: Asset[];
  onSelectAsset: (asset: Asset) => void;
  onRemoveFromWatchlist: (id: string) => void;
  onClearWatchlist: () => void;
}

export const WatchlistDrawer: React.FC<WatchlistDrawerProps> = ({
  isOpen,
  onClose,
  watchlistAssets,
  onSelectAsset,
  onRemoveFromWatchlist,
  onClearWatchlist,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs">
      <div className="w-full max-w-md bg-[#0f131e] border-l border-[#2a2e39] h-full shadow-2xl flex flex-col animate-slideLeft">
        {/* Header */}
        <div className="p-4 border-b border-[#2a2e39] bg-[#0a0e19] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 text-[#2962ff] fill-[#2962ff]" />
            <h2 className="text-lg font-bold text-white">Your Watchlist</h2>
            <span className="text-xs px-2 py-0.5 bg-[#171b26] border border-[#2a2e39] text-[#787b86] rounded-full font-mono">
              {watchlistAssets.length}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {watchlistAssets.length > 0 && (
              <button
                onClick={onClearWatchlist}
                className="text-xs text-[#787b86] hover:text-[#f23645] transition-colors p-1"
                title="Clear Watchlist"
              >
                Clear All
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 text-[#787b86] hover:text-white rounded bg-[#171b26] border border-[#2a2e39] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content List */}
        <div className="flex-1 overflow-y-auto tv-scrollbar p-3 space-y-2">
          {watchlistAssets.length > 0 ? (
            watchlistAssets.map((asset) => {
              const isPositive = asset.change >= 0;

              return (
                <div
                  key={asset.id}
                  onClick={() => {
                    onSelectAsset(asset);
                    onClose();
                  }}
                  className="group bg-[#0a0e19] hover:bg-[#171b26] border border-[#2a2e39] rounded-lg p-3 flex items-center justify-between gap-3 cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-full ${asset.badgeBgColor} flex items-center justify-center text-white font-bold text-xs uppercase shrink-0`}
                    >
                      {asset.badgeText}
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm group-hover:text-[#2962ff] transition-colors">
                        {asset.symbol}
                      </h4>
                      <p className="text-xs text-[#787b86]">{asset.category}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right font-mono">
                      <div className="text-sm font-bold text-white">
                        ${asset.price < 10 ? asset.price.toFixed(4) : asset.price.toLocaleString()}
                      </div>
                      <div
                        className={`text-xs font-semibold flex items-center justify-end gap-0.5 ${
                          isPositive ? 'text-[#089981]' : 'text-[#f23645]'
                        }`}
                      >
                        {isPositive ? '+' : ''}
                        {asset.changePercent.toFixed(2)}%
                      </div>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onRemoveFromWatchlist(asset.id);
                      }}
                      className="text-[#787b86] hover:text-[#f23645] p-1.5 rounded hover:bg-[#2a2e39] transition-colors cursor-pointer"
                      title="Remove"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="py-20 text-center text-[#787b86] flex flex-col items-center gap-3">
              <Star className="w-10 h-10 text-[#2a2e39]" />
              <p className="text-sm">Your watchlist is currently empty.</p>
              <p className="text-xs text-[#787b86] max-w-xs">
                Click the bookmark icon on any asset card to save it here for real-time tracking.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
