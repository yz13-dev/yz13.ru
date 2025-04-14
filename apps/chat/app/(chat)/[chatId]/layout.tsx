import { authorized } from "@/lib/auth";
import { SidebarProvider } from "mono/components/sidebar";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { getChat } from "rest-api/chats";
import ServerWrapper from "../server-wrapper";
import ChatSidebar from "../sidebar/chat-sidebar";
import { SidebarSkeleton } from "../sidebar/sidebar-skeleton";
import ChatProvider from "./chat-provider";
import Loading from "./loading";

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{
    chatId: string;
  }>;
};

const layout = async ({ children, params }: LayoutProps) => {
  const { chatId } = await params;
  const isAuthorized = await authorized();
  const cookieStore = await cookies();
  const sidebarState = cookieStore.get("sidebar_state")?.value ?? "false";
  const defaultOpen = isAuthorized ? sidebarState === "true" : false;
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
