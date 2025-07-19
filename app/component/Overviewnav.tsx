'use client';
import React, { useEffect, useState } from 'react';
import { fetchFromAPI } from '../utils/api';
import Image from 'next/image';
import { AlignBottomIcon, AlignTopIcon, DotsVerticalIcon } from '@radix-ui/react-icons';

export interface HeatMapData {
  date: string;
  open: number;
  close: number;
  price_change: number;
  percentage_change: number;
  current_to_close_percentage: number;
}

export interface HedgedCurrency {
  ticker: string;
  currency: string;
  exchange: string;
  latestClose: number;
  change: number;
  percentageChange: number;
  logo: string;
  nm: string;
}

export interface Crossover {
  date: string;
  daysAgo: number;
  priceAtCross: number;
  priceChange: number;
  priceChangePercent: number;
  rsiAtCross: number;
  type: string;
  vix: {
    date: string;
    level: string;
    vixValue: number;
  };
}

export interface OverviewData {
  DMA_124: number;
  DMA_200: number;
  RSI: number;
  SRT_124: number;
  afterHoursChange: number;
  afterHoursPercentageChange: number;
  afterHoursPrice: number;
  change: number;
  closeDate: string;
  crossover: Crossover;
  currency: string;
  daysUntilEarnings: number;
  dividendRate: number;
  dividendYield: number;
  exchange: string;
  heatMap: {
    currency: string;
    current_open_price: number;
    current_price: number;
    historical_data: HeatMapData[];
    percentage_diff_last_close_to_current: number;
    price_difference: number;
    price_difference_percentage: number;
    ticker: string;
  };
  hedgedCurrency: HedgedCurrency[];
  index: string;
  latestClose: number;
  nextEarningsDate: string;
  opportunityMessage: string | null;
  percentageChange: number;
  remaining_opportunity: number;
  nm: string;
  ticker: string;
  id: string;
  logo: string;
}

export interface OverviewApiResponse {
  message: string;
  result: OverviewData;
}

export default function Overviewnav() {
  const [data, setData] = useState<OverviewData | null>(null);

  useEffect(() => {
    fetchFromAPI<OverviewApiResponse>('/info')
      .then((res) => setData(res.result))
      .catch(console.error);
  }, []);

  return (
    <div className="bg-[#0075ff08] px-6 py-4 ">
      {data ? (
        <div >
        <div className="flex items-start justify-between w-full">
          <div className="flex items-center gap-3">
            <Image className='rounded-full' src={data.logo} alt="logo" width={32} height={32} />
            <div>
              <div className="text-lg font-semibold">{data.nm} <span className="text-sm text-muted-foreground">{data.ticker}</span></div>
              <div className="text-xs text-muted-foreground">{data.exchange}</div>
            </div>
          </div>
          <div className='flex items-center gap-2'>
            <div className='bg-white shadow-2xl rounded-full  p-2'>
            <AlignBottomIcon className='bg-white shadow-2xl w-4 h-4 text-red-600'/>
            </div>
            <div className='bg-white shadow-2xl rounded-full  p-2'>
            <AlignBottomIcon className='bg-white shadow-2xl w-4 h-4 text-red-600'/>
            </div>
            <div className='bg-white shadow-2xl rounded-full  p-2'>
            <AlignTopIcon className='bg-white shadow-2xl w-4 h-4 text-yellow-500 '/>
            </div>
            <div className='bg-white shadow-2xl rounded-full  p-2'>
            <AlignBottomIcon className='bg-white shadow-2xl w-4 h-4 text-red-600'/>
            </div>
            <div className='bg-white shadow-2xl rounded-full  p-2'>
            <AlignTopIcon className='bg-white shadow-2xl w-4 h-4 text-yellow-500 '/>
            </div>
            <span>Action</span>
            <DotsVerticalIcon/>
          </div>
         </div> 

          <div className="grid grid-flow-col gap-2 text-sm pb-5">
            <div className='border-r border-[#e2e2e2]'>
              <div className="text-muted-foreground">Price</div>
             <div className='flex gap-2 items-center'> 
              <div className="font-semibold">${data.latestClose.toFixed(2)}</div>
              <div className={`text-xs mt-1 px-2 py-0.5 inline-block rounded-2xl ${data.percentageChange >= 0 ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                {data.change.toFixed(2)} ({data.percentageChange.toFixed(2)}%)
              </div>
             </div> 
            </div>

            <div className='border-r border-[#e2e2e2]'>
              <div className="text-muted-foreground">Opportunity Buy</div>
              <div className="font-semibold">{data.remaining_opportunity.toFixed(2)}%</div>
            </div>

            <div className='border-r border-[#e2e2e2]'>
              <div className="text-muted-foreground">RSI</div>
              <div className={`font-semibold ${data.RSI > 70 ? 'text-red-500' : 'text-green-600'}`}>&gt;{data.RSI}</div>
            </div>

            <div className='border-r border-[#e2e2e2]'>
              <div className="text-muted-foreground">200 Day DMA</div>
              <div className="text-sm text-red-500">6.76% ($123.43)</div>
            </div>

            <div className='border-r border-[#e2e2e2]'>
              <div className="text-muted-foreground">SRT (124 DMA)</div>
              <div className="font-semibold">{data.SRT_124}</div>
            </div>

            <div className='border-r border-[#e2e2e2]'>
              <div className="text-muted-foreground">Earnings</div>
              <div className="font-semibold">{new Date(data.nextEarningsDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500" />
        </div>
      )}
    </div>
  );
}
