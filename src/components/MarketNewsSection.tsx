import React from 'react';
import { Newspaper, TrendingUp, TrendingDown, Minus, ExternalLink, Calendar, Flag } from 'lucide-react';
import { NewsItem, EconomicEvent } from '../types';

interface MarketNewsSectionProps {
  news: NewsItem[];
  economicEvents: EconomicEvent[];
}

export const MarketNewsSection: React.FC<MarketNewsSectionProps> = ({ news, economicEvents }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-12">
      {/* News Feed - 2 Columns */}
      <div className="lg:col-span-2 bg-[#0a0e19] border border-[#2a2e39] rounded-xl p-5 shadow-lg">
        <div className="flex items-center justify-between border-b border-[#2a2e39] pb-4 mb-4">
          <div className="flex items-center gap-2">
            <Newspaper className="w-5 h-5 text-[#2962ff]" />
            <h3 className="text-lg font-bold text-white">Market Insights & News</h3>
          </div>
          <span className="text-xs text-[#089981] font-mono flex items-center gap-1 bg-[#089981]/10 px-2 py-0.5 rounded">
            <span className="w-1.5 h-1.5 rounded-full bg-[#089981] animate-ping"></span> Live Stream
          </span>
        </div>

        <div className="space-y-4 divide-y divide-[#2a2e39]">
          {news.map((item) => {
            const isBullish = item.sentiment === 'bullish';
            const isBearish = item.sentiment === 'bearish';

            return (
              <div key={item.id} className="pt-4 first:pt-0 group cursor-pointer">
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs text-[#787b86]">
                      <span className="font-semibold text-[#d1d4dc]">{item.source}</span>
                      <span>•</span>
                      <span>{item.timeAgo}</span>
                      <span>•</span>
                      <span className="px-1.5 py-0.2 bg-[#171b26] text-[#787b86] rounded text-[10px] uppercase font-mono">
                        {item.category}
                      </span>
                    </div>

                    <h4 className="text-sm sm:text-base font-semibold text-white group-hover:text-[#2962ff] transition-colors leading-snug">
                      {item.title}
                    </h4>

                    {/* Related Symbols */}
                    <div className="flex items-center gap-1.5 pt-1">
                      {item.relatedSymbols.map((sym) => (
                        <span
                          key={sym}
                          className="px-2 py-0.5 bg-[#171b26] border border-[#2a2e39] rounded text-[11px] font-mono text-[#d1d4dc]"
                        >
                          ${sym}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Sentiment Tag */}
                  <span
                    className={`shrink-0 px-2.5 py-1 rounded text-xs font-mono font-bold flex items-center gap-1 ${
                      isBullish
                        ? 'bg-[#089981]/10 text-[#089981] border border-[#089981]/30'
                        : isBearish
                        ? 'bg-[#f23645]/10 text-[#f23645] border border-[#f23645]/30'
                        : 'bg-[#171b26] text-[#787b86] border border-[#2a2e39]'
                    }`}
                  >
                    {isBullish && <TrendingUp className="w-3.5 h-3.5" />}
                    {isBearish && <TrendingDown className="w-3.5 h-3.5" />}
                    {!isBullish && !isBearish && <Minus className="w-3.5 h-3.5" />}
                    <span className="capitalize">{item.sentiment}</span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Economic Calendar - 1 Column */}
      <div className="bg-[#0a0e19] border border-[#2a2e39] rounded-xl p-5 shadow-lg">
        <div className="flex items-center justify-between border-b border-[#2a2e39] pb-4 mb-4">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-[#2962ff]" />
            <h3 className="text-lg font-bold text-white">Economic Calendar</h3>
          </div>
          <span className="text-xs text-[#787b86] font-mono">EST Timezone</span>
        </div>

        <div className="space-y-3">
          {economicEvents.map((ev) => (
            <div
              key={ev.id}
              className="bg-[#171b26] border border-[#2a2e39] rounded-lg p-3 hover:border-[#363a45] transition-colors"
            >
              <div className="flex items-center justify-between text-xs text-[#787b86]">
                <div className="flex items-center gap-1.5 font-semibold text-white">
                  <span>{ev.flag}</span>
                  <span>{ev.country}</span>
                  <span className="text-[#787b86]">•</span>
                  <span className="text-[#2962ff]">{ev.date}</span>
                </div>
                <span
                  className={`px-1.5 py-0.2 rounded text-[10px] font-mono font-bold uppercase ${
                    ev.impact === 'high' ? 'bg-[#f23645]/20 text-[#f23645]' : 'bg-[#2962ff]/20 text-[#2962ff]'
                  }`}
                >
                  {ev.impact} Impact
                </span>
              </div>

              <div className="font-semibold text-white text-xs mt-1.5">{ev.event}</div>

              <div className="grid grid-cols-2 gap-2 text-[11px] font-mono mt-2 pt-2 border-t border-[#2a2e39]">
                <div>
                  <span className="text-[#787b86]">Forecast: </span>
                  <span className="text-white font-bold">{ev.forecast}</span>
                </div>
                <div>
                  <span className="text-[#787b86]">Previous: </span>
                  <span className="text-[#d1d4dc]">{ev.previous}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
