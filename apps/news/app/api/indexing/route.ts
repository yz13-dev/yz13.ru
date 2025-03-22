import { getCountryCodes } from "@/actions/codes/codes";
import { parseNewsFromSource } from "@/actions/parse-news/parse-news";
import { getNewsSources } from "@/actions/sources/sources";
import { NewsSource } from "@/types/news";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const codes = await getCountryCodes();

  // return NextResponse.json(codes);
  const sources: NewsSource[] = (
    await Promise.all(codes.map((code) => getNewsSources(code)))
  ).flat();

  const articles = (
    await Promise.all(sources.map((source) => parseNewsFromSource(source.id)))
  ).flat();

  return NextResponse.json(articles);
}
