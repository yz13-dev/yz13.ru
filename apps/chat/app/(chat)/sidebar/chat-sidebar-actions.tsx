import { PlusIcon, SettingsIcon } from "lucide-react";
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
                <span>Новый чат</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarSeparator />
          <SidebarMenuButton asChild>
            <Link href="/settings">
              <SettingsIcon />
              <span>Настройки</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};
export default ChatSidebarActions;
