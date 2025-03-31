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
import { cookies } from "next/headers";
import { authorized } from "@/lib/auth";
import { Suspense } from "react";
import Loading from "./loading";
import { SidebarProvider } from "mono/components/sidebar";
import ServerWrapper from "../server-wrapper";
import { SidebarSkeleton } from "../sidebar/sidebar-skeleton";
import ChatSidebar from "../sidebar/chat-sidebar";

type LayoutProps = {
  children: React.ReactNode;
  params: {
    chatId: string;
  };
};

const layout = async ({ children, params }: LayoutProps) => {
  const isAuthorized = await authorized();
  const cookieStore = cookies();
  const sidebarState = cookieStore.get("sidebar_state")?.value ?? "false";
  const defaultOpen = isAuthorized ? sidebarState === "true" : false;
  const chatId = params.chatId;
  const { data: chat } = await getChat(chatId);
  if (!chat) return redirect("/");
  return (
    <SidebarProvider
      defaultOpen={defaultOpen}
      style={{
        // @ts-expect-error
        "--sidebar-width": "20rem",
        "--sidebar-width-mobile": "20rem",
      }}
    >
      <Suspense fallback={<Loading />}>
        <ServerWrapper>
          <Suspense fallback={<SidebarSkeleton />}>
            <ChatSidebar chatId={chatId} />
          </Suspense>
          <div id="chat-wrapper" className="min-h-dvh relative w-full flex">
            <ChatProvider chat={chat} className="w-full /w-[calc(100%-48px)]">
              {children}
            </ChatProvider>
            {/* <ChatToolbar chatId={chatId} showTopics={showTopics} /> */}
          </div>
        </ServerWrapper>
      </Suspense>
    </SidebarProvider>
  );
};

export default layout;
