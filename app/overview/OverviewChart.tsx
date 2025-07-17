"use client";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { TrendingUp } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface ClosingPrice {
  time: string;
  value: number;
}

const chartConfig = {
  value: {
    label: "Closing Price",
    color: "#22c55e",
  },
} satisfies ChartConfig;

export default function OverviewChart({ prices }: { prices: ClosingPrice[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Closing Price Trend</CardTitle>
        <CardDescription>
          Historical chart of closing prices over time
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            data={prices}
            margin={{ left: 12, right: 12 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="time"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(v) => v.slice(5)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" hideLabel />}
            />
            <Area
              dataKey="value"
              type="linear"
              fill="var(--color-value)"
              fillOpacity={0.4}
              stroke="var(--color-value)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 leading-none font-medium">
              Trending up over the long term <TrendingUp className="h-4 w-4" />
            </div>
            <div className="text-muted-foreground">Since IPO launch</div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}