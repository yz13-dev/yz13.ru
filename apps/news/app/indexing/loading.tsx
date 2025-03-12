import { Loader2Icon } from "lucide-react";
import { SidebarProvider } from "mono/components/sidebar";
import SidebarSkeleton from "../(root)/sidebar/skeleton";
const loading = () => {
  return (
    <SidebarProvider>
      <SidebarSkeleton />
      <div className="w-full h-dvh flex items-center justify-center">
        <Loader2Icon className="animate-spin" />
      </div>
    </SidebarProvider>
  );
};
export default loading;
