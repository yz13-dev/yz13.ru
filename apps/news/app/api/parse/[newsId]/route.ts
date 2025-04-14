import { parseNewsAsHTML } from "@/lib/parse-news";
import { getArticle } from "rest-api/articles";

type ContextProps = {
  params: Promise<{
    newsId: string;
  }>
};
export async function GET(request: Request, ctx: ContextProps) {
  const { newsId } = await ctx.params;
  const { data } = await getArticle(newsId);
  if (data) {
    const parsed = await parseNewsAsHTML(data.source_id!);
    return Response.json(parsed);
  } else return Response.json(null);
}
