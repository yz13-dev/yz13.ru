import { Article } from "rest-api/types/articles";
import dayjs from "dayjs";
import {
  ArrowRightIcon,
  CalendarIcon,
  ExternalLinkIcon,
  ImageIcon,
  UserIcon,
} from "lucide-react";
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
      {showThumbnail ? (
        news.img ? (
          <Image
            fill
            src={imageUrl}
            alt="Обложка новости"
            className="!static block max-h-[200] rounded-2xl w-full h-full object-cover"
          />
        ) : (
          <div className="!static max-h-[200] rounded-2xl w-full h-full object-cover flex items-center justify-center border bg-background-secondary">
            <div className="size-12 flex items-center justify-center rounded-lg border bg-background">
              <ImageIcon size={24} />
            </div>
          </div>
        )
      ) : null}
      {false && (
        <Link
          href={news.url}
          className="text-xs flex items-center gap-2 text-secondary"
        >
          Источник
          <ExternalLinkIcon size={12} />
        </Link>
      )}
      <span className="text-base font-medium text-pretty">{news.title}</span>
      {news.description && (
        <span className="text-sm text-secondary">{news.description}</span>
      )}
      <div className="flex items-center justify-between mt-auto">
        <div className="flex flex-col gap-1.5">
          {news.author && (
            <div className="flex text-secondary items-center gap-1">
              <div className="flex items-center justify-center size-4">
                <UserIcon size={16} className="shrink-0" />
              </div>
              <span className="text-sm">{news.author}</span>
            </div>
          )}
          <div className="flex text-secondary items-center gap-1">
            <div className="flex items-center justify-center size-4">
              <CalendarIcon size={news.author ? 14 : 16} className="shrink-0" />
            </div>
            <time
              dateTime={news.published_at}
              className={cn(
                " text-secondary capitalize",
                news.author ? "text-xs" : "text-sm",
              )}
            >
              {dayjs(news.published_at)
                .locale("ru")
                .format("dddd, DD MMMM YYYY")}
            </time>
          </div>
        </div>
        <Link
          target="_blank"
          href={news.url}
          className="text-sm flex items-center gap-1 group/link hover:text-foreground transition-colors text-secondary"
        >
          <span>Читать</span>
          <ArrowRightIcon
            size={16}
            className="group-hover/link:-rotate-45 transition-transform"
          />
        </Link>
      </div>
    </div>
  );
};

export default NewsCard;
