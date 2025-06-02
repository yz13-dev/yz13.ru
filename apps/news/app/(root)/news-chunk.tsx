import { CalendarLocale } from "@/const/locale-to-country";
import { Article } from "rest-api/types/articles";
import NewsCard from "./news-card";

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
      <div className="w-full grid gap-6 md:grid-cols-4 grid-cols-1">
        {articles.map((article) => {
          return (
            <NewsCard
              key={article.id}
              article={article}
              locale={locale}
              className="col-span-2"
            />
          );
        })}
      </div>
    )
  }
  return (
    <div className="w-full grid gap-6 md:grid-cols-4 grid-cols-1 md:grid-rows-3 grid-rows-4">
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
      {restOfArticles.map((article) => {
        return (
          <NewsCard
            key={article.id}
            article={article}
            locale={locale}
            className="col-span-2"
          />
        );
      })}
    </div>
  );
}
