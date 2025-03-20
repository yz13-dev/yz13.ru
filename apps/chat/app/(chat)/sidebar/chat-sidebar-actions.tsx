import { showTaskPageButton } from "@/const/flags";
import { ListTodoIcon, PlusIcon } from "lucide-react";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "mono/components/sidebar";
import Link from "next/link";

const ChatSidebarActions = async () => {
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
          {(await showTaskPageButton()) && (
            <>
              <SidebarSeparator />
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/tasks">
                    <ListTodoIcon />
                    <span>Задачи</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </>
          )}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};
export default ChatSidebarActions;
