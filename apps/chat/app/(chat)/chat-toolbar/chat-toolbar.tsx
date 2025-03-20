"use client";
import {
  ListTodoIcon,
  MessageCircleIcon,
  SettingsIcon,
  UsersIcon,
} from "lucide-react";
import { Button } from "mono/components/button";
import Link from "next/link";
import { useMemo } from "react";
import { useChatApi } from "../chat-api/chat-provider";

type ChatToolbarProps = {
  chatId?: string;
};
const ChatToolbar = ({ chatId }: ChatToolbarProps) => {
  const chat = useChatApi((state) => state.chat);
  const isGroupChat = useMemo(() => chat?.type === "group", [chat]);
  return (
    <div className="w-fit md:px-4 shrink-0 px-2 h-fit sticky right-0 top-1/3 flex flex-col items-center justify-center gap-2">
      <Button size="icon" variant="secondary" asChild>
        <Link href={`/${chatId}`}>
          <MessageCircleIcon size={16} />
        </Link>
      </Button>
      <Button size="icon" variant="secondary" asChild>
        <Link href={`/${chatId}/tasks`}>
          <ListTodoIcon size={16} />
        </Link>
      </Button>
      {isGroupChat && (
        <Button size="icon" variant="secondary">
          <Link href={`/${chatId}/invite`}>
            <UsersIcon size={16} />
          </Link>
        </Button>
      )}
      <Button size="icon" variant="secondary" asChild>
        <Link href={`/${chatId}/settings`}>
          <SettingsIcon size={16} />
        </Link>
      </Button>
    </div>
  );
};

export default ChatToolbar;
