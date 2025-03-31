import { Suspense } from "react";
import Header from "../(root)/header";
import { Skeleton } from "mono/components/skeleton";
import { cn } from "yz13/cn";
import NewChatForm from "../(root)/new-chat-form";
import { Separator } from "mono/components/separator";
import ChatList, { ChatListSkeleton } from "./chats-list";
import { auth } from "@/lib/auth";
import { getChatsData } from "rest-api/chats";
import { FileIcon, HashIcon } from "lucide-react";
import { redirect } from "next/navigation";
import { Checkbox } from "mono/components/checkbox";
import { Task } from "../(chat)/[chatId]/tasks/task-list";

const page = async () => {
  const user = await auth();
  const uid = user?.id;
  if (!user || !uid) return redirect("/");
  const { data } = await getChatsData(uid);
  const chats = data?.chats ?? [];
  const favoriteChats = chats.filter((chat) => chat.favorite);
  const otherChats = chats.filter((chat) => !chat.favorite);
  const tasks = (data?.tasks ?? []).filter((task) => !task.checked);
  return (
    <>
      <Suspense fallback={<Skeleton className="w-full h-14" />}>
        <Header />
      </Suspense>
      <div
        className={cn(
          "w-full min-h-[calc(100dvh-56px)] space-y-6",
          "*:max-w-5xl *:mx-auto *:w-full *:px-6 py-12 gap-12",
        )}
      >
        <NewChatForm showLabel />
        <Separator />
        <div className="w-full flex md:flex-row flex-col gap-6">
          <div className="md:w-1/3 w-full space-y-3 *:space-y-1.5">
            <div className="w-full">
              <span className="text-base block font-medium text-secondary">
                Задачи
              </span>
              <ul className="rounded-xl border divide-y">
                {tasks.map((task) => (
                  <li
                    key={task.id}
                    className="flex gap-2 min-h-9 bg-background text-secondary items-center first:rounded-t-xl last:rounded-b-xl"
                  >
                    <Task task={task} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="md:w-2/3 w-full space-y-6">
            <Suspense fallback={<ChatListSkeleton />}>
              <ChatList chats={favoriteChats} label="Избранные" />
            </Suspense>
            <Suspense fallback={<ChatListSkeleton />}>
              <ChatList chats={otherChats} label="Последние" />
            </Suspense>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
