import { getNewsSourceParseRules } from "@/actions/parse-rules/parse-rules";
import { getNewsSource } from "@/actions/sources/sources";
import { NewsSource, parseNews } from "@/lib/parse-source";

type Props = {
  params: {
    source_id: string;
  };
};

export async function GET(req: Request, ctx: Props) {
  const source_id = ctx.params.source_id;
  // revalidateTag(`news-source/${source_id}`);
  // revalidateTag("parse-rules");
  // revalidateTag("news-sources");
  const [source, rules] = await Promise.all([
    getNewsSource(source_id),
    getNewsSourceParseRules(source_id),
  ]);
  if (!source || !rules) return Response.json(null);
  const result: NewsSource = {
    ...source,
    parse_rules: rules,
  };
  return Response.json(await parseNews(result));
}
