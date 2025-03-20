"use client";
import { ChatList } from "@/types/chat";
import { TrashIcon } from "lucide-react";
import { Button } from "mono/components/button";
import { useMemo } from "react";
import { useChatApi } from "../../chat-api/chat-provider";

const TaskLists = () => {
  const chat = useChatApi((state) => state.chat);
  const tasks_lists = useMemo(
    () => (chat ? chat.task_lists : []) as ChatList[],
    [chat],
  );
  const tasks = useChatApi((state) => state.tasks);
  return (
    <ul className="w-full flex flex-wrap items-start gap-1">
      {tasks_lists.map((list) => {
        const tasksInList = tasks.filter((task) => task.task_list === list.id);
        return (
          <li
            key={list.id}
            className="w-fit py-2 px-3 rounded-lg flex items-center gap-3 border"
          >
            <div className="flex flex-col">
              <span className="text-sm">{list.name}</span>
              <span className="text-xs text-secondary">
                {tasksInList.length} задач
              </span>
            </div>
            <Button variant="ghost" size="icon" className="size-8">
              <TrashIcon size={16} />
            </Button>
          </li>
        );
      })}
    </ul>
  );
};

export default TaskLists;
