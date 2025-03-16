import { getChat, getChatMessages } from "@/actions/chats/chats";
import User from "@/components/user";
import { Skeleton } from "mono/components/skeleton";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import ChatSidebarTrigger from "../chat-sidebar-trigger";
import ChatToolbar from "../chat-toolbar/chat-toolbar";
import ChatProvider from "./chat-provider";
import EditChatName from "./edit-chat-name";
import PageWrapper from "./page-wrapper";

type LayoutProps = {
  children: React.ReactNode;
  params: {
    chatId: string;
  };
};

const layout = async ({ children, params }: LayoutProps) => {
  const chatId = params.chatId;
  const chat = await getChat(chatId);
  const messages = await getChatMessages(chatId);
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
        className="w-full min-h-[calc(100dvh-56px)] overflow-y-visible flex pb-6"
      >
        <PageWrapper>{children}</PageWrapper>
        <div className="w-fit md:px-4 shrink-0 px-2 h-fit sticky right-0 top-1/3 flex flex-col items-center justify-center gap-2">
          <ChatToolbar chatId={chatId} />
        </div>
      </div>
    </ChatProvider>
  );
};

export default layout;
