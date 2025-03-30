"use server";
import { API_URL } from "../../const/api";
import type { ViewsChartSession } from "../../types/session";

export const viewsChart = async (): Promise<ViewsChartSession | null> => {
  try {
    const url = new URL(`/charts/views`, API_URL);
    const res = await fetch(url.toString(), {
      method: "GET",
      next: { revalidate: 3600, tags: ["views", "chart"] },
    });
    if (!res.ok) throw new Error("Failed to fetch views chart");
    const data = await res.json();
    return data as ViewsChartSession | null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const halfYearViewsChart =
  async (): Promise<ViewsChartSession | null> => {
    try {
      const url = new URL(`/charts/views/half-year`, API_URL);
      const res = await fetch(url.toString(), {
        method: "GET",
        next: { revalidate: 3600, tags: ["views", "chart"] },
      });
      if (!res.ok) throw new Error("Failed to fetch views chart");
      const data = await res.json();
      return data as ViewsChartSession | null;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
