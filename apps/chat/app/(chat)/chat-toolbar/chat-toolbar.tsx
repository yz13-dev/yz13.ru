"use client";
import {
  ListTodoIcon,
  MessageCircleIcon,
  SettingsIcon,
  UsersIcon,
} from "lucide-react";
import { Button } from "mono/components/button";
import { Separator } from "mono/components/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "mono/components/tooltip";
import Link from "next/link";
import { useMemo } from "react";
import { cn } from "yz13/cn";
import { useChatApi } from "../chat-api/chat-provider";

type ChatToolbarProps = {
  showTopics?: boolean;
  chatId?: string;
  className?: string;
};
const ChatToolbar = ({
  showTopics = false,
  chatId,
  className = "",
}: ChatToolbarProps) => {
  const chat = useChatApi((state) => state.chat);
  const isGroupChat = useMemo(() => chat?.type === "group", [chat]);
  return (
    <div
      className={cn(
        "w-fit pr-4 shrink-0 h-full sticky right-0 md:top-1/3 top-2/3 flex flex-col items-center md:justify-center justify-end gap-2",
        className,
      )}
    >
      {showTopics && (
        <>
          <Separator />
        </>
      )}
      <Tooltip delayDuration={10}>
        <TooltipTrigger asChild>
          <Button size="icon" variant="secondary" asChild>
            <Link href={`/${chatId}`}>
              <MessageCircleIcon size={16} />
            </Link>
          </Button>
        </TooltipTrigger>
        <TooltipContent side="left">
          <span>Чат</span>
        </TooltipContent>
      </Tooltip>
      <Tooltip delayDuration={10}>
        <TooltipTrigger asChild>
          <Button size="icon" variant="secondary" asChild>
            <Link href={`/${chatId}/tasks`}>
              <ListTodoIcon size={16} />
            </Link>
          </Button>
        </TooltipTrigger>
        <TooltipContent side="left">
          <span>Задачи</span>
        </TooltipContent>
      </Tooltip>
      {isGroupChat && (
        <Tooltip delayDuration={10}>
          <TooltipTrigger asChild>
            <Button size="icon" variant="secondary">
              <Link href={`/${chatId}/invite`}>
                <UsersIcon size={16} />
              </Link>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left">
            <span>Пригласить</span>
          </TooltipContent>
        </Tooltip>
      )}
      <Tooltip delayDuration={10}>
        <TooltipTrigger asChild>
          <Button size="icon" variant="secondary" asChild>
            <Link href={`/${chatId}/settings`}>
              <SettingsIcon size={16} />
            </Link>
          </Button>
        </TooltipTrigger>
        <TooltipContent side="left">
          <span>Настройки</span>
        </TooltipContent>
      </Tooltip>
    </div>
  );
};

export default ChatToolbar;
