import { PlusIcon } from "lucide-react";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "mono/components/sidebar";
import Link from "next/link";

const ChatSidebarActions = () => {
  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/chat">
                <PlusIcon />
                <span>Новый личный чат</span>
              </Link>
            </SidebarMenuButton>
            <SidebarMenuButton asChild>
              <Link href="/chat">
                <PlusIcon />
                <span>Новый групповой чат</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};
export default ChatSidebarActions;
