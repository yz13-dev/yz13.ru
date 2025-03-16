import { PlusIcon } from "lucide-react";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "mono/components/sidebar";
import Link from "next/link";

const ChatSidebarActions = () => {
  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/">
                <PlusIcon />
                <span>Личный чат</span>
              </Link>
            </SidebarMenuButton>
            <SidebarMenuButton asChild>
              <Link href="/">
                <PlusIcon />
                <span>Групповой чат</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarSeparator />
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};
export default ChatSidebarActions;
