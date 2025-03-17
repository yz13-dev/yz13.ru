"use client";

import { ChatList } from "@/types/chat";
import { Button } from "mono/components/button";
import { Separator } from "mono/components/separator";
import { useMemo } from "react";
import { useChatApi } from "../../chat-api/chat-provider";

const TaskLists = () => {
  const chat = useChatApi((state) => state.chat);
  const chatLists = useMemo(
    () => (chat ? chat.task_lists : []) as ChatList[],
    [chat],
  );
  return (
    <>
      <Button variant="secondary" size="sm">
        Все
      </Button>
      <Button variant="ghost" size="sm">
        Выполненные
      </Button>
      <Separator orientation="vertical" className="h-6" />
      {chatLists.map((list) => {
        return (
          <Button key={list.id} size="sm" variant="ghost">
            {list.name}
          </Button>
        );
      })}
    </>
  );
};

export default TaskLists;
