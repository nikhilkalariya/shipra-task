"use client";
import { Card } from "@/components/ui/card";
import { DmaEntry } from "./page";

interface InvestmentReturnsProps {
  dmaData: DmaEntry[];
}

const timeMap: Record<string, string> = {
  "5": "1 Week",
  "10": "2 Weeks",
  "20": "1 Month",
  "50": "3 Months",
  "100": "1 Year",
  "200": "3 Years",
  "300": "5 Years",
};

export default function InvestmentReturns({dmaData}: InvestmentReturnsProps) {

  const longTerm = dmaData.filter((d: { day: string; }) => ["100", "200", "300"].includes(d.day));
  const shortTerm = dmaData.filter((d: { day: string; }) => ["5", "10", "20", "50"].includes(d.day));

  const renderBars = (entries: DmaEntry[]) =>
    entries.map((item, idx) => {
      const label = timeMap[item.day];
      const value = item.percentage_change;
      const isPositive = value >= 0;

      return (
        <div key={idx} className="flex items-center justify-between gap-2 text-sm">
          <div className="w-20 text-gray-800">{label}</div>
          <div className="flex-1 bg-gray-100 rounded h-2 relative mx-2">
            <div
              className={`h-2 rounded ${isPositive ? "bg-green-500" : "bg-red-500"}`}
              style={{
                width: `${Math.min(Math.abs(value), 100)}%`,
              }}
            />
          </div>
          <div className={`w-16 text-right ${isPositive ? "text-green-600" : "text-red-500"}`}>
            {value.toFixed(2)}%
          </div>
        </div>
      );
    });

  return (
    <Card className="border rounded-lg p-4 bg-white w-2/3">
      <h3 className="font-semibold text-sm">Investment Returns</h3>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 lg:divide-x">
        <div className="pr-2">
          <h4 className="text-xs font-semibold mb-2 text-gray-700">Long Term</h4>
          <div className="space-y-2">{renderBars(longTerm)}</div>
        </div>
        <div className="">
          <h4 className="text-xs font-semibold mb-2 text-gray-700">Short Term</h4>
          <div className="space-y-2">{renderBars(shortTerm)}</div>
        </div>
      </div>
    </Card>
  );
}
