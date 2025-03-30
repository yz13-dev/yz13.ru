"use server";
import { API_URL } from "../../const/api";
import { type ParseRules } from "../../types/articles";

export const getNewsSourceParseRules = async (
  source_id: string,
): Promise<ParseRules | null> => {
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
    return data as ParseRules | null;
  } catch (error) {
    return null;
  }
};
