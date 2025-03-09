import { Sidebar } from "mono/components/sidebar";
import CategoriesNav from "./categories-nav";
import SourcesNav from "./sources-nav";

const AppSidebar = () => {
  return (
    <Sidebar collapsible="icon">
      <CategoriesNav />
      <SourcesNav />
    </Sidebar>
  );
};

export default AppSidebar;
