"use client";
import { ViewsChartSession } from "@/types/session";
import dayjs from "dayjs";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "mono/components/chart";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

const chartConfig = {
  label: {
    label: "Date",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

const Views = ({ views }: { views: ViewsChartSession }) => {
  return (
    <ChartContainer config={chartConfig}>
      <AreaChart accessibilityLayer data={views.chart.data}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="label"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => {
            return dayjs(value).format("DD-MM");
          }}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="line" />}
        />
        <Area
          dataKey="count"
          type="natural"
          fill="var(--color-label)"
          fillOpacity={0.4}
          stroke="var(--color-label)"
        />
      </AreaChart>
    </ChartContainer>
  );
};

export default Views;
