"use server"
import { customFetch } from "@/const/fetch"
import type { MonthlyNewsCountChart } from "@/types/charts"




export const getNewsCountForSixMonths = async () => {
  return await customFetch<MonthlyNewsCountChart[]>("/charts/news")
}
