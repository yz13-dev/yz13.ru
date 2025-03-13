import { getFullPricing } from "@/actions/pricing/pricing";
import { SidebarProvider } from "mono/components/sidebar";
import { StoreProvider } from "./chat-api/chat-provider";
import ChatSidebar from "./sidebar/chat-sidebar";

type LayoutProps = {
  children: React.ReactNode;
};
const layout = async ({ children }: LayoutProps) => {
  const services = await getFullPricing();
  return (
    <SidebarProvider>
      <StoreProvider services={services}>
        <ChatSidebar />
        <div className="min-h-dvh w-full relative">{children}</div>
      </StoreProvider>
    </SidebarProvider>
  );
};

export default layout;
