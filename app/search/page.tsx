import { getNewsV1Search, getPinsV1PinsSearch } from "@yz13/api";
import { Badge } from "@yz13/ui/badge";
import { formatDistanceToNow } from "date-fns";
import { ru } from "date-fns/locale";
import { ExternalLinkIcon } from "lucide-react";
import Link from "next/link";
import { Logo } from "../components/logo";
import SearchInput from "../components/search-input";
import User from "../components/user";


type Props = {
  searchParams: Promise<{
    q: string;
  }>
}
export default async function ({ searchParams }: Props) {

  const { q } = await searchParams;

  console.log("q", q);

  const news = await getNewsV1Search({ q: q || "" });
  const pins = await getPinsV1PinsSearch({ q: q || "" });

  return (
    <>
      <header className="w-full flex lg:pl-56 pl-6 pr-6 pt-4 items-center *:h-full justify-between">
        <div className="w-full flex items-center gap-6">
          <Link href="/" className="lg:absolute static left-6">
            <Logo type="full" className="shrink-0" />
          </Link>
          <SearchInput className="max-w-2xl w-full lg:block hidden" defaultQuery={q} />
        </div>
        <div className="w-fit flex items-center justify-end">
          <User />
        </div>
      </header>
      <div className="px-6 lg:hidden block pt-6">
        <SearchInput className="max-w-2xl w-full" defaultQuery={q} />
      </div>
      <div className="lg:pl-56 pl-6 pt-12 pr-6 pb-12">
        {
          news.map(article => {

            const author = article.author;
            const sourceLink = article.news_source?.url;
            const sourceName = article.news_source?.name;

            const published_at = new Date(article.published_at);
            return (
              <article key={article.id} className="py-4 space-y-4 max-w-2xl w-full">
                <div className="space-y-1 *:block">
                  <h3 className="text-lg font-medium">{article.title}</h3>
                  <p>{article.description || article.content}</p>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    {
                      author &&
                      <span className="text-xs text-muted-foreground">{author}</span>
                    }
                    {
                      sourceLink &&
                      <Link
                        href={sourceLink}
                        target="_blank"
                        className="text-xs hover:underline inline-flex items-center gap-1 text-muted-foreground"
                      >
                        {sourceName}
                        <ExternalLinkIcon size={12} />
                      </Link>
                    }
                  </div>
                  <Badge variant="secondary">{formatDistanceToNow(published_at, { locale: ru, addSuffix: true })}</Badge>
                </div>
              </article>
            )
          })
        }
      </div>
    </>
  )
}
