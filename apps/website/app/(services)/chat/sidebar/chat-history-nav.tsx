import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
} from "mono/components/sidebar";

const ChatHistoryNav = () => {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Сегодня</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <button className="w-full flex flex-col gap-1.5 cursor-pointer py-1 px-2 rounded-lg hover:bg-foreground/10 transition-colors">
              <span className="font-medium block text-start">Заголовок</span>
              <div className="flex w-full items-center justify-between text-xs text-secondary">
                <span className="font-medium">Окт 25, 2025</span>
                <span className="font-medium">13:00</span>
              </div>
            </button>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};
export default ChatHistoryNav;
