import AppLogo from "@/app/[appId]/components/app-logo";
import { getV1Store } from "@yz13/api";
import { Skeleton } from "@yz13/ui/components/skeleton";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

export const ProjectsSkeleton = () => {

  const links = Array.from({ length: 4 }, (_, i) => i);

  return (
    <div className="space-y-3">
      <span className="block text-muted-foreground">
        Проекты
      </span>
      <ul>
        {
          links.map((item) => {
            return (
              <li key={item} className="h-8 items-center">
                <div
                  className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
                >
                  <Skeleton className="size-7 shrink-0" />
                  <Skeleton className="w-1/2 h-5" />
                </div>
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}

export default async function () {


  const data = await getV1Store();
  const publications = data

  return (
    <div className="space-y-3">
      <span className="block text-muted-foreground">
        Проекты
      </span>
      <ul>
        {
          publications
            .sort((a, b) => a.public_url ? -1 : 1)
            .map((publication) => {

              const link = publication.public_url
              const name = publication.name

              if (!link) return (
                <li key={publication.id} className="h-8 items-center">
                  <div
                    className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
                  >
                    <div className="size-7 shrink-0 flex items-center justify-center rounded-full relative overflow-hidden">
                      <AppLogo publication={publication} />
                    </div>
                    <span className="text-sm">
                      {name}
                    </span>
                  </div>
                </li>
              )
              return (
                <li key={publication.id} className="h-8 items-center">
                  <Link
                    target="_blank"
                    href={link}
                    className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
                  >
                    <div className="size-7 shrink-0 flex items-center justify-center rounded-full relative overflow-hidden">
                      <AppLogo publication={publication} />
                    </div>
                    <span className="text-sm">
                      {name}
                    </span>
                    <ExternalLink size={14} />
                  </Link>
                </li>
              )
            })
        }
      </ul>
    </div>
  )
}
