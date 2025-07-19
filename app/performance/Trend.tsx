"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ListBulletIcon,
  ViewGridIcon,
  ArrowDownIcon,
  ArrowUpIcon,
} from "@radix-ui/react-icons";
import { fetchFromAPI } from "../lib/api";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface TrendEntry {
  change: number;
  change_pct: number;
  current_price: number;
  date: string;
  day: string;
  past_price: number;
  pe: number | null;
  pe_change_pct: number | null;
}

export default function Trend() {
  const [trends, setTrends] = useState<TrendEntry[]>([]);
  const [viewMode, setViewMode] = useState<"card" | "table">("card");

  useEffect(() => {
    fetchFromAPI<{ message: string; result: TrendEntry[] }>("/performance").then(
      (res) => setTrends(res.result)
    );
  }, []);

  const formatChange = (value: number, pct: number) => {
    const isPositive = value >= 0;
    const Icon = isPositive ? ArrowUpIcon : ArrowDownIcon;
    return (
      <div className={`flex items-center text-sm font-medium ${isPositive ? "text-green-600" : "text-red-500"}`}>
        <Icon className="mr-1 h-4 w-4" />
        {value.toFixed(2)} ({pct.toFixed(2)}%)
      </div>
    );
  };

  const renderCards = (filteredData: TrendEntry[], color: "green" | "red") => (
    <div className="grid grid-cols-2 gap-2">
      {filteredData.map((entry, idx) => (
        <Card
          key={idx}
          className={`p-4 flex flex-col gap-2 text-sm border rounded-md shadow-sm ${
            color === "green" ? "bg-green-50" : "bg-red-50"
          }`}
        >
          <div className="text-base font-medium">{entry.date}</div>
          <div className="text-muted-foreground">{entry.day}</div>
          <div className="text-lg font-bold">${entry.current_price.toFixed(2)}</div>
          {formatChange(entry.change, entry.change_pct)}
        </Card>
      ))}
    </div>
  );

  return (
    <Card className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Trends</h2>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            onClick={() => setViewMode("card")}
            className={viewMode === "card" ? "bg-blue-100 text-blue-600" : ""}
          >
            <ViewGridIcon className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            onClick={() => setViewMode("table")}
            className={viewMode === "table" ? "bg-blue-100 text-blue-600" : ""}
          >
            <ListBulletIcon className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {viewMode === "card" ? (
        <div className="grid grid-cols-2 gap-2">
          {renderCards(trends.filter((t) => t.change_pct >= 0), "green")}
          {renderCards(trends.filter((t) => t.change_pct < 0), "red")}
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Time Ago</TableHead>
              <TableHead>Current Price</TableHead>
              <TableHead>Past Price</TableHead>
              <TableHead>Change</TableHead>
              <TableHead>PE Ratio</TableHead>
              <TableHead>PE Change %</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {trends.map((entry, idx) => (
              <TableRow key={idx}>
                <TableCell>{entry.date}</TableCell>
                <TableCell>{entry.day}</TableCell>
                <TableCell>${entry.current_price.toFixed(2)}</TableCell>
                <TableCell>${entry.past_price.toFixed(2)}</TableCell>
                <TableCell>{formatChange(entry.change, entry.change_pct)}</TableCell>
                <TableCell>{entry.pe !== null ? entry.pe.toFixed(2) : "--"}</TableCell>
                <TableCell>
                  {entry.pe_change_pct !== null
                    ? `${entry.pe_change_pct.toFixed(2)}%`
                    : "--"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Card>
  );
}
