import { parseNewsFromSource } from "@/actions/parse-news/parse-news";
import dayjs from "dayjs";
import "dayjs/locale/ru";
import { Skeleton } from "mono/components/skeleton";

export const NewsSkeleton = () => {
  const items = Array.from({ length: 6 }).map((_, i) => i + 1);
  return (
    <div className="w-full grid md:grid-cols-2 grid-cols-1 gap-6">
      {items.map((item) => {
        return (
          <div className="w-full flex flex-col gap-3" key={item}>
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-4 w-1/2" />
            <div className="flex items-center gap-2 h-5">
              <Skeleton className="h-5 w-1/4" />
              <Skeleton className="h-5 w-1/4" />
            </div>
          </div>
        );
      })}
    </div>
  );
};

const News = async ({ sourceId }: { sourceId: string }) => {
  const list = await parseNewsFromSource(sourceId);
  return (
    <div className="w-full grid md:grid-cols-2 grid-cols-1 gap-6">
      {list.map((news) => {
        return (
          <div className="w-full flex flex-col gap-3" key={news.source}>
            <span className="text-base font-medium text-pretty">
              {news.title}
            </span>
            {news.description && (
              <span className="text-sm text-secondary">{news.description}</span>
            )}
            <div className="flex items-center gap-2 h-5">
              {news.author && (
                <span className="text-sm text-secondary">{news.author}</span>
              )}
              <span className="text-sm text-secondary capitalize">
                {dayjs(news.published_at)
                  .locale("ru")
                  .format("dddd, DD MMMM YYYY")}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default News;
