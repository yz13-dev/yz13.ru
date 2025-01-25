"use client";
import { ViewsChartSession } from "@/types/session";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "mono/components/chart";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

const chartConfig = {
  created_at: {
    label: "Created at",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

const Views = ({ views = [] }: { views: ViewsChartSession[] }) => {
  return (
    <ChartContainer config={chartConfig}>
      <AreaChart
        accessibilityLayer
        data={views}
        margin={{
          left: 12,
          right: 12,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="user_id"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="line" />}
        />
        <Area
          dataKey="created_at"
          type="natural"
          fill="var(--color-desktop)"
          fillOpacity={0.4}
          stroke="var(--color-desktop)"
        />
      </AreaChart>
    </ChartContainer>
  );
};

export default Views;
