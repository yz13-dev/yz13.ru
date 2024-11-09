import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@yz13/mono/components/sidebar";
import { HomeIcon } from "lucide-react";
import Header from "./header";

const AppSidebar = async () => {
  return (
    <Sidebar collapsible="icon"  >
      <Header />
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>

            <SidebarMenuItem>
              <SidebarMenuButton>
                <HomeIcon size={16} />
                <span>Home</span>
              </SidebarMenuButton>
            </SidebarMenuItem>

          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}

export default AppSidebar;
