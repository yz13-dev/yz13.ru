"use client"
import { getNewsCountForSixMonths } from "@yz13/api/charts"
import type { MonthlyNewsCountChart } from "@yz13/api/types/charts"
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@yz13/ui/components/chart"
import { Skeleton } from "@yz13/ui/components/skeleton"
import { useEffect, useState } from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

const chartConfig = {
  news: {
    label: "Новостей",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig;

export default function () {

  const [data, setData] = useState<MonthlyNewsCountChart[]>([])

  useEffect(() => {
    getNewsCountForSixMonths()
      .then(({ data }) => {
        console.log(data ?? [])
        setData(data ?? [])
      })
  }, [])
  if (!data.length) return <Skeleton className="h-[400px] rounded-none shrink-0" />
  return (
    <ChartContainer config={chartConfig} className="h-[400px] aspect-auto">
      <AreaChart
        accessibilityLayer
        data={data}
      // margin={{
      // left: 12,
      // right: 12,
      // }}
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
          cursor={true}
          content={<ChartTooltipContent indicator="line" className="capitalize" />}
        />
        <Area
          dataKey="count"
          type="natural"
          fill="var(--color-news)"
          fillOpacity={0.4}
          stroke="var(--color-news)"
        />
      </AreaChart>
    </ChartContainer>
  )
}
