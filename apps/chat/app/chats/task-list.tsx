"use client";
import { ChatTask } from "rest-api/types/chats";
import { Task } from "../(chat)/[chatId]/tasks/task-list";
import { useEffect, useMemo, useState } from "react";
import { createClient } from "yz13/supabase/client";
import { updateTask } from "rest-api/tasks";

const TaskList = ({ defaultTasks = [] }: { defaultTasks?: ChatTask[] }) => {
  const [tasks, setTasks] = useState<ChatTask[]>(defaultTasks);
  const taskIds = useMemo(() => {
    const ids = tasks.map((task) => task.id);
    return ids;
  }, [defaultTasks]);
  const handleCheckTask = async (task: ChatTask) => {
    try {
      const positiveTaskUpdate: ChatTask = {
        ...task,
        checked: !task.checked,
      };
      const res = await updateTask(task.id, positiveTaskUpdate);
      if (res) {
        setTasks((tasks) =>
          tasks.map((task) => (task.id === res.id ? res : task)),
        );
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    const client = createClient();
    const channel = client.channel(`tasks-in-chats`);
    const filter = `id=in.${taskIds.join(",")}`;
    channel
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "chats-tasks",
          filter,
        },
        (payload) => {
          const event = payload.eventType;
          const isInsert = event === "INSERT";
          const isUpdate = event === "UPDATE";
          const isDelete = event === "DELETE";
          if (isInsert) {
            const newTask = payload.new as ChatTask;
            setTasks((tasks) => [...tasks, newTask]);
          }
          if (isUpdate) {
            const updatedTask = payload.new as ChatTask;
            setTasks((tasks) =>
              tasks.map((task) =>
                task.id === updatedTask.id ? updatedTask : task,
              ),
            );
          }
          if (isDelete) {
            const deletedTask = payload.old as ChatTask;
            setTasks((tasks) =>
              tasks.filter((task) => task.id !== deletedTask.id),
            );
          }
        },
      )
      .subscribe();
    return () => {
      channel.unsubscribe();
    };
  }, [taskIds]);
  return (
    <ul className="rounded-xl border divide-y">
      {tasks.map((task) => (
        <li
          key={task.id}
          className="flex gap-2 min-h-9 bg-background text-secondary items-center first:rounded-t-xl last:rounded-b-xl"
        >
          <Task task={task} onCheckboxChange={handleCheckTask} />
        </li>
      ))}
    </ul>
  );
};
export default TaskList;
