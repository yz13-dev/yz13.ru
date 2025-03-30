"use server";
import { customFetch } from "@/const/fetch";
import type { ViewsChartSession } from "@/types/session";

export const viewsChart = async () => {
  return await customFetch<ViewsChartSession | null>("/charts/views", {
    method: "GET",
  });
};

export const halfYearViewsChart = async () => {
  return await customFetch<ViewsChartSession | null>(
    "/charts/views/half-year",
    {
      method: "GET",
    },
  );
};
