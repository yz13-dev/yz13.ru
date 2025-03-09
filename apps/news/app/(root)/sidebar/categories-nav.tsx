import { LayoutListIcon } from "lucide-react";
import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "mono/components/sidebar";

const CategoriesNav = () => {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Категории</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <LayoutListIcon />
              <span>Каталог</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          {([] as any[]).map((item, index) => {
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

export default CategoriesNav;
