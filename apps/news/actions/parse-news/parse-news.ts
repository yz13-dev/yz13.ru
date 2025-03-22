"use server";

import { NewsSource, parseNews } from "@/lib/parse-source";
import { NewArticle } from "@/types/news";
import { getNewsSourceParseRules } from "../parse-rules/parse-rules";
import { getNewsSource } from "../sources/sources";

export const parseNewsFromSource = async (
  source_id: string,
): Promise<NewArticle[]> => {
  const [source, rules] = await Promise.all([
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
