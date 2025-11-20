import { getNewsV1Recent } from "@yz13/api";
import { Skeleton } from "@yz13/ui/skeleton";
import Link from "next/link";
import Favicon from "./favicon";




export default async function Recent() {

  const recent = await getNewsV1Recent();

  return (
    <ul className="*:py-1.5">
      {
        recent
          .map(article => {

            return (
              <li key={article.id} className="flex items-center gap-2 group relative">
                <Link href={article.url} className="absolute inset-0" />
                <Favicon url={article.url} size={20} />
                <span className="group-hover:underline">{article.title}</span>
              </li>
            )
          })
      }
    </ul>
  )
}


export const RecentSkeleton = () => {
  return (
    <ul className="*:h-9">
      <li className="flex items-center gap-2">
        <Skeleton className="size-5" />
        <Skeleton className="w-1/2 h-5" />
      </li>
      <li className="flex items-center gap-2">
        <Skeleton className="size-5" />
        <Skeleton className="w-1/2 h-5" />
      </li>
      <li className="flex items-center gap-2">
        <Skeleton className="size-5" />
        <Skeleton className="w-1/2 h-5" />
      </li>
      <li className="flex items-center gap-2">
        <Skeleton className="size-5" />
        <Skeleton className="w-1/2 h-5" />
      </li>
      <li className="flex items-center gap-2">
        <Skeleton className="size-5" />
        <Skeleton className="w-1/2 h-5" />
      </li>
    </ul>
  )
}
