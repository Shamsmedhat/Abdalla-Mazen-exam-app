import * as React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Pie, PieChart, Label as RechartsLabel } from "recharts";

type TimerDonutProps = {
  totalSeconds: number;
  timeLeft: number;
};

export default function TimerDonut({
  totalSeconds,
  timeLeft,
}: TimerDonutProps) {
  //  Elapsed time
  const elapsed = totalSeconds - timeLeft;
  // Chart data
  const chartData = [
    { name: "Elapsed", value: elapsed, fill: `#DBEAFE` },
    { name: "Remaining", value: timeLeft, fill: `#155DFC` },
  ];

  return (
    <Card className="flex flex-col items-center justify-center border-none shadow-none">
      <CardHeader className="pb-2">
        {/*  Screen-reader-only title for accessibility */}
        <CardTitle className="text-center sr-only">Exam Timer</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-center">
        <ChartContainer
          config={{
            elapsed: { label: "Elapsed", color: "var(--chart-1)" },
            remaining: { label: "Remaining", color: "var(--chart-2)" },
          }}
          className="mx-auto aspect-square w-[60px] h-[60px]"
        >
          <PieChart width={60} height={60}>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              innerRadius={20}
              outerRadius={30}
              strokeWidth={3}
            >
              {/* countdown */}
              <RechartsLabel
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-[10px] font-bold"
                        >
                          {Math.floor(timeLeft / 60)}:
                          {String(timeLeft % 60).padStart(2, "0")}
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
