"use client";
import Trend from "./Trend";
import Peak from "./Peak";



export default function PerformancePage() {
 

  return (
    <div className="p-4">
      <div className="flex flex-col lg:flex-row gap-3">
        <Trend/>
        <Peak/>
      </div>
    </div>
  );
}
