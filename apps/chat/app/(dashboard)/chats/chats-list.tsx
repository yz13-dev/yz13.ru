import {
  ArrowRightIcon,
  HashIcon,
  ListTodoIcon,
  StarIcon,
  UserIcon,
  UsersIcon,
} from "lucide-react";
import { Skeleton } from "mono/components/skeleton";
import Link from "next/link";
import { ChatRoom } from "rest-api/types/chats";
import { cn } from "yz13/cn";

const ListGrid = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full grid md:grid-cols-2 grid-cols-1 *:h-[105px] gap-2">
      {children}
    </div>
  );
};

export const ChatListSkeleton = ({ label }: { label?: string }) => {
  return (
    <div className="w-full space-y-3">
      {
        label &&
        <span className="text-base block font-medium text-foreground">
          {label}
        </span>
      }
      <ListGrid>
        <Skeleton className="w-full" />
        <Skeleton className="w-full" />
        <Skeleton className="w-full" />
        <Skeleton className="w-full" />
        <Skeleton className="w-full" />
        <Skeleton className="w-full" />
      </ListGrid>
    </div>
  );
};

const ChatList = async ({
  chats = [],
  label,
}: {
  chats?: ChatRoom[];
  label?: string;
}) => {
  return (
    <div className="w-full space-y-3">
      {label && (
        <span className="text-base block font-medium text-foreground">
          {label}
        </span>
      )}
      <ListGrid>
        {chats
          .sort((a, b) => {
            if (a.favorite && !b.favorite) return -1;
            if (!a.favorite && b.favorite) return 1;
            return 0;
          })
          .map((chat) => {
            const isGroupChat = chat.type === "group";
            return (
              <div
                key={chat.id}
                className="flex flex-col group/chat gap-2 hover:bg-background-secondary hover:border-foreground transition-colors rounded-lg bg-background border p-3"
              >
                <div className="flex gap-2 items-center">
                  <div className="size-4 relative">
                    {isGroupChat ? (
                      <UsersIcon className="shrink-0" size={16} />
                    ) : (
                      <UserIcon className="shrink-0" size={16} />
                    )}
                    {chat.favorite && (
                      <StarIcon
                        className={cn(
                          "absolute size-2.5 -top-[6px] -right-[6px]",
                          chat.favorite
                            ? "fill-yellow-foreground/25 stroke-yellow-foreground"
                            : "",
                        )}
                      />
                    )}
                  </div>
                  <Link
                    href={`/${chat.id}`}
                    className="w-full flex items-center justify-between"
                  >
                    <span className="text-sm font-medium">{chat.name}</span>
                    <ArrowRightIcon
                      size={16}
                      className="group-hover/chat:-rotate-45 transition-transform"
                    />
                  </Link>
                </div>
                <ul className="flex flex-col *:pl-1.5 bg-background *:pr-2 *:py-1 rounded-md divide-y border">
                  <li className="flex gap-1 text-muted-foreground items-center">
                    <HashIcon size={14} />
                    <span className="text-xs">
                      {chat.tags?.length ?? 0} Тэгов
                    </span>
                  </li>
                  <li className="flex gap-1 text-muted-foreground items-center">
                    <ListTodoIcon size={14} />
                    <span className="text-xs">
                      {chat.task_lists?.length ?? 0} Списков задач
                    </span>
                  </li>
                </ul>
              </div>
            );
          })}
      </ListGrid>
    </div>
  );
};

export default ChatList;
