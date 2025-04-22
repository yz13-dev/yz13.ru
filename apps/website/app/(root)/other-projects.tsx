import { cdn } from "@/lib/cdn";
import { ArrowRightIcon } from "lucide-react";
import { Badge } from "mono/components/badge";
import { Button } from "mono/components/button";
import { Skeleton } from "mono/components/skeleton";
import Image from "next/image";
import Link from "next/link";
import { getPublications } from "rest-api/store";

export async function OtherProjectsSkeleton() {
  return (
    <>
      <li>
        <div className="flex items-start gap-4 justify-between">
          <div className="flex w-full items-center gap-4">
            <Skeleton className="size-16 shrink-0 rounded-2xl" />
            <div className="flex w-full flex-col gap-2">
              <Skeleton className="w-2/3 h-6 rounded-full" />
              <Skeleton className="w-1/2 h-4 rounded-full" />
              <Skeleton className="w-1/2 h-4 rounded-full" />
            </div>
          </div>
          <Skeleton className="size-9 shrink-0 rounded-full" />
        </div>
      </li>
      <li>
        <div className="flex items-start gap-4 justify-between">
          <div className="flex w-full items-center gap-4">
            <Skeleton className="size-16 shrink-0 rounded-2xl" />
            <div className="flex w-full flex-col gap-2">
              <Skeleton className="w-2/3 h-6 rounded-full" />
              <Skeleton className="w-1/2 h-4 rounded-full" />
              <Skeleton className="w-1/2 h-4 rounded-full" />
            </div>
          </div>
          <Skeleton className="size-9 shrink-0 rounded-full" />
        </div>
      </li>
      <li>
        <div className="flex items-start gap-4 justify-between">
          <div className="flex w-full items-center gap-4">
            <Skeleton className="size-16 shrink-0 rounded-2xl" />
            <div className="flex w-full flex-col gap-2">
              <Skeleton className="w-2/3 h-6 rounded-full" />
              <Skeleton className="w-1/2 h-4 rounded-full" />
              <Skeleton className="w-1/2 h-4 rounded-full" />
            </div>
          </div>
          <Skeleton className="size-9 shrink-0 rounded-full" />
        </div>
      </li>
    </>
  );
}

export default async function OtherProjects({
  exclude = [],
}: {
  exclude?: string[];
}) {
  const { data } = await getPublications();
  const publications = (data ?? [])?.filter((publication) => {
    const isIn = exclude.includes(publication.id);
    if (isIn) return false;
    return true;
  });
  return (
    <>
      {(publications ?? []).map((publication) => {
        return (
          <li key={publication.id} className="relative w-full">
            {false && (
              <Link
                href="https://news.yz13.ru"
                className="absolute w-full h-full top-0 left-0"
              />
            )}
            <div className="flex items-start gap-4 justify-between">
              <div className="flex w-full items-center gap-4">
                <div className="size-16 shrink-0 flex items-center justify-center rounded-[25%] border bg-secondary relative overflow-hidden">
                  {publication.icon.type === "themed" && (
                    <>
                      <Image
                        src={cdn(`/apps${publication.icon.dark}`)}
                        className="dark-mode-image"
                        alt=""
                        fill
                      />
                      <Image
                        src={cdn(`/apps${publication.icon.light}`)}
                        className="light-mode-image"
                        alt=""
                        fill
                      />
                    </>
                  )}
                  {publication.icon.type === "simple" && (
                    <Image
                      src={cdn(`/apps${publication.icon.url}`)}
                      alt=""
                      fill
                    />
                  )}
                </div>
                <div className="flex w-full flex-col gap-0">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-medium">
                      {publication.name}
                    </span>
                    {false && <Badge variant="secondary">Скоро</Badge>}
                  </div>
                  {publication.description && (
                    <span className="text-sm text-muted-foreground line-clamp-2">
                      {publication.description}
                    </span>
                  )}
                </div>
              </div>
              <Button size="icon" variant="secondary" asChild>
                <Link href={`/${publication.id}`}>
                  <ArrowRightIcon size={16} />
                </Link>
              </Button>
            </div>
          </li>
        );
      })}
      {/* <li className="relative w-full">
        <Link
          href="https://news.yz13.ru"
          className="absolute w-full h-full top-0 left-0"
        />
        <div className="flex items-start gap-4 justify-between">
          <div className="flex w-full items-center gap-4">
            <div className="size-16 shrink-0 flex items-center justify-center rounded-2xl bg-secondary">
              <NewspaperIcon size={28} />
            </div>
            <div className="flex w-full flex-col gap-0">
              <div className="flex items-center gap-2">
                <span className="text-lg font-medium">Новостная лента</span>
                <Badge variant="secondary">Скоро</Badge>
              </div>
              <span className="text-sm text-muted-foreground line-clamp-2">
                Простенькая новостная лента для просмотра новостей, с
                автоматическим обновлением.
              </span>
            </div>
          </div>
          <Button size="icon" variant="secondary">
            <ArrowRightIcon size={16} />
          </Button>
        </div>
      </li>
      <li>
        <div className="flex items-start gap-4 justify-between">
          <div className="flex w-full items-center gap-4">
            <div className="size-16 shrink-0 flex items-center justify-center rounded-2xl bg-secondary">
              <MessageCircleIcon size={28} />
            </div>
            <div className="flex w-full flex-col gap-0">
              <div className="flex items-center gap-2">
                <span className="text-lg font-medium">Чат</span>
                <Badge variant="secondary">Скоро</Badge>
              </div>
              <span className="text-sm text-muted-foreground line-clamp-2">
                Небольшой чат для общения с друзьями и организации работы над
                проектами.
              </span>
            </div>
          </div>
          <Button size="icon" variant="secondary" disabled>
            <ArrowRightIcon size={16} />
          </Button>
        </div>
      </li> */}
    </>
  );
}
