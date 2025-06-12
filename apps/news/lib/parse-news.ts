"use server";
import { NewsSource, parseNews } from "@/lib/parse-source";
import { getNewsSource } from "@yz13/api/sources";
import { NewArticle } from "@yz13/api/types/articles";

export const parseNewsFromSource = async (
  source_id: string,
): Promise<NewArticle[]> => {
  const { data: source } = await getNewsSource(source_id);
  if (!source) return [];
  const result: NewsSource = source;
  const parsedNews = await parseNews(result);
  return parsedNews;
};
