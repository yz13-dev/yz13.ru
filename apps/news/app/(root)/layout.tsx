import { SidebarProvider } from "mono/components/sidebar";
import AppSidebar from "./sidebar/app-sidebar";

type LayoutProps = {
  children: React.ReactNode;
};
const layout = ({ children }: LayoutProps) => {
  return children;
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="w-full">{children}</div>
    </SidebarProvider>
  );
};

export default layout;
