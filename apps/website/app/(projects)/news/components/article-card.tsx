import { GetNewsV1Last200Item } from "@yz13/api/types";
import { Badge } from "@yz13/ui/badge";
import { ExternalLinkIcon } from "@yz13/ui/icons";
import { InputGroupButton } from "@yz13/ui/input-group";
import { Skeleton } from "@yz13/ui/skeleton";
import { formatRelative } from "date-fns";
import { ru } from "date-fns/locale";
import Link from "next/link";
import Favicon from "./favicon";



export default function ArticleCard({ article }: { article: GetNewsV1Last200Item }) {

  const sourceUrl = new URL(article.url);

  return (
    <article className="w-full">
      <Link href={`https://${sourceUrl.hostname}`} target="_blank" className="flex items-center group/source">
        <Favicon url={article.url} size={16} />
        <span className="text-sm text-muted-foreground pl-2 pr-1 group-hover/source:underline">{sourceUrl.hostname}</span>
        <ExternalLinkIcon size={12} />
      </Link>
      <div className="py-4">
        <div className="*:block pb-4">
          <h4 className="text-2xl font-medium">{article.title}</h4>
          <p className="text-lg text-muted-foreground">{article.description}</p>
        </div>
        <InputGroupButton variant="outline" className="w-fit" asChild>
          <Link href={article.url} target="_blank">
            <span>Читать далее</span>
            <ExternalLinkIcon />
          </Link>
        </InputGroupButton>
      </div>
      <div className="flex items-center gap-3">
        <time
          dateTime={article.published_at}
          className="text-muted-foreground text-sm"
        >
          {formatRelative(new Date(article.published_at), new Date(), { locale: ru })}
        </time>
        <div className="flex items-center gap-2 *:h-5">
          {
            article.authors.map(author => {
              return (
                <Badge key={`${article.id}/${author}`} variant="secondary">{author}</Badge>
              )
            })
          }
        </div>
      </div>
    </article>
  )
}

export const ArticleCardSkeleton = () => {
  return (
    <article className="w-full">
      <div className="flex items-center">
        <Skeleton className="size-4" />
        <div className="pl-2 pr-1">
          <Skeleton className="h-4 w-20" />
        </div>
        <ExternalLinkIcon size={12} />
      </div>
      <div className="py-4">
        <div className="pb-4">
          <Skeleton className="w-1/2 h-8" />
        </div>
        <Skeleton className="w-36 h-6" />
      </div>
      <div className="flex items-center gap-3">
        <Skeleton className="w-24 h-5" />
        <div className="flex items-center gap-2 *:h-5">
          <Skeleton className="w-16 h-5" />
          <Skeleton className="w-16 h-5" />
          <Skeleton className="w-16 h-5" />
        </div>
      </div>
    </article>
  )
}
