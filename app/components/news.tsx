import { getNewsV1Recent } from "@yz13/api";
import Link from "next/link";
import Favicon from "./favicon";
import { Badge } from "@yz13/ui/badge";
import { ExternalLinkIcon } from "lucide-react";
import { Skeleton } from "@yz13/ui/skeleton";
import { formatDistanceToNow } from "date-fns";
import { ru } from "date-fns/locale";

export default async function () {
  const news = await getNewsV1Recent();
  return (
    <ul>
      {news.map((article) => {
        const source = article.news_source as {
          name: string;
          url: string;
        };
        const name = source.name;
        const date = new Date(article.published_at);

        const source_url = source.url;
        const url = article.url;

        return (
          <li
            key={article.id}
            className="w-full cursor-pointer group justify-between flex items-center gap-2 py-2"
          >
            <div className="flex items-center gap-2 max-w-[75%] relative">
              <Link href={url} className="absolute inset-0" />
              <div className="size-5 rounded-full shrink-0 border flex items-center justify-center bg-transparent">
                <Favicon url={source_url} size={18} />
              </div>
              <span className="text-sm line-clamp-1 group-hover:underline">
                {article.title}
              </span>
            </div>
            <span className="dashed-line" />
            {process.env.NODE_ENV === "development" && (
              <Badge variant="outline">
                {formatDistanceToNow(date, { addSuffix: true, locale: ru })}
              </Badge>
            )}
            <Badge variant="outline" asChild>
              <Link href={source_url}>
                {name}
                <ExternalLinkIcon />
              </Link>
            </Badge>
          </li>
        );
      })}
    </ul>
  );
}

export const NewsLoading = () => {
  return (
    <ul>
      <li className="py-2">
        <Skeleton className="h-5 w-full" />
      </li>
      <li className="py-2">
        <Skeleton className="h-5 w-full" />
      </li>
      <li className="py-2">
        <Skeleton className="h-5 w-full" />
      </li>
      <li className="py-2">
        <Skeleton className="h-5 w-full" />
      </li>
      <li className="py-2">
        <Skeleton className="h-5 w-full" />
      </li>
    </ul>
  );
};
