"use client";
import { ViewsChartSession } from "@/types/session";
import dayjs from "dayjs";
import { Card, CardContent } from "mono/components/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "mono/components/chart";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

const chartData = [
  { label: "2024-09", count: 0 },
  { label: "2024-10", count: 25 },
  { label: "2024-11", count: 150 },
  { label: "2024-12", count: 200 },
  { label: "2025-01", count: 235 },
  { label: "2025-01", count: 155 },
];

const chartConfig = {
  visitors: {
    label: "Посетители",
    color: "var(--chart-6)",
  },
} satisfies ChartConfig;

dayjs.locale("ru");

const Chart = ({
  views = null,
  chartViews = false,
}: {
  chartViews?: boolean;
  views?: ViewsChartSession | null;
}) => {
  const data = views && views.chart.data.length ? views.chart.data : chartData;
  return (
    <>
      <div className="absolute top-4 left-4 flex flex-col gap-1">
        <span className="text-foreground/80 text-2xl block font-medium">
          Просмотры
        </span>
      </div>
      <div className="w-full h-full aspect-video">
        <Card className="w-full h-full bg-transparent rounded-none border-none p-0">
          <CardContent className="p-0">
            <ChartContainer config={chartConfig}>
              <AreaChart
                accessibilityLayer
                data={data}
                margin={{
                  left: 0,
                  right: 0,
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
                  tickMargin={4}
                  minTickGap={32}
                  tickFormatter={(value) => {
                    return dayjs(value, "YYYY-MM").format("MMM").toUpperCase();
                  }}
                />
                <ChartTooltip
                  animationDuration={250}
                  formatter={(value) => {
                    return `Посетители: ${value}`;
                  }}
                  content={
                    <ChartTooltipContent
                      nameKey="visitors"
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
