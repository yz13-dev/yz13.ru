"use client";
import { ViewsChartSession } from "@/types/session";
import { Card, CardContent } from "mono/components/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "mono/components/chart";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { getTotalViews } from "../workspace/analytics/views-chart";

const chartData = [
  { label: "Сентябрь", count: 0 },
  { label: "Октябрь", count: 25 },
  { label: "Ноябрь", count: 150 },
  { label: "Декабрь", count: 200 },
  { label: "Январь", count: 235 },
  { label: "Февраль", count: 155 },
];

const chartConfig = {
  visitors: {
    label: "Посетители",
    color: "var(--chart-6)",
  },
} satisfies ChartConfig;

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
        <span className="text-secondary text-base block">
          {chartViews
            ? `Всего ${(getTotalViews(views) ?? 0).toLocaleString()} просмотров`
            : "Общее кол-во просмотров за 6 месяцев"}
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
                <CartesianGrid vertical={true} horizontal={true} />
                <XAxis
                  dataKey="label"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={4}
                  minTickGap={32}
                  tickFormatter={(value) => {
                    return value.slice(0, 3);
                  }}
                />
                <ChartTooltip
                  cursor={false}
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
