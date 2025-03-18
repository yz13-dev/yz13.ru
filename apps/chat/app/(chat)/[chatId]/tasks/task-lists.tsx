"use client";

import { ChatList } from "@/types/chat";
import { Button } from "mono/components/button";
import { Separator } from "mono/components/separator";
import { useMemo } from "react";
import { setTasksFilterList } from "../../chat-api/chat-api";
import { useChatApi } from "../../chat-api/chat-provider";

const TaskLists = () => {
  const chat = useChatApi((state) => state.chat);
  const tasks_filter_list = useChatApi((state) => state.tasks_filter_list);
  const chatLists = useMemo(
    () => (chat ? chat.task_lists : []) as ChatList[],
    [chat],
  );
  return (
    <>
      <Button
        variant={tasks_filter_list === null ? "secondary" : "ghost"}
        size="sm"
        onClick={() => {
          setTasksFilterList(null);
        }}
      >
        Все
      </Button>
      <Button
        variant={tasks_filter_list === -1 ? "secondary" : "ghost"}
        size="sm"
        onClick={() => {
          setTasksFilterList(-1);
        }}
      >
        Выполненные
      </Button>
      <Button
        variant={tasks_filter_list === -2 ? "secondary" : "ghost"}
        size="sm"
        onClick={() => {
          setTasksFilterList(-2);
        }}
      >
        Невыполненные
      </Button>
      <Separator orientation="vertical" className="h-6" />
      {chatLists.map((list) => {
        return (
          <Button
            key={list.id}
            size="sm"
            variant={tasks_filter_list === list.id ? "secondary" : "ghost"}
            onClick={() => {
              setTasksFilterList(list.id);
            }}
          >
            {list.name}
          </Button>
        );
      })}
    </>
  );
};

export default TaskLists;
