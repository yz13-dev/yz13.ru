"use server";
import { parseNews } from "@/lib/parse-source";
import { getV1NewsNewsSourcesSourceId } from "@yz13/api";

export const parseNewsFromSource = async (
  source_id: string,
) => {
  const source = await getV1NewsNewsSourcesSourceId(source_id);
  if (!source) return [];
  const result = source;
  const parsedNews = await parseNews(result);
  return parsedNews;
};
