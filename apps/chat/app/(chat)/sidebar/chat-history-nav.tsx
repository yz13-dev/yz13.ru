"use client";
import { ChatRoom } from "@/types/chat";
import dayjs from "dayjs";
import "dayjs/locale/ru";
import customParseFormat from "dayjs/plugin/customParseFormat";
import relativeTime from "dayjs/plugin/relativeTime";
import { ArrowRightIcon, StarIcon } from "lucide-react";
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
  return (
    <>
      <SidebarGroup>
        <SidebarGroupLabel>Избранные чаты</SidebarGroupLabel>
      </SidebarGroup>
      <SidebarGroup>
        <SidebarGroupLabel>Чаты</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {chats.map((chat) => {
              const date = dayjs(chat.created_at).locale("ru");
              return (
                <SidebarMenuItem key={chat.id}>
                  <div className="w-full relative flex flex-col gap-1.5 cursor-pointer py-1 px-2">
                    <div className="flex w-full items-center justify-between">
                      <Link
                        href={`/${chat.id}`}
                        className="font-medium inline-flex group/link items-center gap-1 text-start"
                      >
                        {chat.name || "Без названия"}
                        <ArrowRightIcon
                          size={16}
                          className="relative group-hover/link:translate-x-1 transition-all"
                        />
                      </Link>
                      <button className="size-5 flex items-center cursor-pointer justify-center text-secondary hover:text-foreground transition-colors gap-0">
                        <StarIcon size={16} />
                      </button>
                    </div>
                    <div className="flex w-full items-center justify-between text-xs text-secondary">
                      <span className="font-medium capitalize">
                        {date.format("MMM DD, YYYY")}
                      </span>
                      <span className="font-medium">
                        {date.format("HH:mm")}
                      </span>
                    </div>
                  </div>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </>
  );
};
export default ChatHistoryNav;
