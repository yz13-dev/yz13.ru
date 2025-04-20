import { ArrowRightIcon, MessageCircleIcon, NewspaperIcon } from "lucide-react";
import { Badge } from "mono/components/badge";
import { Button } from "mono/components/button";
import { Skeleton } from "mono/components/skeleton";

export function OtherProjectsSkeleton() {
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

export default function OtherProjects() {
  return (
    <>
      <li>
        <div className="flex items-start gap-4 justify-between">
          <div className="flex w-full items-center gap-4">
            <div className="size-16 shrink-0 flex items-center justify-center rounded-2xl bg-background-secondary">
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
      </li>
      <li>
        <div className="flex items-start gap-4 justify-between">
          <div className="flex w-full items-center gap-4">
            <div className="size-16 shrink-0 flex items-center justify-center rounded-2xl bg-background-secondary">
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
          <Button size="icon" variant="secondary" disabled>
            <ArrowRightIcon size={16} />
          </Button>
        </div>
      </li>
    </>
  );
}
