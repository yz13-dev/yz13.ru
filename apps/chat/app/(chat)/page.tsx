import { Separator } from "mono/components/separator";
import { Skeleton } from "mono/components/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "mono/components/tabs";
import { Suspense } from "react";
import { cn } from "yz13/cn";
import ChatInput from "./chat-input";
import Header from "./header";
import LastChatList, { LastChatListSkeleton } from "./last-chat-list";

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

        <Tabs defaultValue="personal" className="space-y-3">
          <div className="px-3">
            <TabsList>
              <TabsTrigger value="personal">Личный чат</TabsTrigger>
              <TabsTrigger value="group">Групповой чат</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="personal">
            <ChatInput
              type="personal"
              containerClassName="static max-w-full w-full px-0"
            />
          </TabsContent>
          <TabsContent value="group">
            <ChatInput
              type="group"
              containerClassName="static max-w-full w-full px-0"
            />
          </TabsContent>
        </Tabs>
        <Separator />
        <Suspense fallback={<LastChatListSkeleton />}>
          <LastChatList />
        </Suspense>
      </div>
    </>
  );
};
export default page;
