import Dock from "@/components/dock/dock";
import PageDockFiller from "@/components/page-dock-filler";
import { SidebarProvider } from "mono/components/sidebar";
import AppSidebar from "./sidebar/app-sidebar";

const page = async () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="w-full p-6">
        <span className="text-base font-medium">Блог</span>
        <PageDockFiller />
        <Dock />
      </div>
    </SidebarProvider>
  );
};

export default page;
