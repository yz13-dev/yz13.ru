"use server";

import { API_URL } from "@/const/api";
import { Tables } from "yz13/supabase/database";

export const getNewsSources = async (
  code: string,
): Promise<Tables<"news_sources">[]> => {
  try {
    const url = new URL("/news/news-sources", API_URL);
    const searchParams = url.searchParams;
    searchParams.set("country_code", code);
    const response = await fetch(url.toString(), {
      method: "GET",
      next: {
        revalidate: 3600 * 6, // 6 hours,
        tags: ["news-sources"],
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getNewsSource = async (
  source_id: string,
): Promise<Tables<"news_sources"> | null> => {
  try {
    const url = new URL(`/news/news-sources/${source_id}`, API_URL);
    const response = await fetch(url.toString(), {
      method: "GET",
      next: {
        revalidate: 3600, // 1 hours,
        tags: [`news-source/${source_id}`],
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
