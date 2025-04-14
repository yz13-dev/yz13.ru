import Dock from "@/components/dock/dock";
import PageDockFiller from "@/components/page-dock-filler";
import { NewspaperIcon } from "lucide-react";
import { SidebarProvider } from "mono/components/sidebar";
import { cn } from "yz13/cn";
import AppSidebar from "./sidebar/app-sidebar";
import SidebarTrigger from "./sidebar/sidebar-trigger";

const page = async () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="w-full divide-y">
        <div className="w-full">
          <div className="flex p-4 max-w-screen-2xl w-full mx-auto items-center gap-2">
            <SidebarTrigger />
            <span className="text-2xl font-medium">Блог</span>
          </div>
        </div>
        <div className="w-full">
          <div className="w-full max-w-screen-2xl mx-auto border-x flex flex-row divide-x overflow-x-auto">
            <div
              className={cn(
                "w-80 shrink-0 relative space-y-3 p-4 hover:bg-neutral-100 transition-colors",
                "last:border-r group flex flex-col justify-between",
              )}
            >
              <div className="flex flex-row items-center gap-1">
                <div className="size-6 flex items-center justify-center">
                  <NewspaperIcon size={16} />
                </div>
                <span className="font-medium relative line-clamp-1">
                  Заголовок поста
                </span>
              </div>
              <span className="text-foreground block text-sm">
                Описание поста
              </span>
            </div>
          </div>
        </div>
        <PageDockFiller />
        <Dock />
      </div>
    </SidebarProvider>
  );
};

export default page;
