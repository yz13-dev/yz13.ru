import { getChat } from "rest-api/chats";
import { redirect } from "next/navigation";
import ChatSidebarTrigger from "../sidebar-trigger";
import ChatProvider from "./chat-provider";
import EditChatName from "./edit-chat-name";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "mono/components/breadcrumb";
import { showChatCode, showChatTopics } from "@/const/flags";
import ChatToolbar from "../chat-toolbar/chat-toolbar";

type LayoutProps = {
  children: React.ReactNode;
  params: {
    chatId: string;
  };
};

const layout = async ({ children, params }: LayoutProps) => {
  const chatId = params.chatId;
  const { data: chat } = await getChat(chatId);
  const showTopics = await showChatTopics();
  if (!chat) return redirect("/");
  return (
    <div className="w-full flex min-h-full">
      <ChatProvider
        chat={chat}
        className="w-[calc(100%-48px)] bg-background-secondary"
      >
        {children}
      </ChatProvider>
      <ChatToolbar chatId={chatId} showTopics={showTopics} />
    </div>
  );
};

export default layout;
