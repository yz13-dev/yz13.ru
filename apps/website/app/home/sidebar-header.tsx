"use client"
import { SearchIcon, SidebarIcon } from "lucide-react"
import { SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "mono/components/sidebar"
import Link from "next/link"
import { cn } from "yz13/cn"
import { Logo } from "@/components/logo"


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
          <Logo className="w-full h-full" />
        </SidebarMenuItem>

        <SidebarMenuItem className="size-8">
          <SidebarMenuButton asChild>
            <Link href="/search">
              <SearchIcon size={16} />
            </Link>
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
