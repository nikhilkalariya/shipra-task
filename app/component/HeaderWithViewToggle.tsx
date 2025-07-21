"use client";

import { Button } from "@/components/ui/button";
import { ListBulletIcon, ViewGridIcon } from "@radix-ui/react-icons";

interface HeaderWithViewToggleProps {
  title: string;
  viewMode: "table" | "card";
  setViewMode: (mode: "table" | "card") => void;
}

export default function HeaderWithViewToggle({
  title,
  viewMode,
  setViewMode
}: HeaderWithViewToggleProps) {
  return (
    <div className="flex justify-between items-center">
      <h2 className="text-base font-semibold">{title}</h2>
      <div className="flex gap-2">
        <Button
          variant="ghost"
          onClick={() => setViewMode("table")}
          className={viewMode === "table" ? "bg-blue-100 text-blue-600" : ""}
        >
          <ListBulletIcon className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          onClick={() => setViewMode("card")}
          className={viewMode === "card" ? "bg-blue-100 text-blue-600" : ""}
        >
          <ViewGridIcon className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
