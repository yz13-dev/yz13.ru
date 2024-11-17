import { CalendarIcon, CheckCircleIcon, HomeIcon, MapIcon } from "lucide-react";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "mono/components/sidebar";
import Link from "next/link";
import Header from "./header";

const AppSidebar = async () => {
  return (
    <Sidebar collapsible="icon"  >
      <Header />
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>

            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="/">
                  <HomeIcon size={16} />
                  <span>Workspace</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="/tasks">
                  <CheckCircleIcon size={16} />
                  <span>Tasks</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="/events">
                  <CalendarIcon size={16} />
                  <span>Events</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="/roadmap">
                  <MapIcon size={16} />
                  <span>Roadmap</span>
                </Link>
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
