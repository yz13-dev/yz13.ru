import { auth } from "@/lib/auth";
import { Separator } from "mono/components/separator";
import { Skeleton } from "mono/components/skeleton";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { getChatsData } from "rest-api/chats";
import { cn } from "yz13/cn";
import Header from "../(root)/header";
import NewChatForm from "../(root)/new-chat-form";
import ChatList, { ChatListSkeleton } from "./chats-list";
import TaskList from "./task-list";

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
              <TaskList defaultTasks={tasks} />
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
