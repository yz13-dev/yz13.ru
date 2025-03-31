"use client";
import { updateChat } from "rest-api/chats";
import { getUserById } from "rest-api/user";
import { ChatRoom } from "rest-api/types/chats";
import dayjs from "dayjs";
import "dayjs/locale/ru";
import customParseFormat from "dayjs/plugin/customParseFormat";
import relativeTime from "dayjs/plugin/relativeTime";
import { MessageCircleIcon, StarIcon, UserIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "mono/components/avatar";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
} from "mono/components/sidebar";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { UserObject } from "rest-api/types/user";
import { cn } from "yz13/cn";
import { updateChatInList } from "../chat-api/chat-api";
import { useChatApi } from "../chat-api/chat-provider";
import { useDebounceEffect } from "ahooks";

dayjs.extend(customParseFormat);
dayjs.extend(relativeTime);

const Participant = ({
  uid,
  className = "",
}: {
  uid: string;
  className?: string;
}) => {
  const [user, setUser] = useState<UserObject | null>();
  const [loading, setLoading] = useState<boolean>(true);
  const handleUser = async (uid: string) => {
    const { data: user } = await getUserById(uid);
    if (!user) {
      setLoading(false);
      return;
    }
    setUser(user);
    setLoading(false);
  };
  useDebounceEffect(
    () => {
      handleUser(uid);
      () => {
        setUser(null);
      };
    },
    [uid],
    { wait: 1000 },
  );
  if (!user || loading)
    return (
      <div
        className={cn(
          "size-5 rounded-full border bg-background-secondary",
          className,
        )}
      />
    );
  else
    return (
      <Avatar
        className={cn(
          "size-5 rounded-full border bg-background-secondary",
          className,
        )}
      >
        <AvatarImage src={user.avatar_url ?? undefined} />
        <AvatarFallback className="p-0.5">
          <UserIcon />
        </AvatarFallback>
      </Avatar>
    );
};
export const ChatParticipants = ({
  uids,
  className = "",
  avatarClassName = "",
}: {
  uids: string[];
  className?: string;
  avatarClassName?: string;
}) => {
  return (
    <div className={cn("h-fit -space-x-2.5 *:inline-block", className)}>
      {uids.map((uid) => (
        <Participant key={uid} uid={uid} className={avatarClassName} />
      ))}
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
    <div className="w-full flex items-center gap-0 group/history">
      <div className="size-10 relative">
        <div className="size-10 shrink-0 rounded-full border group-hover/history:bg-background-secondary group-hover/history:border-foreground transition-colors flex items-center justify-center">
          <MessageCircleIcon size={16} className="text-secondary" />
        </div>
        {chat.type === "group" && (
          <ChatParticipants
            className="w-fit shrink-0 absolute -bottom-1 -right-1.5 -space-x-2"
            avatarClassName="size-4 text-xs"
            uids={chat.chat_participants ?? [chat.from_id]}
          />
        )}
      </div>
      <div className="w-full relative flex flex-col gap-0.5 cursor-pointer py-1 px-2">
        <div className="flex w-full items-center justify-between">
          <Link
            href={`/${chat.id}`}
            className="font-medium inline-flex group/link items-center gap-1 text-start"
          >
            {chat.name || "Без названия"}
          </Link>
          <button
            onClick={handleFavoriteChat}
            className="size-5 flex items-center cursor-pointer justify-center text-secondary hover:text-foreground transition-colors gap-0"
          >
            <StarIcon
              size={16}
              className={cn(
                "transition-colors",
                chat.favorite
                  ? "fill-yellow-foreground/25 stroke-yellow-foreground"
                  : "fill-neutral-200/25 stroke-neutral-300",
              )}
            />
          </button>
        </div>
        <div className="flex w-full items-center justify-start text-xs text-secondary">
          <span className="font-medium capitalize">{typeLabel}</span>
        </div>
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
