import { createClient } from "@yz13/supabase/server";
import { format, formatISO } from "date-fns";
import { ru } from "date-fns/locale/ru";
import { cookies } from "next/headers";
import type { ChartDataPoint } from "@/schemas/charts";

export const getNewsCountForSixMonths = async (): Promise<ChartDataPoint[]> => {
  const months = 6

  const currentDate = new Date()
  const currentMonth = currentDate.getMonth()
  const startMonth = currentMonth - months
  const endMonth = currentMonth

  const ranges = []

  for (let i = startMonth; i <= endMonth; i++) {
    const start = new Date(currentDate.getFullYear(), i, 1)
    const end = new Date(currentDate.getFullYear(), i + 1, 1)
    ranges.push({ month: start.getMonth(), start, end, label: format(start, "LLLL", { locale: ru }) })
  }

  if (ranges.length === 0) return []
  return await Promise.all(ranges.map(async ({ start, end, label, month }) => {
    const count = await getNewsCount(start, end)
    return {
      label, month, count
    }
  }))
}

export const getNewsCountForYear = async (): Promise<ChartDataPoint[]> => {
  const months = 12

  const currentDate = new Date()
  const currentMonth = currentDate.getMonth()
  const startMonth = currentMonth - months
  const endMonth = currentMonth

  const ranges = []

  for (let i = startMonth; i <= endMonth; i++) {
    const start = new Date(currentDate.getFullYear(), i, 1)
    const end = new Date(currentDate.getFullYear(), i + 1, 1)
    ranges.push({ month: start.getMonth(), start, end, label: format(start, "LLLL", { locale: ru }) })
  }

  if (ranges.length === 0) return []
  return await Promise.all(ranges.map(async ({ start, end, label, month }) => {
    const count = await getNewsCount(start, end)
    return {
      label, month, count
    }
  }))
}

export const getNewsCount = async (start: Date, end: Date): Promise<number> => {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore)

  const { count } = await supabase
    .from("news")
    .select("*", { count: "exact" })
    .gte("published_at", formatISO(start))
    .lte("published_at", formatISO(end))

  return count ?? 0;
} 