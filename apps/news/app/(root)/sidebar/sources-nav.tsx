import { getNewsSources } from "rest-api/sources";
import { ArrowUpRightIcon, NotebookTabsIcon } from "lucide-react";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
} from "mono/components/sidebar";
import Link from "next/link";

const SourcesNav = async () => {
  const { data: sources } = await getNewsSources("RU");
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Источники</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {(sources ?? []).map((item, index) => {
            return (
              <SidebarMenuItem
                key={`${item.id}/${index}`}
                className="text-secondary hover:text-foreground transition-colors"
              >
                <SidebarMenuButton asChild>
                  <Link href={item.url} target="_blank">
                    <NotebookTabsIcon />
                    <span>{item.name}</span>
                  </Link>
                </SidebarMenuButton>
                <SidebarMenuAction>
                  <ArrowUpRightIcon className="text-inherit" />
                </SidebarMenuAction>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

export default SourcesNav;
