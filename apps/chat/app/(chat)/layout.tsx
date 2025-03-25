import { authorized } from "@/lib/auth";
import { SidebarProvider } from "mono/components/sidebar";
import { cookies } from "next/headers";
import { Suspense } from "react";
import Loading from "./loading";
import ServerWrapper from "./server-wrapper";
import ChatSidebar from "./sidebar/chat-sidebar";
import { SidebarSkeleton } from "./sidebar/sidebar-skeleton";

type LayoutProps = {
  children: React.ReactNode;
};
const layout = async ({ children }: LayoutProps) => {
  const isAuthorized = await authorized();
  const cookieStore = cookies();
  const sidebarState = cookieStore.get("sidebar_state")?.value ?? "false";
  const defaultOpen = isAuthorized ? sidebarState === "true" : false;
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
