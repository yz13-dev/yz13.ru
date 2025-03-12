import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
} from "mono/components/sidebar";
import ChatHistoryNav from "./chat-history-nav";
import Header from "./header";

const ChatSidebar = () => {
  return (
    <Sidebar collapsible="offcanvas" className="py-2">
      <SidebarHeader>
        <Header />
      </SidebarHeader>
      <SidebarContent>
        <ChatHistoryNav />
      </SidebarContent>
    </Sidebar>
  );
};
export default ChatSidebar;
