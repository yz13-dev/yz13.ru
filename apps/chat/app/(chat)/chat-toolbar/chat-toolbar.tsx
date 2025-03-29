"use client";
import {
  ArrowRightIcon,
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "mono/components/popover";
import { Input } from "mono/components/input";

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
        "w-12 shrink-0 h-dvh sticky border-l top-0 pb-[116px] flex flex-col items-center md:justify-center justify-end gap-2",
        className,
      )}
    >
      {showTopics && (
        <>
          <Popover>
            <PopoverTrigger asChild>
              <Button size="icon" variant="secondary">
                <PlusIcon size={16} />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              side="left"
              align="center"
              className="p-3 space-y-3 rounded-xl"
            >
              <span className="text-sm font-medium block">Новая работа</span>
              <div className="flex items-center gap-2">
                <Input placeholder="Название работы" className="w-full" />
                <Button variant="secondary" size="icon" className="shrink-0">
                  <ArrowRightIcon size={16} />
                </Button>
              </div>
            </PopoverContent>
          </Popover>
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
