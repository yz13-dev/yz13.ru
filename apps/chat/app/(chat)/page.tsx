import {
  ListTodoIcon,
  MessageCircleIcon,
  TagIcon,
  UsersIcon,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "mono/components/tabs";
import { cn } from "yz13/cn";
import ChatInput from "./chat-input";
import Header from "./header";

const page = async () => {
  return (
    <>
      <Header />
      <div
        className={cn(
          "w-full h-[calc(100dvh-56px)] flex flex-col justify-center",
          "*:max-w-screen-lg *:mx-auto *:w-full *:px-6 gap-12",
        )}
      >
        <div className="*:block space-y-3">
          <h1 className="text-4xl font-semibold">Чат от YZ13</h1>
          <p className="text-base max-w-xl text-secondary">
            Создайте свой чат, сортируйте сообщения по тэгам, создавайте задачи
            и списки, и все это будет доступно для всех пользователей.
          </p>
        </div>
        <div className="w-full px-6">
          <div className="grid *:w-full *:h-full gap-3 *:p-4 md:grid-cols-4 grid-cols-2 md:h-[192px] h-[calc(192px*2)]">
            <div className="rounded-xl flex flex-col border">
              <span className="font-medium">Личный чат</span>
              <MessageCircleIcon size={20} className="mt-auto" />
            </div>
            <div className="rounded-xl flex flex-col border">
              <span className="font-medium">Групповой чат</span>
              <UsersIcon size={20} className="mt-auto" />
            </div>
            <div className="rounded-xl flex flex-col border">
              <span className="font-medium">Тэги для сообщений</span>
              <TagIcon size={20} className="mt-auto" />
            </div>
            <div className="rounded-xl flex flex-col border">
              <span className="font-medium">Задачи и списки</span>
              <ListTodoIcon size={20} className="mt-auto" />
            </div>
          </div>
        </div>
        {/* <span className="text-2xl font-medium text-foreground/60">
          Для создания чата, отправьте сообщение
        </span>
        <span className="text-2xl font-medium text-foreground/60">или</span>
        <Link
          href="/group"
          className="text-2xl font-medium text-foreground hover:underline"
        >
          Создайте групповой чат
        </Link> */}
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
      </div>
      <span className="text-xs text-secondary absolute bottom-1 left-0 right-0 mx-auto">
        {/* Обратите внимание, данный сервис не использует искусственный интеллект */}
      </span>
    </>
  );
};
export default page;
