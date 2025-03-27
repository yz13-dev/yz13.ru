import { getChat } from "@/actions/chats/chats";
import { AnimatePresence } from "motion/react";
import { redirect } from "next/navigation";
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
      <header className="w-full bg-background z-20 h-12 flex items-center justify-start px-4">
        <AnimatePresence>
          <div className="flex items-center gap-1">
            <ChatSidebarTrigger />
            <EditChatName id={chatId} name={chatName ?? undefined} />
          </div>
        </AnimatePresence>
      </header>
      {children}
    </ChatProvider>
  );
};

export default layout;
