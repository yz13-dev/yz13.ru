import { Article } from "rest-api/types/articles";
import dayjs from "dayjs";
import { ExternalLinkIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "yz13/cn";

type NewsCardProps = {
  news: Article;
  showThumbnail?: boolean;
};
const NewsCard = ({ news, showThumbnail = false }: NewsCardProps) => {
  const imageUrl = (news.img as { url: string })?.url;
  return (
    <div key={news.id} className="w-full flex flex-col gap-3">
      {news.img && showThumbnail && (
        <Image
          fill
          src={imageUrl}
          alt="Обложка новости"
          className="!static block max-h-[200] rounded-2xl w-full h-full object-cover"
        />
      )}
      <Link
        href={news.url}
        className="text-xs flex items-center gap-2 text-secondary"
      >
        Источник
        <ExternalLinkIcon size={12} />
      </Link>
      <span className="text-base font-medium text-pretty">{news.title}</span>
      {news.description && (
        <span className="text-sm text-secondary">{news.description}</span>
      )}
      <div className="flex flex-col gap-1">
        <span
          className={cn(
            " text-secondary capitalize",
            news.author ? "text-xs" : "text-sm",
          )}
        >
          {dayjs(news.published_at).locale("ru").format("dddd, DD MMMM YYYY")}
        </span>
        {news.author && (
          <span className="text-sm text-secondary">{news.author}</span>
        )}
      </div>
    </div>
  );
};

export default NewsCard;
