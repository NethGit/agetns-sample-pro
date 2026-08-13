import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { CategoryTabs } from './components/CategoryTabs';
import { AssetCard } from './components/AssetCard';
import { AssetDetailModal } from './components/AssetDetailModal';
import { SearchModal } from './components/SearchModal';
import { WatchlistDrawer } from './components/WatchlistDrawer';
import { MarketNewsSection } from './components/MarketNewsSection';
import { DisqusComments } from './components/DisqusComments';
import { Footer } from './components/Footer';
import { MARKET_ASSETS, BREAKING_NEWS, ECONOMIC_CALENDAR } from './data/marketData';
import { Asset, MarketCategory } from './types';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<MarketCategory>('US stocks');
  const [selectedRegion, setSelectedRegion] = useState<string>('Global Markets');
  const [assets, setAssets] = useState<Asset[]>(MARKET_ASSETS);
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isWatchlistOpen, setIsWatchlistOpen] = useState(false);

  // Load watchlist from localStorage
  const [watchlistIds, setWatchlistIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('market_watchlist');
      return saved ? JSON.parse(saved) : ['sp500', 'btc', 'nvda'];
    } catch {
      return ['sp500', 'btc', 'nvda'];
    }
  });

  // Save watchlist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('market_watchlist', JSON.stringify(watchlistIds));
    } catch (e) {
      console.error('Failed to save watchlist', e);
    }
  }, [watchlistIds]);

  // Global Ctrl+K / Cmd+K listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Real-time market tick simulation engine
  useEffect(() => {
    const interval = setInterval(() => {
      setAssets((prevAssets) =>
        prevAssets.map((asset) => {
          // Random 25% chance to tick this asset
          if (Math.random() > 0.25) return asset;

          const deltaPercent = (Math.random() - 0.49) * 0.003; // small price tick
          const newPrice = Math.max(0.01, asset.price * (1 + deltaPercent));
          const priceDiff = newPrice - asset.price;
          const newChange = asset.change + priceDiff;
          const newChangePercent = (newChange / (asset.price - asset.change)) * 100;

          const newSparkline = [...asset.sparklineData.slice(1), parseFloat(newPrice.toFixed(2))];

          return {
            ...asset,
            price: parseFloat(newPrice.toFixed(2)),
            change: parseFloat(newChange.toFixed(2)),
            changePercent: parseFloat(newChangePercent.toFixed(2)),
            sparklineData: newSparkline,
            high24h: Math.max(asset.high24h, newPrice),
            low24h: Math.min(asset.low24h, newPrice),
          };
        })
      );
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  // Toggle asset in watchlist
  const handleToggleWatchlist = (assetId: string) => {
    setWatchlistIds((prev) =>
      prev.includes(assetId) ? prev.filter((id) => id !== assetId) : [...prev, assetId]
    );
  };

  const watchlistAssets = assets.filter((a) => watchlistIds.includes(a.id));
  const categoryAssets = assets.filter((a) => a.category === selectedCategory);

  return (
    <div className="min-h-screen flex flex-col bg-[#0f131e] text-[#d1d4dc] selection:bg-[#2962ff]/30">
      {/* Header with Ticker Tape */}
      <Header
        onSearchClick={() => setIsSearchOpen(true)}
        watchlistCount={watchlistIds.length}
        onOpenWatchlist={() => setIsWatchlistOpen(true)}
        tickerAssets={assets}
        onSelectAsset={(asset) => setSelectedAsset(asset)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection selectedRegion={selectedRegion} onSelectRegion={setSelectedRegion} />

        {/* Markets Container */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-20">
          {/* Category Tabs & Section Title */}
          <CategoryTabs
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />

          {/* Asset Cards Grid */}
          {categoryAssets.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {categoryAssets.map((asset) => (
                <AssetCard
                  key={asset.id}
                  asset={asset}
                  onClick={() => setSelectedAsset(asset)}
                  isWatchlisted={watchlistIds.includes(asset.id)}
                  onToggleWatchlist={(e) => {
                    e.stopPropagation();
                    handleToggleWatchlist(asset.id);
                  }}
                />
              ))}
            </div>
          ) : (
            <div className="bg-[#0a0e19] border border-[#2a2e39] rounded-xl p-12 text-center text-[#787b86]">
              <p className="text-base font-semibold text-white">No assets currently listed under {selectedCategory}.</p>
              <p className="text-xs mt-1">Select another category or search for specific symbols above.</p>
            </div>
          )}

          {/* Market News & Economic Calendar */}
          <MarketNewsSection news={BREAKING_NEWS} economicEvents={ECONOMIC_CALENDAR} />

          {/* Community Discussion Forum (Disqus) */}
          <DisqusComments />
        </section>
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals & Drawers */}
      <AssetDetailModal
        asset={selectedAsset}
        onClose={() => setSelectedAsset(null)}
        isWatchlisted={selectedAsset ? watchlistIds.includes(selectedAsset.id) : false}
        onToggleWatchlist={() => selectedAsset && handleToggleWatchlist(selectedAsset.id)}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        assets={assets}
        onSelectAsset={(asset) => {
          setSelectedAsset(asset);
          setIsSearchOpen(false);
        }}
      />

      <WatchlistDrawer
        isOpen={isWatchlistOpen}
        onClose={() => setIsWatchlistOpen(false)}
        watchlistAssets={watchlistAssets}
        onSelectAsset={(asset) => setSelectedAsset(asset)}
        onRemoveFromWatchlist={(id) => handleToggleWatchlist(id)}
        onClearWatchlist={() => setWatchlistIds([])}
      />
    </div>
  );
}
