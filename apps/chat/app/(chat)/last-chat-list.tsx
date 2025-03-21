import { getChats } from "@/actions/chats/chats";
import { auth } from "@/lib/auth";
import {
  ArrowRightIcon,
  HashIcon,
  ListTodoIcon,
  UserIcon,
  UsersIcon,
} from "lucide-react";
import { Skeleton } from "mono/components/skeleton";
import Link from "next/link";

export const LastChatListSkeleton = () => {
  return (
    <div className="w-full space-y-3">
      <span className="text-base block font-medium text-secondary">
        Последние чаты
      </span>
      <div className="w-full grid sm:grid-cols-2 grid-cols-1 gap-2">
        <Skeleton className="w-full h-[76px]" />
        <Skeleton className="w-full h-[76px]" />
        <Skeleton className="w-full h-[76px]" />
        <Skeleton className="w-full h-[76px]" />
        <Skeleton className="w-full h-[76px]" />
        <Skeleton className="w-full h-[76px]" />
      </div>
    </div>
  );
};

const LastChatList = async () => {
  const user = await auth();
  const id = user?.id;
  const chats = id ? await getChats(id) : [];
  if (!user) return null;
  return (
    <div className="w-full space-y-3">
      <span className="text-base block font-medium text-secondary">
        Последние чаты
      </span>
      <div className="w-full grid sm:grid-cols-2 grid-cols-1 gap-2">
        {chats.map((chat) => {
          const isGroupChat = chat.type === "group";
          return (
            <div
              key={chat.id}
              className="flex flex-col gap-2 rounded-lg bg-background border p-3"
            >
              <div className="flex gap-2 items-center">
                {isGroupChat ? (
                  <UsersIcon className="shrink-0" size={16} />
                ) : (
                  <UserIcon className="shrink-0" size={16} />
                )}
                <Link
                  href={`/${chat.id}`}
                  className="w-full flex items-center justify-between"
                >
                  <span className="text-sm font-medium">{chat.name}</span>
                  <ArrowRightIcon size={16} />
                </Link>
              </div>
              <div className="flex gap-2 items-center">
                <div className="flex gap-1 px-1.5 py-0.5 rounded-full border text-secondary items-center">
                  <HashIcon size={14} />
                  <span className="text-xs">
                    {chat.tags?.length ?? 0} Тэгов
                  </span>
                </div>
                <div className="flex gap-1 px-1.5 py-0.5 rounded-full border text-secondary items-center">
                  <ListTodoIcon size={14} />
                  <span className="text-xs">
                    {chat.task_lists?.length ?? 0} Списков задач
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LastChatList;
