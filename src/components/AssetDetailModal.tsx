import React, { useState } from 'react';
import {
  X,
  TrendingUp,
  TrendingDown,
  Bookmark,
  Share2,
  BarChart2,
  Sliders,
  Activity,
  Layers,
  Info,
  DollarSign,
  Zap,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
} from 'recharts';
import { Asset, PricePoint } from '../types';

interface AssetDetailModalProps {
  asset: Asset | null;
  onClose: () => void;
  isWatchlisted: boolean;
  onToggleWatchlist: () => void;
}

export const AssetDetailModal: React.FC<AssetDetailModalProps> = ({
  asset,
  onClose,
  isWatchlisted,
  onToggleWatchlist,
}) => {
  if (!asset) return null;

  const [timeframe, setTimeframe] = useState<'1D' | '1W' | '1M' | '3M' | '1Y' | 'ALL'>('1D');
  const [chartType, setChartType] = useState<'area' | 'line' | 'volume'>('area');
  const [showMA, setShowMA] = useState(true);
  const [tradeQuantity, setTradeQuantity] = useState(1);
  const [tradeMessage, setTradeMessage] = useState<string | null>(null);

  const isPositive = asset.change >= 0;
  const chartData: PricePoint[] = asset.historicalData[timeframe] || asset.historicalData['1D'];

  // Handle Paper Trade Simulation
  const handleSimulateTrade = (type: 'BUY' | 'SELL') => {
    const total = (asset.price * tradeQuantity).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    setTradeMessage(`Simulated ${type}: ${tradeQuantity} ${asset.symbol} for $${total} ${asset.currency}`);
    setTimeout(() => setTradeMessage(null), 4000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-sm overflow-y-auto tv-scrollbar">
      <div
        className="bg-[#0f131e] border border-[#2a2e39] w-full max-w-5xl rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-[#2a2e39] bg-[#0a0e19] flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div
              className={`w-12 h-12 rounded-full ${asset.badgeBgColor} flex items-center justify-center text-white font-bold text-sm sm:text-base shadow-md uppercase tracking-tight shrink-0`}
            >
              {asset.badgeText}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-bold text-white">{asset.symbol}</h2>
                <span className="text-xs px-2 py-0.5 bg-[#171b26] border border-[#2a2e39] rounded text-[#787b86] uppercase font-mono">
                  {asset.category}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#787b86]">{asset.name}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onToggleWatchlist}
              className={`p-2 rounded border border-[#2a2e39] transition-colors cursor-pointer ${
                isWatchlisted ? 'bg-[#2962ff]/20 border-[#2962ff] text-[#2962ff]' : 'bg-[#171b26] text-[#787b86] hover:text-white'
              }`}
              title={isWatchlisted ? 'In Watchlist' : 'Add to Watchlist'}
            >
              <Bookmark className={`w-5 h-5 ${isWatchlisted ? 'fill-[#2962ff]' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded bg-[#171b26] border border-[#2a2e39] text-[#787b86] hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto tv-scrollbar flex-1 space-y-6">
          {/* Price & Action Row */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 bg-[#171b26] p-4 rounded-lg border border-[#2a2e39]">
            <div>
              <div className="text-xs text-[#787b86] uppercase font-mono tracking-wider">Live Spot Price</div>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-3xl sm:text-4xl font-extrabold font-mono text-white tracking-tight">
                  {asset.price < 10
                    ? asset.price.toFixed(4)
                    : asset.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
                <span className="text-sm text-[#787b86] font-mono">{asset.currency}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-mono text-sm font-semibold ${
                  isPositive ? 'text-[#089981] bg-[#089981]/10 border border-[#089981]/30' : 'text-[#f23645] bg-[#f23645]/10 border border-[#f23645]/30'
                }`}
              >
                {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                <span>
                  {isPositive ? '+' : ''}
                  {asset.change.toFixed(2)} ({isPositive ? '+' : ''}
                  {asset.changePercent.toFixed(2)}%)
                </span>
              </div>
            </div>
          </div>

          {/* Chart Toolbar Controls */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-[#0a0e19] p-2 rounded-lg border border-[#2a2e39]">
            {/* Timeframes */}
            <div className="flex items-center gap-1 overflow-x-auto tv-scrollbar py-0.5">
              {(['1D', '1W', '1M', '3M', '1Y', 'ALL'] as const).map((tf) => (
                <button
                  key={tf}
                  onClick={() => setTimeframe(tf)}
                  className={`px-3 py-1 text-xs font-mono font-medium rounded transition-colors cursor-pointer ${
                    timeframe === tf ? 'bg-[#2962ff] text-white font-bold' : 'text-[#787b86] hover:text-white hover:bg-[#171b26]'
                  }`}
                >
                  {tf}
                </button>
              ))}
            </div>

            {/* Chart Options */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setChartType(chartType === 'area' ? 'volume' : 'area')}
                className={`px-2.5 py-1 text-xs font-medium rounded border border-[#2a2e39] flex items-center gap-1.5 transition-colors cursor-pointer ${
                  chartType === 'volume' ? 'bg-[#2962ff]/20 border-[#2962ff] text-white' : 'bg-[#171b26] text-[#787b86] hover:text-white'
                }`}
              >
                <BarChart2 className="w-3.5 h-3.5" />
                <span>Volume</span>
              </button>

              <button
                onClick={() => setShowMA(!showMA)}
                className={`px-2.5 py-1 text-xs font-medium rounded border border-[#2a2e39] flex items-center gap-1.5 transition-colors cursor-pointer ${
                  showMA ? 'bg-[#089981]/20 border-[#089981] text-[#089981]' : 'bg-[#171b26] text-[#787b86] hover:text-white'
                }`}
              >
                <Activity className="w-3.5 h-3.5" />
                <span>MA Overlay</span>
              </button>
            </div>
          </div>

          {/* Main Chart Section */}
          <div className="h-72 sm:h-80 w-full bg-[#0a0e19] p-4 rounded-lg border border-[#2a2e39] relative">
            <ResponsiveContainer width="100%" height="100%">
              {chartType === 'area' ? (
                <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={isPositive ? '#089981' : '#f23645'} stopOpacity={0.4} />
                      <stop offset="95%" stopColor={isPositive ? '#089981' : '#f23645'} stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2a2e39" opacity={0.5} />
                  <XAxis dataKey="time" stroke="#787b86" tick={{ fill: '#787b86', fontSize: 11 }} />
                  <YAxis
                    domain={['auto', 'auto']}
                    stroke="#787b86"
                    tick={{ fill: '#787b86', fontSize: 11 }}
                    tickFormatter={(val) => (val > 1000 ? `${(val / 1000).toFixed(1)}k` : val)}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1e222d',
                      borderColor: '#2a2e39',
                      borderRadius: '8px',
                      color: '#d1d4dc',
                      fontSize: '12px',
                      fontFamily: 'monospace',
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="price"
                    stroke={isPositive ? '#089981' : '#f23645'}
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#chartGradient)"
                    name="Price"
                  />
                  {showMA && (
                    <Area
                      type="monotone"
                      dataKey="ma20"
                      stroke="#2962ff"
                      strokeWidth={1.5}
                      strokeDasharray="4 4"
                      fill="none"
                      name="MA 20"
                    />
                  )}
                </AreaChart>
              ) : (
                <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2a2e39" opacity={0.5} />
                  <XAxis dataKey="time" stroke="#787b86" tick={{ fill: '#787b86', fontSize: 11 }} />
                  <YAxis stroke="#787b86" tick={{ fill: '#787b86', fontSize: 11 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1e222d',
                      borderColor: '#2a2e39',
                      borderRadius: '8px',
                      color: '#d1d4dc',
                      fontSize: '12px',
                    }}
                  />
                  <Bar dataKey="volume" fill="#2962ff" radius={[4, 4, 0, 0]} name="Volume" />
                </BarChart>
              )}
            </ResponsiveContainer>
          </div>

          {/* Key Statistics Grid */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider font-mono mb-3 flex items-center gap-2">
              <Info className="w-4 h-4 text-[#2962ff]" /> Key Market Metrics
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="bg-[#171b26] p-3 rounded-lg border border-[#2a2e39]">
                <div className="text-[#787b86]">24h High</div>
                <div className="text-white font-mono font-bold text-sm mt-0.5">${asset.high24h.toLocaleString()}</div>
              </div>
              <div className="bg-[#171b26] p-3 rounded-lg border border-[#2a2e39]">
                <div className="text-[#787b86]">24h Low</div>
                <div className="text-white font-mono font-bold text-sm mt-0.5">${asset.low24h.toLocaleString()}</div>
              </div>
              <div className="bg-[#171b26] p-3 rounded-lg border border-[#2a2e39]">
                <div className="text-[#787b86]">24h Volume</div>
                <div className="text-white font-mono font-bold text-sm mt-0.5">{asset.volume24h}</div>
              </div>
              <div className="bg-[#171b26] p-3 rounded-lg border border-[#2a2e39]">
                <div className="text-[#787b86]">Market Cap / Cap</div>
                <div className="text-white font-mono font-bold text-sm mt-0.5">{asset.marketCap || 'N/A'}</div>
              </div>
            </div>
          </div>

          {/* Paper Trading Simulation Box */}
          <div className="bg-[#171b26] p-4 rounded-lg border border-[#2a2e39] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="text-sm font-semibold text-white flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-[#089981]" /> Paper Trading Sandbox
              </div>
              <p className="text-xs text-[#787b86] mt-0.5">
                Simulate instant market execution without risk.
              </p>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="flex items-center gap-1 bg-[#0a0e19] border border-[#2a2e39] rounded px-2 py-1">
                <span className="text-xs text-[#787b86]">Qty:</span>
                <input
                  type="number"
                  min="1"
                  max="1000"
                  value={tradeQuantity}
                  onChange={(e) => setTradeQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-16 bg-transparent text-white text-xs font-mono font-bold focus:outline-none"
                />
              </div>

              <button
                onClick={() => handleSimulateTrade('BUY')}
                className="flex-1 sm:flex-initial bg-[#089981] hover:bg-[#077d6a] text-white px-4 py-1.5 rounded text-xs font-bold transition-colors cursor-pointer"
              >
                BUY
              </button>
              <button
                onClick={() => handleSimulateTrade('SELL')}
                className="flex-1 sm:flex-initial bg-[#f23645] hover:bg-[#c92835] text-white px-4 py-1.5 rounded text-xs font-bold transition-colors cursor-pointer"
              >
                SELL
              </button>
            </div>
          </div>

          {tradeMessage && (
            <div className="bg-[#2962ff]/20 border border-[#2962ff] text-white p-3 rounded-lg text-xs font-mono text-center animate-fadeIn">
              {tradeMessage}
            </div>
          )}

          {/* Asset Description */}
          <div className="bg-[#0a0e19] p-4 rounded-lg border border-[#2a2e39]">
            <h4 className="text-xs font-semibold text-[#787b86] uppercase font-mono mb-1">About {asset.name}</h4>
            <p className="text-xs text-[#d1d4dc] leading-relaxed">{asset.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
