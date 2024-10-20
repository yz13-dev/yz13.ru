"use client"
import { SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarTrigger, useSidebar } from "@yz13/mono/components/sidebar"
import { SearchIcon, SidebarIcon } from "lucide-react"
import { cn } from "yz13/cn"
import { Logo } from "../logo"


const Header = () => {
  const { toggleSidebar, state } = useSidebar()
  const isCollapsed = state === "collapsed"
  return (
    <SidebarHeader>
      <SidebarMenu className={cn(
        "flex items-center justify-end gap-2",
        isCollapsed ? "flex-col" : "flex-row"
      )}>

        <SidebarMenuItem className="size-8 mr-auto">
          <SidebarMenuButton>
            <Logo className="w-full h-full" />
          </SidebarMenuButton>
        </SidebarMenuItem>

        <SidebarMenuItem className="size-8">
          <SidebarMenuButton>
            <SearchIcon size={16} />
          </SidebarMenuButton>
        </SidebarMenuItem>

        <SidebarMenuItem className="size-8">
          <SidebarMenuButton onClick={toggleSidebar}>
            <SidebarIcon size={16} />
          </SidebarMenuButton>
        </SidebarMenuItem>

      </SidebarMenu>
    </SidebarHeader>
  )
}
export default Header
