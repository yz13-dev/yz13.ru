"use client";
import {
  Code2Icon,
  CodeIcon,
  ListTodoIcon,
  MessageCircleIcon,
  PlusIcon,
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
import { showChatCode } from "@/const/flags";

type ChatToolbarProps = {
  showTopics?: boolean;
  showCode?: boolean;
  chatId?: string;
  className?: string;
};
const ChatToolbar = ({
  showTopics = false,
  showCode = false,
  chatId,
  className = "",
}: ChatToolbarProps) => {
  const chat = useChatApi((state) => state.chat);
  const isGroupChat = useMemo(() => chat?.type === "group", [chat]);
  return (
    <div
      className={cn(
        "w-12 shrink-0 h-dvh sticky border-l top-0 pb-[116px] flex flex-col items-center md:justify-center justify-end gap-2",
        className,
      )}
    >
      {showTopics && (
        <>
          <Button size="icon" variant="secondary" asChild>
            <Link href={`/${chatId}/works`}>
              <PlusIcon size={16} />
            </Link>
          </Button>
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
      {showCode && (
        <Tooltip delayDuration={10}>
          <TooltipTrigger asChild>
            <Button size="icon" variant="secondary" asChild>
              <Link href={`/${chatId}/code`}>
                <Code2Icon size={16} />
              </Link>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left">
            <span>Код</span>
          </TooltipContent>
        </Tooltip>
      )}
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
