"use client";
import { Card } from "@/components/ui/card";
import { HighLowEntry } from "./page";



export default function HighLowStats({ statistics }: { statistics: HighLowEntry[] }) {
 

  return (
    <Card className="p-4">
      <h4 className="text-lg font-semibold mb-4">High Low Statistics</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statistics.map((entry) => (
          <div key={entry.week} className="border-r p-4 space-y-1">
            <p className="font-medium text-sm text-muted-foreground">{entry.week} Week</p>

            <div className="flex justify-between">
              <p className="text-sm text-red-500">${entry.low.toFixed(2)}</p>
              <p className="text-sm text-green-600">${entry.high.toFixed(2)}</p>
            </div>

            <div className="flex justify-between">
              <p className="text-xs text-red-500">{entry.lowPercentage}% downside</p>
              <p className="text-xs text-green-600">{entry.highPercentage}% upside</p>
            </div>

            <div className="h-1 w-full bg-gray-300 rounded mt-2 relative">
              <div
                className={`absolute h-full rounded ${entry.lowPercentage < 0 ? "bg-red-500" : "bg-green-500"}`}
                style={{
                  left: `${Math.min(Math.abs(entry.lowPercentage), 100)}%`,
                  width: `${Math.min(Math.abs(entry.highPercentage - entry.lowPercentage), 100)}%`
                }}
              />
            </div>
            <div className="flex justify-between mt-2 text-xs text-gray-500">
              <p>{entry.lowDate}</p>
              <p>{entry.highDate}</p>
            </div>

            <div className="flex justify-between text-xs text-gray-400">
              <p>{entry.lowDaysAgo} days ago</p>
              <p>{entry.highDaysAgo} days ago</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
