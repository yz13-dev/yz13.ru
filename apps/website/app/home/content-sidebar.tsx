import { SidebarContent, SidebarGroup, Sidebar, SidebarGroupLabel, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarInset, SidebarGroupContent } from "mono/components/sidebar"
import Header from "./sidebar-header"
import { HomeIcon } from "lucide-react"



const ContentSidebar = ({ className = "" }: { className?: string }) => {
  return (
    <Sidebar
      style={{
        // @ts-expect-error
        "--sidebar-background": "var(--yz13-background)",
      }}
      collapsible="icon"
      className="block bg-background"
    >
      <Header />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <HomeIcon size={16} />
                  <span>Home</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}

export default ContentSidebar
