"use server";
import { API_URL } from "@/const/api";
import { Tables } from "yz13/supabase/database";

export const getNewsSourceParseRules = async (
  source_id: string,
): Promise<Tables<"parse_rules"> | null> => {
  try {
    const url = new URL(`/news/parse-rules/${source_id}`, API_URL);
    const response = await fetch(url.toString(), {
      method: "GET",
      next: {
        revalidate: 3600, // 1 hours,
        tags: ["news-sources", "parse-rules"],
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return null;
  }
};
