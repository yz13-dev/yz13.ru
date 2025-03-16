import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
} from "mono/components/sidebar";
import { Skeleton } from "mono/components/skeleton";
import dynamic from "next/dynamic";
import ChatHistoryNav from "./chat-history-nav";
import ChatSidebarActions from "./chat-sidebar-actions";
import ChatSidebarUsage from "./chat-sidebar-usage";
const Header = dynamic(() => import("./header"), {
  ssr: false,
  loading: () => <Skeleton className="w-full h-14" />,
});

const ChatSidebar = () => {
  return (
    <Sidebar collapsible="offcanvas" className="py-2">
      <SidebarHeader>
        <Header />
      </SidebarHeader>
      <SidebarContent>
        <ChatSidebarActions />
        <ChatSidebarUsage />
        <ChatHistoryNav />
      </SidebarContent>
    </Sidebar>
  );
};
export default ChatSidebar;
