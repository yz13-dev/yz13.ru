import { getChat } from "@/actions/chats/chats";
import User from "@/components/user";
import { Skeleton } from "mono/components/skeleton";
import { AnimatePresence } from "motion/react";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import ChatSidebarTrigger from "../chat-sidebar-trigger";
import ChatProvider from "./chat-provider";
import EditChatName from "./edit-chat-name";

type LayoutProps = {
  children: React.ReactNode;
  params: {
    chatId: string;
  };
};

const layout = async ({ children, params }: LayoutProps) => {
  const chatId = params.chatId;
  const chat = await getChat(chatId);
  if (!chat) return redirect("/");
  const chatName = chat.name;
  return (
    <ChatProvider chat={chat}>
      <header className="w-full bg-background z-20 h-12 flex items-center justify-between px-4">
        <AnimatePresence>
          <div className="flex items-center gap-2">
            <ChatSidebarTrigger />
            <EditChatName id={chatId} name={chatName ?? undefined} />
          </div>
        </AnimatePresence>
        <Suspense fallback={<Skeleton className="h-9 w-[75px]" />}>
          <User />
        </Suspense>
      </header>
      {children}
    </ChatProvider>
  );
};

export default layout;
