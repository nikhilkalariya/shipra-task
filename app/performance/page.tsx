// app/alphabet/performance/page.tsx
"use client";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { fetchFromAPI } from "../lib/api";
import { Button } from "@/components/ui/button";
import { ArrowDownIcon, ArrowUpIcon, ListBulletIcon, ViewGridIcon } from "@radix-ui/react-icons";
import Trend from "./Trend";
import Peak from "./Peak";


interface PerformanceEntry {
  date: string;
  day: string;
  current_price: number;
  past_price: number;
  change: number;
  change_pct: number;
  pe: number | null;
  pe_change_pct: number | null;
}

interface PeakEntry {
  Close: number;
  Date: string;
  change: number;
  peak: string;
  percentageChange: number;
  reverseChange: number;
  reversePercentageChange: number;
  timeDiff: string;
  time_diff_str: string;
  trending: boolean;
}

export default function PerformancePage() {
  const [performanceData, setPerformanceData] = useState<PerformanceEntry[]>([]);
  const [peakData, setPeakData] = useState<PeakEntry[]>([]);
  // const [viewMode, setViewMode] = useState<"card" | "table">("card");

  // useEffect(() => {
  //   fetchFromAPI<{ message: string; result: PerformanceEntry[] }>("/performance").then(
  //     (res) => setPerformanceData(res.result)
  //   );

  //   fetchFromAPI<{ message: string; result: { peakData: PeakEntry[] } }>("/peaks").then(
  //     (res) => setPeakData(res.result.peakData)
  //   );
  // }, []);

  // const formatChange = (change: number, pct: number) => {
  //   const isPositive = change >= 0;
  //   return (
  //     <div className={`flex items-center text-sm ${isPositive ? "text-green-600" : "text-red-500"}`}>
  //       {isPositive ? <ArrowUpIcon/> : <ArrowDownIcon/>} {change.toFixed(2)} ({pct.toFixed(2)}%)
  //     </div>
  //   );
  // };

  // const renderGrid = (title: string, data: any[], isPeak = false) => (  
  //   <div className="flex-1">
  //     <div className="flex justify-between">
  //     <h4 className="font-semibold text-lg mb-2">{title}</h4>
  //       <div className="flex gap-2 mb-4">
  //         <Button
  //           variant="ghost"
  //           onClick={() => setViewMode("table")}
  //           className={viewMode === "table" ? "bg-blue-100 text-blue-600" : ""}
  //         >
  //           <ListBulletIcon className="h-5 w-5" />
  //         </Button>
  //         <Button
  //           variant="ghost"
  //           onClick={() => setViewMode("card")}
  //           className={viewMode === "card" ? "bg-blue-100 text-blue-600" : ""}
  //         >
  //           <ViewGridIcon className="h-5 w-5" />
  //         </Button>
  //       </div>
  //     </div>
  //     <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3">
  //       {data.map((entry, idx) => (
  //         <Card
  //           key={idx}
  //           className="p-3 border rounded-md flex flex-col gap-1 text-sm"
  //         >
  //           <div className="font-medium">
  //             {new Date(entry.date || entry.Date).toLocaleDateString("en-GB", {
  //               day: "2-digit",
  //               month: "long",
  //               year: "numeric",
  //             })}
  //           </div>
  //           <div className="text-muted-foreground">
  //             {isPeak ? entry.timeDiff : entry.day}
  //           </div>
  //           <div className="font-semibold">
  //             ${isPeak ? entry.Close.toFixed(2) : entry.current_price.toFixed(2)}
  //           </div>
  //           {formatChange(
  //             isPeak ? entry.reverseChange : entry.change,
  //             isPeak ? entry.reversePercentageChange : entry.change_pct
  //           )}
  //         </Card>
  //       ))}
  //     </div>
  //   </div>
  // );

  // const renderTable = (title: string, data: any[], isPeak = false) => (
  //   <div className="flex-1">
  //     <div className="flex justify-between">
  //       <h4 className="font-semibold text-lg mb-2">{title}</h4>
  //       <div className="flex gap-2 mb-4">
  //         <Button
  //           variant="ghost"
  //           onClick={() => setViewMode("table")}
  //           className={viewMode === "table" ? "bg-blue-100 text-blue-600" : ""}
  //         >
  //           <ListBulletIcon className="h-5 w-5" />
  //         </Button>
  //         <Button
  //           variant="ghost"
  //           onClick={() => setViewMode("card")}
  //           className={viewMode === "card" ? "bg-blue-100 text-blue-600" : ""}
  //         >
  //           <ViewGridIcon className="h-5 w-5" />
  //         </Button>
  //       </div>
  //     </div>
  //     <div className="overflow-x-auto">
  //       <table className="min-w-full text-sm border">
  //         <thead className="bg-gray-100">
  //           <tr>
  //             <th className="px-4 py-2 text-left">Date</th>
  //             <th className="px-4 py-2 text-left">{isPeak ? "Time Ago" : "Day"}</th>
  //             <th className="px-4 py-2 text-left">Price</th>
  //             <th className="px-4 py-2 text-left">Change</th>
  //           </tr>
  //         </thead>
  //         <tbody>
  //           {data.map((entry, idx) => (
  //             <tr key={idx} className="border-t">
  //               <td className="px-4 py-2">
  //                 {new Date(entry.date || entry.Date).toLocaleDateString("en-GB", {
  //                   day: "2-digit",
  //                   month: "short",
  //                   year: "numeric",
  //                 })}
  //               </td>
  //               <td className="px-4 py-2">{isPeak ? entry.timeDiff : entry.day}</td>
  //               <td className="px-4 py-2">
  //                 ${isPeak ? entry.Close.toFixed(2) : entry.current_price.toFixed(2)}
  //               </td>
  //               <td className="px-4 py-2">
  //                 {formatChange(
  //                   isPeak ? entry.reverseChange : entry.change,
  //                   isPeak ? entry.reversePercentageChange : entry.change_pct
  //                 )}
  //               </td>
  //             </tr>
  //           ))}
  //         </tbody>
  //       </table>
  //     </div>
  //   </div>
  // );

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col lg:flex-row gap-6">
        <Trend/>
        <Peak/>
      
        {/* {viewMode === "card"
          ? (
            <>
              {renderGrid("Trends", performanceData)}
              {renderGrid("Peak Data", peakData, true)}
            </>
          ) : (
            <>
              {renderTable("Trends", performanceData)}
              {renderTable("Peak Data", peakData, true)}
            </>
          )} */}
      </div>
    </div>
  );
}
