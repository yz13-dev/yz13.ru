"use client"

import { SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarTrigger, useSidebar } from "@yz13/mono/components/sidebar"
import { SidebarIcon } from "lucide-react"


const Header = () => {
  const { toggleSidebar, state } = useSidebar()
  const isCollapsed = state === "collapsed"

  return (
    <SidebarHeader>
      <SidebarMenu>

        <SidebarMenuItem className="size-8">
          <SidebarMenuButton onClick={toggleSidebar}>
            <SidebarIcon size={16} className={isCollapsed ? "text-secondary" : "text-foreground"} />
          </SidebarMenuButton>
        </SidebarMenuItem>

      </SidebarMenu>
    </SidebarHeader>
  )
}
export default Header
