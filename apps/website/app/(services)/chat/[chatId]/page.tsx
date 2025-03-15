import { getChat, getChatMessages } from "@/actions/chats/chats";
import User from "@/components/user";
import { wait } from "@/helpers/wait";
import { AlbumIcon, ListTodoIcon, SettingsIcon, TagIcon } from "lucide-react";
import { Button } from "mono/components/button";
import { Skeleton } from "mono/components/skeleton";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import ChatInput from "../chat-input";
import ChatSidebarTrigger from "../chat-sidebar-trigger";
import ChatHistory from "./chat-history";
import ChatProvider from "./chat-provider";
import EditChatName from "./edit-chat-name";

type PageProps = {
  params: {
    chatId: string;
  };
};
const page = async ({ params }: PageProps) => {
  const chatId = params.chatId;
  const chat = await getChat(chatId);
  const messages = await getChatMessages(chatId);
  await wait(2000);
  if (!chat) return redirect("/chat");
  const chatName = chat.name;
  return (
    <ChatProvider chat={chat} messages={messages}>
      <header className="w-full sticky top-0 z-10 h-14 flex items-center justify-between md:px-6 px-2">
        <div className="flex items-center gap-2">
          <ChatSidebarTrigger />
          <EditChatName id={chatId} name={chatName ?? undefined} />
        </div>
        <Suspense fallback={<Skeleton className="h-9 w-[75px]" />}>
          <User />
        </Suspense>
      </header>
      <div
        id="chat-history-wrapper"
        className="w-full min-h-[calc(100dvh-56px)]] overflow-y-visible flex pb-6"
      >
        <div className="mx-auto w-full md:max-w-[calc(var(--breakpoint-2xl)-124px)] max-w-[calc(var(--breakpoint-2xl)-52px)]">
          <ChatHistory />
        </div>
        <div className="w-fit md:px-6 px-2 h-fit sticky right-0 top-1/3 flex flex-col items-center justify-center gap-2">
          <Button size="icon" variant="secondary">
            <ListTodoIcon size={16} />
          </Button>
          <Button size="icon" variant="secondary">
            <AlbumIcon size={16} />
          </Button>
          <Button size="icon" variant="secondary">
            <TagIcon size={16} />
          </Button>
          <Button size="icon" variant="secondary">
            <SettingsIcon size={16} />
          </Button>
        </div>
      </div>
      <ChatInput chatId={chatId} />
    </ChatProvider>
  );
};

export default page;
