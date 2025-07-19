"use client";
import { Card } from "@/components/ui/card";
import { DmaEntry } from "./page";
import { Key } from "react";
interface DmaTableProps {
  dmaData: DmaEntry[];
}


export default function DmaTable({dmaData}: DmaTableProps) {


    const renderRow = (
        label: string,
        key: keyof DmaEntry,
        isPercent = false,
        colorize = false,
        reverseColor = false
    ) => (
        <tr className="text-sm">
            <td className="py-2 font-medium ">{label}</td>
            {dmaData.map((entry:DmaEntry, idx: Key) => {
                const value = entry[key];
                const num = typeof value === "string" ? parseFloat(value) : value;
                const formatted = value !== null && !isNaN(Number(num))
                    ? isPercent
                        ? `${Number(num).toFixed(2)}%`
                        : `$${Number(num).toFixed(2)}`
                    : "-";
                const color = colorize && value !== null
                    ? Number(num) > 0
                        ? reverseColor ? "text-red-500" : "text-green-600"
                        : reverseColor ? "text-green-600" : "text-red-500"
                    : "";
                return (
                    <td key={idx} className={`py-2 text-center ${color}`}>{formatted}</td>
                );
            })}
        </tr>
    );

    return (
        <Card className="p-4 ">
            <h4 className="text-lg font-semibold mb-4">Daily Moving Average (DMA)</h4>
            <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                    <thead>
                        <tr className="text-muted-foreground border-b">
                            <th className="py-2 text-left">Days</th>
                            {dmaData.map((entry:DmaEntry, idx:Key) => (
                                <th key={idx} className="text-center font-medium">
                                    {entry.day}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {renderRow("DMA Price", "dma_price")}
                        {renderRow("Date", "date", false)}
                        {renderRow("Upwards from CP", "upward_percent", true, true)}
                        {renderRow("Downwards CP", "downward_percent", true, true, true)}
                    </tbody>
                </table>
            </div>
        </Card>
    );
}
