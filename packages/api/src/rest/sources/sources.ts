"use server";
import { customFetch } from "@/const/fetch";
import { NewsSource } from "@/types/articles";

export const getNewsSources = async (code: string) => {
  return await customFetch<NewsSource[]>(
    `/news/news-sources?country_code=${code}`,
    {
      method: "GET",
    },
  );
};

export const getNewsSource = async (source_id: string) => {
  return await customFetch<NewsSource | null>(
    `/news/news-sources/${source_id}`,
    {
      method: "GET",
    },
  );
};
