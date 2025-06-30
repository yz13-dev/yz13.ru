import { CalendarLocale, locales } from "@/const/locale-to-country";
import { GetV1NewsCountryCodeArticles200Item } from "@yz13/api/types";
import { cn } from "@yz13/ui/cn";
import { Badge } from "@yz13/ui/components/badge";
import { formatDistanceToNow, parseISO } from "date-fns";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { DotIcon, ExternalLinkIcon, ImageIcon } from "lucide-react";
import Link from "next/link";
import NewsImage from "./news-image";
dayjs.extend(relativeTime);

type Article = NonNullable<GetV1NewsCountryCodeArticles200Item>;

type NewsCardProps = {
  locale?: CalendarLocale;
  article: Article;
  showThumbnail?: boolean;
  className?: string;
};

const NewsThumbnail = ({ img }: { img: { url: string } | null }) => {
  const imgUrl = img?.url;
  if (!imgUrl) {
    return (
      <div className="!static max-h-64 aspect-[1200/630] rounded-2xl w-full h-full object-cover flex items-center justify-center border bg-card">
        <div className="size-12 flex items-center justify-center rounded-lg border bg-background">
          <ImageIcon size={24} />
        </div>
      </div>
    );
  }
  return (
    <NewsImage
      fill
      src={imgUrl}
      alt="Обложка новости"
      className="rounded-2xl max-h-64 aspect-[1200/630] h-full w-full"
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
  const sourceLink = article?.news_source?.url;
  const sourceName = article.news_source?.name;
  const publishedAt = formatDistanceToNow(parseISO(article.published_at), {
    addSuffix: true,
    locale: currentLocale,
  });

  const tags = article.tags ?? [];

  return (
    <article
      key={article.id}
      className={cn("w-full flex group/link flex-col gap-2 hover:bg-secondary/40 transition-colors", className)}
    >
      {showThumbnail && <NewsThumbnail img={img} />}
      {
        sourceLink &&
        <Link
          href={sourceLink}
          className="text-xs inline-flex text-muted-foreground hover:text-foreground transition-colors items-center gap-1.5 font-medium"
        >
          {sourceName}
          <ExternalLinkIcon size={12} />
        </Link>
      }
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
      <div className="flex flex-wrap items-start gap-1">
        {

        }
        {
          tags.map(tag => {
            return <Badge key={`${article.id}/${tag}`} variant="secondary">{tag}</Badge>
          })
        }
      </div>
      <div className="*:inline space-x-2 mt-auto">
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
