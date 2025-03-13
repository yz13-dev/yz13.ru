"use client";
import dayjs from "dayjs";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
} from "mono/components/sidebar";
import Link from "next/link";
import { useChatApi } from "../chat-api/chat-provider";

const ChatHistoryNav = () => {
  const chats = useChatApi((chat) => chat.chats);
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Сегодня</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {chats.map((chat) => {
            const date = dayjs(chat.created_at);
            return (
              <SidebarMenuItem key={chat.id}>
                <div className="w-full relative flex flex-col gap-1.5 cursor-pointer py-1 px-2 rounded-lg hover:bg-foreground/10 transition-colors">
                  <span className="font-medium block text-start">
                    Заголовок
                  </span>
                  <div className="flex w-full items-center justify-between text-xs text-secondary">
                    <span className="font-medium">
                      {date.format("MMM DD, YYYY")}
                    </span>
                    <span className="font-medium">{date.format("HH:mm")}</span>
                  </div>
                  <Link
                    href={`/chat/${chat.id}`}
                    className="absolute top-0 left-0 w-full h-full"
                  />
                </div>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};
export default ChatHistoryNav;
