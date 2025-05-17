import { Article } from "rest-api/types/articles";
import NewsCard from "./news-card";

type NewsChunkProps = {
  articles?: Article[];
};
export default function NewsChunk({ articles = [] }: NewsChunkProps) {
  const firstArticles = articles.slice(0, 1);
  const restOfArticles = articles.slice(1);
  if (firstArticles.length === 0) return null;
  return (
    <div className="w-full grid gap-6 md:grid-cols-4 grid-cols-1 md:grid-rows-3 grid-rows-4">
      {firstArticles.map((article) => {
        return (
          <NewsCard
            key={article.id}
            article={article}
            showThumbnail
            className="row-span-full col-span-2"
          />
        );
      })}
      {restOfArticles.map((article) => {
        return (
          <NewsCard key={article.id} article={article} className="col-span-2" />
        );
      })}
    </div>
  );
}
