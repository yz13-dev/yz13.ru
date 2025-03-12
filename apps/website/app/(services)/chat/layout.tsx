import { SidebarProvider } from "mono/components/sidebar";
import ChatSidebar from "./sidebar/chat-sidebar";

type LayoutProps = {
  children: React.ReactNode;
};
const layout = ({ children }: LayoutProps) => {
  return (
    <SidebarProvider>
      <ChatSidebar />
      <div className="h-full w-full relative">{children}</div>
    </SidebarProvider>
  );
};

export default layout;
