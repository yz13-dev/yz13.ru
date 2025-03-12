import {
  Sidebar,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuSkeleton,
} from "mono/components/sidebar";

const SidebarSkeleton = () => {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenuSkeleton />
      </SidebarHeader>
      <SidebarGroup>
        <SidebarGroupLabel>Категории</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuSkeleton />
            <SidebarMenuSkeleton />
            <SidebarMenuSkeleton />
            <SidebarMenuSkeleton />
            <SidebarMenuSkeleton />
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
      <SidebarGroup>
        <SidebarGroupLabel>Источники</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuSkeleton />
            <SidebarMenuSkeleton />
            <SidebarMenuSkeleton />
            <SidebarMenuSkeleton />
            <SidebarMenuSkeleton />
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </Sidebar>
  );
};
export default SidebarSkeleton;
