export type MarketCategory =
  | 'US stocks'
  | 'World stocks'
  | 'Crypto'
  | 'Futures'
  | 'Forex'
  | 'Government bonds'
  | 'Corporate bonds'
  | 'ETFs'
  | 'Economy';

export interface PricePoint {
  time: string;
  price: number;
  open?: number;
  high?: number;
  low?: number;
  close?: number;
  volume?: number;
  ma20?: number;
  ma50?: number;
  rsi?: number;
}

export interface Asset {
  id: string;
  symbol: string;
  name: string;
  category: MarketCategory;
  price: number;
  change: number;
  changePercent: number;
  badgeText: string;
  badgeBgColor: string;
  sparklineColor: 'emerald' | 'red';
  sparklineData: number[];
  high24h: number;
  low24h: number;
  volume24h: string;
  marketCap?: string;
  peRatio?: number;
  yieldPercent?: number;
  currency: string;
  historicalData: Record<'1D' | '1W' | '1M' | '3M' | '1Y' | 'ALL', PricePoint[]>;
  description: string;
}

export interface NewsItem {
  id: string;
  title: string;
  source: string;
  timeAgo: string;
  category: string;
  sentiment: 'bullish' | 'bearish' | 'neutral';
  url?: string;
  relatedSymbols: string[];
}

export interface EconomicEvent {
  id: string;
  country: string;
  flag: string;
  event: string;
  date: string;
  time: string;
  actual?: string;
  forecast?: string;
  previous?: string;
  impact: 'low' | 'medium' | 'high';
}
