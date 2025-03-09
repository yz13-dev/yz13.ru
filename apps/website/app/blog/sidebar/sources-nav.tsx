import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "mono/components/sidebar";
import sources from "../data/sources";

const SourcesNav = () => {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Источники</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {sources.map((item, index) => {
            return (
              <SidebarMenuItem key={`${item.id}/${index}`}>
                <SidebarMenuButton>
                  {item.icon}
                  <span>{item.name}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

export default SourcesNav;
