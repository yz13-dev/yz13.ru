import NewChatForm from "@/app/(root)/new-chat-form";
import { Separator } from "mono/components/separator";
import { Skeleton } from "mono/components/skeleton";
import { cn } from "yz13/cn";
import { ChatListSkeleton } from "./chats-list";

export default function loading() {
  return (
    <div
      className={cn(
        "w-full min-h-[calc(100dvh-56px)] space-y-6",
        "*:max-w-5xl *:mx-auto *:w-full *:px-6 py-6",
      )}
    >
      <div className="w-full">
        <Skeleton className="h-9 w-full" />
      </div>
      <div className="space-y-6">
        <Skeleton className="w-1/2 h-6" />
        <Skeleton className="w-full h-10" />
      </div>
      <Separator />
      <div className="w-full flex md:flex-row flex-col gap-6">
        <div className="md:w-1/3 w-full space-y-3 *:space-y-1.5">
          <div className="w-full">
            <span className="text-base block font-medium text-secondary">
              Задачи
            </span>
            <Skeleton className="h-96" />
          </div>
        </div>
        <div className="md:w-2/3 w-full space-y-6">
          <ChatListSkeleton />
          <ChatListSkeleton />
        </div>
      </div>
    </div>
  );
}
