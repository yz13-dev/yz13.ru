import { getAuthorizedUser } from "rest-api/auth";
import { showUsage } from "@/const/flags";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "mono/components/sidebar";
import { Skeleton } from "mono/components/skeleton";
import dynamic from "next/dynamic";
import ChatHistoryNav from "./chat-history-nav";
import ChatSidebarActions from "./chat-sidebar-actions";
import ChatSidebarUsage from "./chat-sidebar-usage";
import Footer from "./footer";
const Header = dynamic(() => import("./header"), {
  ssr: false,
  loading: () => <Skeleton className="w-full h-[58px]" />,
});

const ChatSidebar = async ({ chatId }: { chatId: string }) => {
  const { data: user } = await getAuthorizedUser();
  return (
    <Sidebar collapsible="offcanvas" className="py-2">
      <SidebarHeader>
        {user ? (
          <Header user={user} />
        ) : (
          <Skeleton className="w-full h-[58px]" />
        )}
      </SidebarHeader>
      <SidebarContent>
        <ChatSidebarActions chatId={chatId} />
        {(await showUsage()) && <ChatSidebarUsage />}
        <ChatHistoryNav />
      </SidebarContent>
      <SidebarFooter>
        <Footer />
      </SidebarFooter>
    </Sidebar>
  );
};
export default ChatSidebar;
