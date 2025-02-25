"use client";
import dayjs from "dayjs";
import "dayjs/locale/ru";
import { Card, CardContent } from "mono/components/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "mono/components/chart";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { ChartData } from "./charts.store";

const chartConfig = {
  visitors: {
    color: "var(--chart-6)",
  },
} satisfies ChartConfig;

dayjs.locale("ru");

type ChartProps = {
  label?: string;
  presset?: "monthly" | "yearly" | "weekly" | "daily";
  data?: ChartData[];
};

const Chart = ({ label, data = [], presset = "monthly" }: ChartProps) => {
  return (
    <>
      <div className="w-full h-full">
        <Card className="w-full h-full bg-transparent rounded-none border-none p-0">
          <CardContent className="p-0">
            <ChartContainer config={chartConfig}>
              <AreaChart
                accessibilityLayer
                data={data}
                margin={{
                  left: 16,
                  right: 16,
                  top: 16,
                }}
              >
                <CartesianGrid
                  vertical={false}
                  horizontal={true}
                  stroke="var(--color-border)"
                />
                <XAxis
                  dataKey="label"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={5}
                  minTickGap={16}
                  tickFormatter={(value) =>
                    dayjs(value, "YYYY-MM")
                      .format("MMM")
                      .slice(0, 3)
                      .toUpperCase()
                  }
                />
                <ChartTooltip
                  animationDuration={250}
                  formatter={(value) => {
                    return `${label}: ${value}`;
                  }}
                  content={
                    <ChartTooltipContent
                      nameKey="label"
                      className="w-48 gap-2 p-2 "
                    />
                  }
                />
                <Area
                  dataKey="count"
                  type="monotone"
                  fill="var(--color-visitors)"
                  fillOpacity={0.2}
                  stroke="var(--color-visitors)"
                  strokeWidth={2}
                  dot={false}
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Chart;
