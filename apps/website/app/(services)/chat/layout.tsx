import { getChats } from "@/actions/chats/chats";
import { getFullPricing } from "@/actions/pricing/pricing";
import { auth } from "@/lib/auth";
import { SidebarProvider } from "mono/components/sidebar";
import { StoreProvider } from "./chat-api/chat-provider";
import ChatSidebar from "./sidebar/chat-sidebar";

type LayoutProps = {
  children: React.ReactNode;
};
const layout = async ({ children }: LayoutProps) => {
  const services = await getFullPricing();
  const user = await auth();
  const id = user?.id;
  const chats = id ? await getChats(id) : [];
  return (
    <SidebarProvider>
      <StoreProvider services={services} chats={chats}>
        <ChatSidebar />
        <div className="min-h-dvh w-full relative">{children}</div>
      </StoreProvider>
    </SidebarProvider>
  );
};

export default layout;
