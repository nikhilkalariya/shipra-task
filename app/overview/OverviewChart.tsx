"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { useEffect, useState } from "react";
import { TrendingUp } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { fetchFromAPI } from "../utils/api";


interface ClosingPrice {
  time: string;
  value: number;
}

const ranges = ["5D", "1M", "3M", "6M", "YTD", "1Y", "3Y", "5Y", "10Y", "MAX"];
const tabs = ["Price", "Drawdown", "P/E", "Worst Phase"];

function filterData(data: ClosingPrice[], range: string): ClosingPrice[] {
  const now = new Date();
  let fromDate: Date;

  switch (range) {
    case "5D":
      fromDate = new Date(now);
      fromDate.setDate(now.getDate() - 5);
      break;
    case "1M":
      fromDate = new Date(now);
      fromDate.setMonth(now.getMonth() - 1);
      break;
    case "3M":
      fromDate = new Date(now);
      fromDate.setMonth(now.getMonth() - 3);
      break;
    case "6M":
      fromDate = new Date(now);
      fromDate.setMonth(now.getMonth() - 6);
      break;
    case "YTD":
      fromDate = new Date(now.getFullYear(), 0, 1);
      break;
    case "1Y":
      fromDate = new Date(now);
      fromDate.setFullYear(now.getFullYear() - 1);
      break;
    case "3Y":
      fromDate = new Date(now);
      fromDate.setFullYear(now.getFullYear() - 3);
      break;
    case "5Y":
      fromDate = new Date(now);
      fromDate.setFullYear(now.getFullYear() - 5);
      break;
    case "10Y":
      fromDate = new Date(now);
      fromDate.setFullYear(now.getFullYear() - 10);
      break;
    default:
      return data;
  }

  return data.filter((item) => new Date(item.time) >= fromDate);
}

export default function OverviewChart() {
  const [allData, setAllData] = useState<ClosingPrice[]>([]);
  const [selectedRange, setSelectedRange] = useState("5D");
  const [active ,setActive] =useState("")
useEffect(() => {
   async function fetchData() {
    try {
      const res = await fetchFromAPI<{ message: string; result: ClosingPrice[] }>(
        "/closing-prices"
      );

      const cleaned = res.result.map((item) => ({
        time: item.time,
        value: item.value,
      }));
      setAllData(cleaned);
    } catch (error) {
      console.error("API error:", error);
    }
  }

  fetchData();
}, []);

  const prices = filterData(allData, selectedRange);

  return (
    <Card className="text-white border ">
      <div className="mx-6 flex items-center gap-1 ">
      {/* Tabs */}
      <div className="flex gap-2 bg-white p-1 rounded-lg shadow-sm border text-sm">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActive(tab)}
            className={`whitespace-nowrap ${
              tab === active
                ? "text-blue-600 font-semibold bg-blue-100 p-1 rounded-lg"
                : "text-gray-500 p-1 hover:text-black"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Stats */}
      <div className="flex gap-2 p-2 bg-white rounded-lg shadow-sm border items-center text-gray-700 text-sm">
        <span>
          <span className="text-gray-500">Total Change:</span>
          <span>CA$1.22 (4.80%)</span>
        </span>
        <span className="border-l border-gray-300 h-4" />
        <span>
          <span className="text-gray-500">CAGR:</span> 29.63%
        </span>
      </div>
    </div>
      <div className= "mx-6 bg-[#0075ff08] rounded-xl flex justify-between px-10 p-2">
        {ranges.map((range) => (
          <button
            key={range}
            onClick={() => setSelectedRange(range)}
            className={`text-xs ${
              selectedRange === range
                ? "bg-white rounded-lg text-blue-500 "
                : " text-gray-400 "
            }`}
          >
            {range}
          </button>
        ))}
      </div>

      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={prices} margin={{ left: 0, right: 0, top: 10, bottom: 0 }}>
            <defs>
              <linearGradient id="colorGreen" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#22c55e" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#22c55e" stopOpacity={0.2} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="#e2e2e2" vertical={true } />
            <XAxis
              dataKey="time"
              tick={{ fill: "#ccc", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              tickMargin={10}
              minTickGap={20}
              tickFormatter={(v) => {
                const date = new Date(v);
                const day = date.toLocaleString("default", { weekday: "short" });
                return `${day} ${date.getDate()} `;
              }}
            />
            <YAxis
              tick={{ fill: "#ccc", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              tickMargin={10}
            />
            <Tooltip
              content={({ active, payload }) =>
                active && payload && payload.length ? (
                  <div className="bg-white text-black text-xs p-2 rounded shadow">
                    <div>{payload[0].payload.time}</div>
                    <div className="font-semibold">${Number(payload[0].value).toFixed(2)}</div>
                  </div>
                ) : null
              }
            />
            <Area
              type="linear"
              dataKey="value"
              stroke="#22c55e"
              fill="url(#colorGreen)"
              strokeWidth={2}
              isAnimationActive={true}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>

      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm text-gray-300">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium">
              Trending up over the long term <TrendingUp className="h-4 w-4 text-green-500" />
            </div>
            <div className="text-muted-foreground">Since IPO launch</div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}

