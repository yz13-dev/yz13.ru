import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@yz13/mono/components/sidebar";
import { CalendarIcon, CheckCircleIcon, HomeIcon, MapIcon } from "lucide-react";
import Header from "./header";
import Link from "next/link";

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
