"use client"
import { LockIcon, LockOpenIcon, SidebarIcon } from "lucide-react"
import { SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "mono/components/sidebar"
import { cn } from "yz13/cn"


const ProductivitySidebarHeader = ({ workspace }: { workspace?: any }) => {
  const { state, toggleSidebar } = useSidebar()
  const isExpanded = state === "expanded"
  const isPublic = workspace?.public || false
  return (
    <SidebarHeader>
      <SidebarMenu className={cn(
        "w-full flex items-center gap-2 justify-between",
        isExpanded ? "flex-row" : "flex-col"

      )}>
        <SidebarMenuItem>
          <SidebarMenuButton>
            {
              isPublic
                ? <LockOpenIcon size={16} />
                : <LockIcon size={16} />
            }
            <span className="text-lg font-semibold text-foreground/80">{isPublic ? "Public" : "Private"}</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuButton
            onClick={() => toggleSidebar()}
            className="size-9 flex items-center justify-center" size="icon" variant="ghost"
          >
            <SidebarIcon />
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
  )
}

export default ProductivitySidebarHeader