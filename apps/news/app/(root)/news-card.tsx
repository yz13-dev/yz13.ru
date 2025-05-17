import { CalendarLocale, locales } from "@/const/locale-to-country";
import { formatDistanceToNow, parseISO } from "date-fns";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { DotIcon, ExternalLinkIcon, ImageIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Article } from "rest-api/types/articles";
import { cn } from "yz13/cn";
dayjs.extend(relativeTime);

type NewsCardProps = {
  locale?: CalendarLocale;
  article: Article;
  showThumbnail?: boolean;
  className?: string;
};

const NewsThumbnail = ({ img }: { img: { url: string } | null }) => {
  const imgUrl = img?.url;
  if (!imgUrl)
    return (
      <div className="!static rounded-2xl w-full h-full object-cover flex items-center justify-center border bg-background-secondary">
        <div className="size-12 flex items-center justify-center rounded-lg border bg-background">
          <ImageIcon size={24} />
        </div>
      </div>
    );
  else
    return (
      <Image
        fill
        src={imgUrl}
        alt="Обложка новости"
        className="!static block rounded-2xl w-full h-full object-cover"
      />
    );
};

const NewsCard = ({
  className = "",
  article,
  showThumbnail = false,
  locale = "en",
}: NewsCardProps) => {
  const currentLocale = locales[locale];
  const img = article ? (article.img as { url: string }) : null;
  const sourceLink = article.news_source?.url;
  const sourceName = article.news_source?.name;
  const publishedAt = formatDistanceToNow(parseISO(article.published_at), {
    addSuffix: true,
    locale: currentLocale,
  });
  return (
    <article
      key={article.id}
      className={cn("w-full flex group/link flex-col gap-3", className)}
    >
      {showThumbnail && <NewsThumbnail img={img} />}
      {false && (
        <Link
          href={article.url}
          className="text-xs flex items-center gap-2 text-foreground"
        >
          Источник
          <ExternalLinkIcon size={12} />
        </Link>
      )}
      <Link
        href={sourceLink}
        className="text-xs inline-flex items-center gap-1.5 font-medium"
      >
        {sourceName}
        <ExternalLinkIcon size={12} />
      </Link>
      <Link
        href={article.url}
        target="_blank"
        className="text-base font-medium group-hover/link:underline text-pretty"
      >
        {article.title}
      </Link>
      {article.description && (
        <span className="text-sm text-muted-foreground">
          {article.description}
        </span>
      )}
      <div className="flex items-center justify-start gap-0">
        <time
          dateTime={article.published_at}
          className="capitalize text-xs text-muted-foreground"
        >
          {publishedAt}
        </time>
        {article.author && (
          <>
            <DotIcon size={12} className="shrink-0" />
            <span className="text-xs text-muted-foreground">
              Автор: {article.author}
            </span>
          </>
        )}
      </div>
    </article>
  );
};

export default NewsCard;
