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

const Chart = ({ views = null }: { views?: ViewsChartSession | null }) => {
  const data = views && views.chart.data.length ? views.chart.data : chartData;
  return (
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
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="label"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    className="w-fit gap-2 p-2"
                    indicator="dashed"
                  />
                }
              />
              <Area
                dataKey="count"
                type="linear"
                fill="var(--color-visitors)"
                fillOpacity={0.4}
                stroke="var(--color-visitors)"
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default Chart;
