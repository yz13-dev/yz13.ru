import { Skeleton } from "mono/components/skeleton";
import { Suspense } from "react";
import { cn } from "yz13/cn";
import Header from "./header";
import NewChatForm from "./new-chat-form";
import { authorized } from "@/lib/auth";
import { redirect } from "next/navigation";
import ChatTypeSwitch from "./chat-type-switch";

const page = async () => {
  const user = await authorized();
  if (user) return redirect("/chats");
  return (
    <>
      <Suspense fallback={<Skeleton className="w-full h-14" />}>
        <Header />
      </Suspense>
      <div
        className={cn(
          "w-full min-h-[calc(100dvh-56px)] space-y-6",
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
        <ChatTypeSwitch defaultChecked={false} />
        <span className="text-sm text-secondary block">
          Для создания чата необходимо авторизоваться или создать аккаунт
        </span>
      </div>
    </>
  );
};
export default page;
