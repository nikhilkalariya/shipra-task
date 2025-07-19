"use client";
import { Card } from "@/components/ui/card";
import type { OverviewApiResponse } from "../component/Overviewnav";

export default function OverviewCards({ data }: { data: OverviewApiResponse }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 ">
      {Object.entries(data).filter(([key]) => key !== "closingPrices").map(([section, value]) => (
        <Card key={section} className="p-2 gap-1 ">
          <h4 className="font-semibold mb-2">{section}</h4>
          {typeof value === "object" && value !== null &&
            Object.entries(value).map(([k, v]) => (
              <p className=" flex justify-between text-xs border-b border-[#e2e2e2]" key={k}><span>{k}</span> <span>{v !== null ? `${v}` : "--"}</span></p>
            ))}
        </Card>
      ))}
    </div>
  );
}


  
