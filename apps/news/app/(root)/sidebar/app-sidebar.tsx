import { Sidebar, SidebarHeader } from "mono/components/sidebar";
import CategoriesNav from "./categories-nav";
import Header from "./header";
import SourcesNav from "./sources-nav";

const AppSidebar = () => {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <Header />
      </SidebarHeader>
      <CategoriesNav />
      <SourcesNav />
    </Sidebar>
  );
};

export default AppSidebar;
