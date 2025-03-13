"use server";

import { NewsSource, parseNews } from "@/lib/parse-source";
import { getNewsSourceParseRules } from "../parse-rules/parse-rules";
import { getNewsSource } from "../sources/sources";

export const parseNewsFromSource = async (source_id: string) => {
  // revalidateTag(`news-source/${source_id}`);
  // revalidateTag("parse-rules");
  // revalidateTag("news-sources");
  const [source, rules] = await Promise.all([
    getNewsSource(source_id),
    getNewsSourceParseRules(source_id),
  ]);
  if (!source || !rules) return [];
  const result: NewsSource = {
    ...source,
    parse_rules: rules,
  };
  return await parseNews(result);
};
