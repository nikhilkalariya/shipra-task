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
import { fetchFromAPI } from "../utils/api";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import HeaderWithViewToggle from "../component/HeaderWithViewToggle";

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
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    setLoading(true)
    fetchFromAPI<{ message: string; result: TrendEntry[] }>("/performance")
      .then((res) => setTrends(res.result))
      .finally(() => setLoading(false))
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
    <div className="grid grid-cols-2 gap-2 content-baseline">
      {filteredData.map((entry, idx) => (
        <Card
          key={idx}
          className={`p-2 flex h-38 sm:h-38 md:h-40 lg:h-44 xl:h-32 flex-col gap-2 text-sm border rounded-md shadow-sm ${color === "green" ? "bg-green-50" : "bg-red-50"
            }`}
        >
          <div className="text-sm font-semibold">{entry.date}</div>
          <div className="text-muted-foreground">{entry.day}</div>
          <div className="text-sm font-semibold">${entry.current_price.toFixed(2)}</div>
          {formatChange(entry.change, entry.change_pct)}
        </Card>
      ))}
    </div>
  );

  return (
    <div className=" w-full lg:w-2/4">
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500" />
        </div>
      ) : viewMode === "card" ? (
        <>
          <Card className="p-4">
            <HeaderWithViewToggle title="Trends" viewMode={viewMode} setViewMode={setViewMode} />
            <div className="grid grid-cols-2 gap-2">
              {renderCards(trends.filter((t) => t.change_pct >= 0), "green")}
              {renderCards(trends.filter((t) => t.change_pct < 0), "red")}
            </div>
          </Card>
        </>
      ) : (
        <>
          <HeaderWithViewToggle title="Trends" viewMode={viewMode} setViewMode={setViewMode} />
          <Table>
            <TableHeader className="bg-[#f9f9f9]">
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Current Price</TableHead>
                <TableHead>Past Price</TableHead>
                <TableHead>Change</TableHead>
                <TableHead>PE</TableHead>
                <TableHead>PE % Change</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {trends.map((entry, idx) => (
                <TableRow key={idx}>
                  <TableCell>{entry.date}</TableCell>
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
        </>
      )}
    </div>
  );
}
