import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
} from "mono/components/sidebar";

const ChatSidebarUsage = () => {
  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarGroupLabel>Использование</SidebarGroupLabel>
        <SidebarMenu className="space-y-2">
          <SidebarMenuItem className="px-2 flex items-center gap-2">
            <div className="size-8 rounded-full border-4" />
            <div className="flex flex-col">
              <span className="text-sm font-medium">Чаты</span>
              <div className="flex items-center gap-1">
                <span className="text-xs text-foreground">2</span>
                <span className="text-xs text-secondary">из 25</span>
              </div>
            </div>
          </SidebarMenuItem>
          <SidebarMenuItem className="px-2 flex items-center gap-2">
            <div className="size-8 rounded-full border-4" />
            <div className="flex flex-col">
              <span className="text-sm font-medium">Память</span>
              <div className="flex items-center gap-1">
                <span className="text-xs text-foreground">1 ГБ</span>
                <span className="text-xs text-secondary">из 2ГБ</span>
              </div>
            </div>
          </SidebarMenuItem>
          <SidebarMenuItem className="px-2 flex items-center gap-2">
            <div className="size-8 rounded-full border-4" />
            <div className="flex flex-col">
              <span className="text-sm font-medium">Списки задач</span>
              <div className="flex items-center gap-1">
                <span className="text-xs text-foreground">1</span>
                <span className="text-xs text-secondary">из 10</span>
              </div>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};
export default ChatSidebarUsage;
