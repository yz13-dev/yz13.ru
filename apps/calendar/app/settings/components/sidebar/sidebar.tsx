import { CalendarIcon, PlusIcon } from "lucide-react";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupAction, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "mono/components/sidebar";
import Link from "next/link";
import type { Calendar } from "rest-api/types/calendar";

type Props = {
  calendars?: Calendar[]
}
export default function ({ calendars = [] }: Props) {
  return (
    <Sidebar className="top-16">
      <SidebarContent>
        <SidebarGroup className="px-4">
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
