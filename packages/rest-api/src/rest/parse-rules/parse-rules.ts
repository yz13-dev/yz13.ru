"use server";
import { customFetch } from "@/const/fetch";
import { type ParseRules } from "@/types/articles";

export const getNewsSourceParseRules = async (source_id: string) => {
  return await customFetch<ParseRules | null>(
    `/news/parse-rules/${source_id}`,
    {
      method: "GET",
    },
  );
};
