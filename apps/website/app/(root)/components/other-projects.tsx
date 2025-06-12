import AppLogo from "@/app/[appId]/components/app-logo";
import { getPublications } from "@yz13/api/store";
import { Badge } from "@yz13/ui/components/badge";
import { Skeleton } from "@yz13/ui/components/skeleton";
import { differenceInDays } from "date-fns";
import { ExternalLinkIcon } from "lucide-react";
import Link from "next/link";

export async function OtherProjectsSkeleton() {
  return (
    <>
      <li>
        <div className="flex items-start gap-4 justify-between">
          <div className="flex w-full items-center gap-4">
            <Skeleton className="size-16 shrink-0 rounded-2xl" />
            <div className="flex w-full flex-col gap-2">
              <Skeleton className="w-2/3 h-5 rounded-fulls" />
              <Skeleton className="w-2/3 h-5 rounded-fulls" />
              <Skeleton className="w-1/2 h-4 rounded-full" />
            </div>
          </div>
        </div>
      </li>
      <li>
        <div className="flex items-start gap-4 justify-between">
          <div className="flex w-full items-center gap-4">
            <Skeleton className="size-16 shrink-0 rounded-2xl" />
            <div className="flex w-full flex-col gap-2">
              <Skeleton className="w-2/3 h-5 rounded-full" />
              <Skeleton className="w-2/3 h-5 rounded-full" />
              <Skeleton className="w-1/2 h-4 rounded-full" />
            </div>
          </div>
        </div>
      </li>
      <li>
        <div className="flex items-start gap-4 justify-between">
          <div className="flex w-full items-center gap-4">
            <Skeleton className="size-16 shrink-0 rounded-2xl" />
            <div className="flex w-full flex-col gap-2">
              <Skeleton className="w-2/3 h-5 rounded-full" />
              <Skeleton className="w-2/3 h-5 rounded-full" />
              <Skeleton className="w-1/2 h-4 rounded-full" />
            </div>
          </div>
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
  if (!publications.length) return <OtherProjectsSkeleton />;
  return (
    <>
      {publications.map((publication) => {
        const createdAt = new Date(publication.created_at);
        const today = new Date();
        const passedDays = differenceInDays(today, createdAt);
        const stage = publication.stage;
        const publicLink = publication.public_url;
        const isLessThanWeek = passedDays <= 7;
        return (
          <li key={publication.id} className="relative w-full">
            <div className="flex items-start gap-4 justify-between">
              <div className="flex w-full items-start gap-4">
                <div className="relative">
                  {isLessThanWeek && (
                    <Badge
                      variant="secondary"
                      className="absolute z-10 rotate-12 top-1 -right-5"
                    >
                      Новое
                    </Badge>
                  )}
                  <div className="size-16 shrink-0 flex mt-2 items-center justify-center rounded-[25%] border bg-background/40 relative overflow-hidden">
                    <AppLogo publication={publication} />
                  </div>
                </div>
                <div className="flex w-full flex-col gap-1">
                  <div className="group *:inline relative space-x-2 line-clamp-2 *:text-base *:font-medium">
                    <Link
                      href={`/${publication.id}`}
                      className="w-full h-full absolute left-0 top-0"
                    />
                    <span className="group-hover:underline">
                      {publication.name}
                    </span>
                    {publication.description && (
                      <>
                        <span className="group-hover:underline">—</span>
                        <span className="group-hover:underline">
                          {publication.description}
                        </span>
                      </>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {publicLink && (
                      <Link
                        href={publicLink}
                        target="_blank"
                        className="text-xs hover:underline mb-0.5 text-muted-foreground inline-flex items-center gap-1"
                      >
                        {publicLink} <ExternalLinkIcon size={12} />
                      </Link>
                    )}
                    {stage && <Badge variant="secondary" className="capitalize">{stage}</Badge>}
                  </div>
                </div>
              </div>
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
