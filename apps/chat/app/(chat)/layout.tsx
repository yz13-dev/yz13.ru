import { SidebarProvider } from "mono/components/sidebar";
import { Suspense } from "react";
import Loading from "./loading";
import ServerWrapper from "./server-wrapper";
import ChatSidebar from "./sidebar/chat-sidebar";
import { SidebarSkeleton } from "./sidebar/sidebar-skeleton";

type LayoutProps = {
  children: React.ReactNode;
};
const layout = ({ children }: LayoutProps) => {
  return (
    <SidebarProvider
      defaultOpen={false}
      style={{
        // @ts-expect-error
        "--sidebar-width": "25rem",
        "--sidebar-width-mobile": "25rem",
      }}
    >
      <Suspense fallback={<Loading />}>
        <ServerWrapper>
          <Suspense fallback={<SidebarSkeleton />}>
            <ChatSidebar />
          </Suspense>
          <div
            id="chat-wrapper"
            className="min-h-dvh bg-background-secondary w-full relative"
          >
            {children}
          </div>
        </ServerWrapper>
      </Suspense>
    </SidebarProvider>
  );
};

export default layout;
