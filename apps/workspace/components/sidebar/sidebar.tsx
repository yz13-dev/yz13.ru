import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@yz13/mono/components/sidebar"
import Header from "./header"
import { BriefcaseIcon, CalendarIcon, CheckCircleIcon } from "lucide-react"
import Footer from "./footer"


const AppSidebar = () => {
  return (
    <Sidebar collapsible="icon">
      <Header />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>

              <SidebarMenuItem>
                <SidebarMenuButton>
                  <CheckCircleIcon size={16} />
                  <span>My tasks</span>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton>
                  <CalendarIcon size={16} />
                  <span>Today</span>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton>
                  <BriefcaseIcon size={16} />
                  <span>Works</span>
                </SidebarMenuButton>
              </SidebarMenuItem>


            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Favorites</SidebarGroupLabel>
          <SidebarGroupContent>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <Footer />
    </Sidebar>

  )
}
export { AppSidebar }
