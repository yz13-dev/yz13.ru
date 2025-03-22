import { getCountryCodes } from "@/actions/codes/codes";
import { parseNewsFromSource } from "@/actions/parse-news/parse-news";
import { getNewsSources } from "@/actions/sources/sources";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const codes = await getCountryCodes();
  const fetchedSources = await Promise.all(
    codes.map((code) => getNewsSources(code)),
  );
  const news = fetchedSources
    .flat()
    .map((source) => parseNewsFromSource(source.id));
  const result = (await Promise.all(news)).flat();
  return NextResponse.json(result);
}
