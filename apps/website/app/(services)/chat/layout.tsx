import { isDev } from "@/app/login/get-url";
import { enableChat } from "@/const/flags";
import { SidebarProvider } from "mono/components/sidebar";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import Loading from "./loading";
import ServerWrapper from "./server-wrapper";
import ChatSidebar from "./sidebar/chat-sidebar";
import { SidebarSkeleton } from "./sidebar/sidebar-skeleton";

type LayoutProps = {
  children: React.ReactNode;
};
const layout = async ({ children }: LayoutProps) => {
  const isChatEnabled = await enableChat();
  if (!isDev && !isChatEnabled) redirect("/");
  return (
    <SidebarProvider>
      <Suspense fallback={<Loading />}>
        <ServerWrapper>
          <Suspense fallback={<SidebarSkeleton />}>
            <ChatSidebar />
          </Suspense>
          <div className="min-h-dvh w-full relative">{children}</div>
        </ServerWrapper>
      </Suspense>
    </SidebarProvider>
  );
};

export default layout;
