import NewChatForm from "@/app/(root)/new-chat-form";
import { Separator } from "mono/components/separator";
import { Skeleton } from "mono/components/skeleton";
import { cn } from "yz13/cn";

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
        <div className="*:block space-y-3">
          <h1 className="text-4xl font-semibold">Чат от YZ13</h1>
          <p className="text-base max-w-xl text-foreground">
            Создайте свой чат, сортируйте сообщения по тэгам, создавайте задачи
            и списки, рабочее пространство в виде групп и чатов.
          </p>
        </div>
        <Skeleton className="w-1/2 h-6" />
        <span className="text-sm text-foreground block">
          Для создания чата необходимо авторизоваться или создать аккаунт
        </span>
      </div>
    </div>
  );
}
