import { SidebarProvider } from "mono/components/sidebar";
import { Suspense } from "react";
import Loading from "./loading";
import ServerWrapper from "./server-wrapper";
import ChatSidebar from "./sidebar/chat-sidebar";
import { SidebarSkeleton } from "./sidebar/sidebar-skeleton";

type LayoutProps = {
  children: React.ReactNode;
};
const layout = async ({ children }: LayoutProps) => {
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
