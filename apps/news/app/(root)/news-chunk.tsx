import { CalendarLocale } from "@/const/locale-to-country";
import { GetV1NewsCountryCodeArticles200Item } from "@yz13/api/types";
import { cn } from "@yz13/ui/cn";
import NewsCard from "./news-card";

type Article = NonNullable<GetV1NewsCountryCodeArticles200Item>;

type NewsChunkProps = {
  articles?: Article[];
  locale?: CalendarLocale;
};
export default function NewsChunk({
  articles = [],
  locale = "en",
}: NewsChunkProps) {
  const firstArticle = articles.find((article) => article.img);
  const articlesHasNoThumbnail = articles.every(article => !article.img);
  const restOfArticles = articles.filter(article => article.id !== firstArticle?.id)
  if (articlesHasNoThumbnail) {
    return (
      <div className={cn(
        "w-full grid divide-x divide-y *:p-4 md:grid-cols-4 grid-cols-1 overflow-hidden",
        "[&>article]:last:border-r [&>article]:last:border-b"
      )}>
        <List list={articles} locale={locale} />
      </div>
    )
  }
  return (
    <div className={cn(
      "w-full grid *:p-4 divide-x divide-y md:grid-cols-4 grid-cols-1 md:grid-rows-3 grid-rows-4 overflow-hidden",
      "[&>article]:last:border-r [&>article]:last:border-b"
    )}>
      {
        firstArticle &&
        <NewsCard
          key={firstArticle.id}
          article={firstArticle}
          showThumbnail
          locale={locale}
          className="row-span-full col-span-2"
        />
      }
      <List list={restOfArticles} locale={locale} />
    </div>
  );
}


function List({ list = [], locale = "ru" }: { list?: Article[], locale?: CalendarLocale }) {
  return list.map((article) => {
    return (
      <NewsCard
        key={article.id}
        article={article}
        locale={locale}
        className="col-span-2"
      />
    );
  })
}
