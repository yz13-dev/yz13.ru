"use client";
import { ChatRoom } from "@/types/chat";
import dayjs from "dayjs";
import "dayjs/locale/ru";
import customParseFormat from "dayjs/plugin/customParseFormat";
import relativeTime from "dayjs/plugin/relativeTime";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
} from "mono/components/sidebar";
import Link from "next/link";
import { useChatApi } from "../chat-api/chat-provider";

dayjs.extend(customParseFormat);
dayjs.extend(relativeTime);

const groupChatsByDate = (chats: ChatRoom[]) => {
  const groupedChats: { [key: string]: ChatRoom[] } = {};
  chats.forEach((chat) => {
    const date = dayjs(chat.created_at);
    const dateKey = date.format("YYYY-MM-DD");
    if (!groupedChats[dateKey]) {
      groupedChats[dateKey] = [];
    }
    groupedChats[dateKey].push(chat);
  });
  return groupedChats;
};

const ChatHistoryNav = () => {
  const chats = useChatApi((chat) => chat.chats);
  const groupedChats = groupChatsByDate(chats);
  const groupKeys = Object.keys(groupedChats);
  return (
    <>
      {groupKeys.map((key) => {
        const chats = groupedChats[key] ?? [];
        const date = dayjs(key, "YYYY-MM-DD").locale("ru");
        const isToday = dayjs().locale("ru").isSame(date, "day");
        return (
          <SidebarGroup key={key}>
            <SidebarGroupLabel>
              {isToday ? "Сегодня" : date.fromNow()}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {chats.map((chat) => {
                  const date = dayjs(chat.created_at).locale("ru");
                  return (
                    <SidebarMenuItem key={chat.id}>
                      <div className="w-full relative flex flex-col gap-1.5 cursor-pointer py-1 px-2 rounded-lg hover:bg-foreground/10 transition-colors">
                        <span className="font-medium block text-start">
                          {chat.name || "Без названия"}
                        </span>
                        <div className="flex w-full items-center justify-between text-xs text-secondary">
                          <span className="font-medium capitalize">
                            {date.format("MMM DD, YYYY")}
                          </span>
                          <span className="font-medium">
                            {date.format("HH:mm")}
                          </span>
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
      })}
    </>
  );
};
export default ChatHistoryNav;
