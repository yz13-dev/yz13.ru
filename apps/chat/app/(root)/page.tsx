import { Separator } from "mono/components/separator";
import { Skeleton } from "mono/components/skeleton";
import { Suspense } from "react";
import { cn } from "yz13/cn";
import Header from "./header";
import LastChatList, { LastChatListSkeleton } from "./last-chat-list";
import NewChatForm from "./new-chat-form";

const page = async () => {
  return (
    <>
      <Suspense fallback={<Skeleton className="w-full h-14" />}>
        <Header />
      </Suspense>
      <div
        className={cn(
          "w-full min-h-[calc(100dvh-56px)] flex flex-col justify-center",
          "*:max-w-xl *:mx-auto *:w-full *:px-6 py-12 gap-12",
        )}
      >
        <div className="*:block space-y-3">
          <h1 className="text-4xl font-semibold">Чат от YZ13</h1>
          <p className="text-base max-w-xl text-secondary">
            Создайте свой чат, сортируйте сообщения по тэгам, создавайте задачи
            и списки, рабочее пространство в виде групп и чатов.
          </p>
        </div>

        <NewChatForm />
        <Separator />
        <Suspense fallback={<LastChatListSkeleton />}>
          <LastChatList />
        </Suspense>
      </div>
    </>
  );
};
export default page;
