import { uploadArticle } from "@/actions/articles/articles";
import { parseNewsFromSource } from "@/actions/parse-news/parse-news";
import { getNewsSources } from "@/actions/sources/sources";
import { NextRequest, NextResponse } from "next/server";

type Props = {
  params: {
    code: string;
  };
};

export async function GET(request: NextRequest, ctx: Props) {
  const code = ctx.params.code;
  const sources = await getNewsSources(code);
  const news = sources.map((source) => parseNewsFromSource(source.id));
  const result = (await Promise.all(news)).flat();
  const uploaded = await Promise.all(
    result.map((article) => uploadArticle(article)),
  );
  return NextResponse.json(uploaded);
}
