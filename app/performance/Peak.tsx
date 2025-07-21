"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import {
  ListBulletIcon,
  ViewGridIcon,
  ArrowDownIcon,
  ArrowUpIcon
} from "@radix-ui/react-icons";
import { fetchFromAPI } from "../utils/api";

interface PeakData {
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

export default function Peak() {
  const [npeakdata, setNPeakData] = useState<PeakData[]>([]);
  const [viewMode, setViewMode] = useState<"card" | "table">("card");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true)
    fetchFromAPI<{ message: string; result: { peakData: PeakData[] } }>("/peaks")
      .then((res) => setNPeakData(res.result.peakData))
      .finally(() => setLoading(false))
  }, []);

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    });
  };

  const formatChange = (value: number | null | undefined, pct: number | null | undefined) => {
    if (value == null || pct == null) {
      return <div className="text-sm text-gray-500">--</div>;
    }

    const isPositive = value >= 0;
    const Icon = isPositive ? ArrowUpIcon : ArrowDownIcon;

    return (
      <div className={`flex items-center text-sm font-medium ${isPositive ? "text-green-600" : "text-red-500"}`}>
        <Icon className="mr-1 h-4 w-4" />
        {value.toFixed(2)} ({pct.toFixed(2)}%)
      </div>
    );
  };

  return (

    <Card className="p-4 w-full lg:w-2/4">
      <div className="flex justify-between items-center">
        <h2 className="text-base font-semibold">Peak Data</h2>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            onClick={() => setViewMode("table")}
            className={viewMode === "table" ? "bg-blue-100 text-blue-600" : ""}
          >
            <ListBulletIcon className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            onClick={() => setViewMode("card")}
            className={viewMode === "card" ? "bg-blue-100 text-blue-600" : ""}
          >
            <ViewGridIcon className="h-5 w-5" />
          </Button>
        </div>
      </div>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500" />
        </div>
      ) :
        viewMode === "card" ? (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
            {npeakdata.map((entry, idx) => (
              <Card key={idx} className="p-2 flex flex-col h-38 sm:h-38 md:h-40 lg:h-44 xl:h-32 gap-2 text-sm border rounded-md shadow-sm">
                <div className="flex md:flex-col lg:flex-col xl:flex-row xl:justify-between">
                <div className="">
                <div className="text-sm font-semibold">{formatDate(entry.Date)}</div>
                <div className="text-muted-foreground">{entry.timeDiff}</div>
                </div>
                <div className="text-sm font-semibold">${entry.Close}</div>
                </div>
                {formatChange(entry.change, entry.percentageChange)}
                {formatChange(entry.reverseChange, entry.reversePercentageChange)}
              </Card>
            ))}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-[#f9f9f9]">
                <TableRow>
                  <TableHead>PEAK NO</TableHead>
                  <TableHead>DATE</TableHead>
                  <TableHead>TIMELINE</TableHead>
                  <TableHead>PEAK PRICE</TableHead>
                  <TableHead>DOWNWARD CHANGE</TableHead>
                  <TableHead>UPSIDE CHANGE</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {npeakdata.map((entry, idx) => (
                  <TableRow key={idx}>
                    <TableCell>{entry.peak}</TableCell>
                    <TableCell>{formatDate(entry.Date)}</TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span>{entry.timeDiff}</span>
                        <span className="text-gray-400">{entry.time_diff_str}</span>
                      </div>
                    </TableCell>
                    <TableCell>${entry.Close}</TableCell>
                    <TableCell>{formatChange(entry.change, entry.percentageChange)}</TableCell>
                    <TableCell>{formatChange(entry.reverseChange, entry.reversePercentageChange)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
    </Card>
  );
}
