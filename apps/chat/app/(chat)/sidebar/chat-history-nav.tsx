"use client";
import { updateChat } from "@/actions/chats/chats";
import { getUserById } from "@/actions/user/user";
import { ChatRoom } from "@/types/chat";
import dayjs from "dayjs";
import "dayjs/locale/ru";
import customParseFormat from "dayjs/plugin/customParseFormat";
import relativeTime from "dayjs/plugin/relativeTime";
import { ArrowRightIcon, StarIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "mono/components/avatar";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
} from "mono/components/sidebar";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { UserObject } from "types/user";
import { cn } from "yz13/cn";
import { updateChatInList } from "../chat-api/chat-api";
import { useChatApi } from "../chat-api/chat-provider";

dayjs.extend(customParseFormat);
dayjs.extend(relativeTime);

const ChatParticipants = ({
  uids,
  className = "",
}: {
  uids: string[];
  className?: string;
}) => {
  const [users, setUsers] = useState<UserObject[]>([]);
  const handleAddUser = useCallback(
    (user: UserObject) => {
      const isAlreadyAdded = users.some((usr) => usr.id === user.id);
      if (isAlreadyAdded) return;
      setUsers((users) => {
        const hasUser = users.some((usr) => usr.id === user.id);
        if (hasUser) return users;
        else return [...users, user];
      });
    },
    [users],
  );
  useEffect(() => {
    uids.forEach(async (uid) => {
      const user = await getUserById(uid);
      if (!user) return;
      handleAddUser(user);
    });
    () => {
      setUsers([]);
    };
  }, [uids]);
  return (
    <div className={cn("h-5 -space-x-2.5 *:inline-block", className)}>
      {users.map((user) => {
        return (
          <Avatar
            key={user.id}
            className="size-5 rounded-full border bg-background-secondary"
          >
            <AvatarImage src={user.avatar_url ?? undefined} />
            <AvatarFallback className="uppercase">
              {(user.username || user.id).slice(0, 2)}
            </AvatarFallback>
          </Avatar>
        );
      })}
    </div>
  );
};
const HistoryItem = ({ chat }: { chat: ChatRoom }) => {
  const chat_type = chat.type;
  const typeLabel = chat_type === "personal" ? "Личный чат" : "Групповый чат";
  const handleFavoriteChat = async () => {
    const favorite = chat ? !chat.favorite : false;
    try {
      const updatedChat = await updateChat(chat.id, {
        favorite,
      });
      if (updatedChat) updateChatInList(updatedChat);
    } catch (error) {
      console.error(error);
    }
  };
  return (
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
        <button
          onClick={handleFavoriteChat}
          className="size-5 flex items-center cursor-pointer justify-center text-secondary hover:text-foreground transition-colors gap-0"
        >
          <StarIcon
            size={16}
            className={chat.favorite ? "text-yellow-foreground" : ""}
          />
        </button>
      </div>
      <div className="flex w-full items-center justify-start text-xs text-secondary">
        <span className="font-medium capitalize">{typeLabel}</span>
        {chat.type === "group" && (
          <ChatParticipants
            className="ml-auto"
            uids={chat.chat_participants ?? [chat.from_id]}
          />
        )}
      </div>
    </div>
  );
};

const ChatHistoryNav = () => {
  const chats = useChatApi((chat) => chat.chats);
  const favoriteChats = useMemo(
    () => chats.filter((chat) => chat.favorite),
    [chats],
  );
  const notFavoriteChats = useMemo(
    () => chats.filter((chat) => !chat.favorite),
    [chats],
  );
  return (
    <>
      {favoriteChats.length !== 0 && (
        <SidebarGroup>
          <SidebarGroupLabel>Избранные чаты</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {favoriteChats.map((chat) => {
                return (
                  <SidebarMenuItem key={chat.id}>
                    <HistoryItem chat={chat} />
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      )}
      <SidebarGroup>
        <SidebarGroupLabel>Чаты</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {notFavoriteChats.map((chat) => {
              return (
                <SidebarMenuItem key={chat.id}>
                  <HistoryItem chat={chat} />
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
