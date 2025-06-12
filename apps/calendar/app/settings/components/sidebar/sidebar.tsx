import type { Calendar } from "@yz13/api/types/calendar";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupAction, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@yz13/ui/components/sidebar";
import { ArrowLeftIcon, CalendarIcon, PlusIcon } from "lucide-react";
import Link from "next/link";

type Props = {
  calendars?: Calendar[]
}
export default function ({ calendars = [] }: Props) {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/">
                <ArrowLeftIcon />
                <span>Вернуться</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Настройки календарей</SidebarGroupLabel>
          <SidebarGroupAction title="Создать календарь">
            <PlusIcon />
            <span className="sr-only">Создать календарь</span>
          </SidebarGroupAction>
          <SidebarGroupContent>
            <SidebarMenu>
              {
                calendars.map(calendar => {
                  return (
                    <SidebarMenuItem key={calendar.id}>
                      <SidebarMenuButton asChild>
                        <Link href={`/settings/calendar/${calendar.id}`}>
                          <CalendarIcon />
                          <span>{calendar.name}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                })
              }
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
