'use client'
import { useEffect, useState } from "react";
import OverviewChart from "./OverviewChart";
import OverviewCards from "./OverviewCards";
import { fetchFromAPI } from "../utils/api";
import HighLowStats from "./HighLowstate";
import DmaTable from "./DmaEntry";
import InvestmentReturns from "./InvestmentReturn";

interface Profile {
  EV: string;
  Employees: number;
  "Market Cap": string;
  Revenue: string;
  "RPE (Revenue per Employee)": number;
  "Share Out": string;
}

interface Valuation {
  [key: string]: number;
}

interface FinancialHealth {
  Cash: string;
  "Debt/Equity": number;
  "EBIT/Interest": number;
  "Net Debt": string;
}

interface GrowthCAGR {
  [key: string]: number;
}

interface Dividends {
  DPS: number;
  "DPS Growth 10Yr": number | null;
  "DPS Growth 3Yr": number | null;
  "DPS Growth 5Yr": number | null;
  "Payout Ratio": number;
  Yield: number;
}

interface ClosingPrice {
  time: string;
  value: number;
}

export interface OverviewResult {
  Profile: Profile;
  "Valuation (TTM)": Valuation;
  "Valuation (NTM)": Valuation;
  "Financial Health": FinancialHealth;
  "Growth (CAGR)": GrowthCAGR;
  Dividends: Dividends;
  closingPrices: ClosingPrice[];
}

// API response shape from backend
export interface OverviewApiResponse {
  message: string;
  result: OverviewResult;
}

export interface HighLowEntry {
  high: number;
  highDate: string;
  highDaysAgo: number;
  highPercentage: number;
  low: number;
  lowDate: string;
  lowDaysAgo: number;
  lowPercentage: number;
  week: string;
}
export interface DmaEntry {
  date: string;
  day: string;
  dma_price: number;
  downward_percent: number | null;
  upward_percent: number | null;
  percentage_change: number;
}

export default function OverviewSection() {
  const [data, setData] = useState<OverviewResult | null>(null);
  const [dmaData, setDmaData] = useState<DmaEntry[]>([]);
  const [statistics, setstatics] =useState<HighLowEntry[]>([])

  useEffect(() => {
    fetchFromAPI<{message:string ,result:OverviewResult} >("/overview")
      .then((res) => setData(res.result))
      .catch(console.error);
  }, []);

 useEffect(() => {
     fetchFromAPI<{ message: string; result: HighLowEntry[] }>("/trading-high-low")
       .then((res) => setstatics(res.result))
       .catch(console.error);
   }, []);


  useEffect(() => {
    fetchFromAPI<{ message: string; result: DmaEntry[] }>("/moving-average")
      .then((res) => setDmaData(res.result))
      .catch(console.error);
  }, []);

  if (!data) return
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500" />
        </div>;

  return (
    <div className=" flex flex-col gap-4 container mx-auto p-4">
      <OverviewChart/>
      <OverviewCards data ={data} />
      <HighLowStats statistics ={statistics}/>
      <div className="flex gap-2 w-full">
      <InvestmentReturns dmaData={dmaData}/>
      <DmaTable dmaData={dmaData} />
      </div>
    </div>
  );
}