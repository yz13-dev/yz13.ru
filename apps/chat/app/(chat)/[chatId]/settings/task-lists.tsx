"use client";
import { XIcon } from "lucide-react";
import { Button } from "mono/components/button";
import { useMemo, useState } from "react";
import { getTasks, updateTask } from "rest-api/tasks";
import { ChatList } from "rest-api/types/chats";
import { setChat } from "../../chat-api/chat-api";
import { useChatApi } from "../../chat-api/chat-provider";

const TaskLists = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const chat = useChatApi((state) => state.chat);
  const tasks_lists = useMemo(
    () => (chat ? chat.task_lists : []) as ChatList[],
    [chat],
  );
  const tasks = useChatApi((state) => state.tasks);
  const handleDeleteList = async (list: ChatList) => {
    if (!chat) return;
    setLoading(true);
    try {
      const { data } = await getTasks(chat.id, [
        { key: "filter", value: "list" },
        { key: "list", value: list.id },
      ]);
      const filteredLists = tasks_lists.filter((t) => t.id !== list.id);
      setChat({
        ...chat,
        task_lists: filteredLists,
      });
      const messages = data ?? [];
      if (messages.length === 0) return;
      await Promise.all(
        messages.map((message) => {
          return updateTask(chat.id, {
            task_list: null,
          });
        }),
      );
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <ul className="w-full h-full grid grid-cols-2 gap-2">
      {tasks_lists.map((list) => {
        const tasksInList = tasks.filter((task) => task.task_list === list.id);
        return (
          <li
            key={list.id}
            className="w-full flex items-center justify-between gap-2 pl-3 pr-1 py-1 rounded-lg border bg-background/60"
          >
            <div className="flex flex-col">
              <span className="text-sm">{list.name}</span>
              <span className="text-xs text-secondary">
                {tasksInList.length} задач
              </span>
            </div>
            <Button
              disabled={loading}
              variant="ghost"
              size="icon"
              onClick={() => handleDeleteList(list)}
            >
              <XIcon size={16} />
            </Button>
          </li>
        );
      })}
    </ul>
  );
};

export default TaskLists;
