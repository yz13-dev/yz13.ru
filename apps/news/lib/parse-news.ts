"use server";
import { NewsSource, parseNews } from "@/lib/parse-source";
import { NewArticle } from "rest-api/types/articles";
import { getNewsSourceParseRules } from "rest-api/parse-rules";
import { getNewsSource } from "rest-api/sources";

export const parseNewsFromSource = async (
  source_id: string,
): Promise<NewArticle[]> => {
  const [{ data: source }, { data: rules }] = await Promise.all([
    getNewsSource(source_id),
    getNewsSourceParseRules(source_id),
  ]);
  if (!source || !rules) return [];
  const result: NewsSource = {
    ...source,
    parse_rules: rules,
  };
  const parsedNews = await parseNews(result);
  return parsedNews;
};
