"use client";
import { deleteTask, updateTask } from "@/actions/chats/tasks";
import { ChatList, ChatTask } from "@/types/chat";
import { EllipsisVerticalIcon, TrashIcon } from "lucide-react";
import { Button } from "mono/components/button";
import { Checkbox } from "mono/components/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "mono/components/dropdown-menu";
import { useEffect, useMemo, useState } from "react";
import { cn } from "yz13/cn";
import {
  deleteTask as removeTask,
  setTasks,
  updateTask as updateTaskInStore,
} from "../../chat-api/chat-api";
import { useChatApi } from "../../chat-api/chat-provider";

const TaskListTag = ({ task }: { task: ChatTask }) => {
  const chat = useChatApi((state) => state.chat);
  const task_lists = useMemo(
    () => (chat ? chat.task_lists : []) as ChatList[],
    [chat],
  );
  const task_list = useMemo(
    () => task_lists.find((list) => list.id === task.task_list),
    [task_lists, task.task_list],
  );
  if (!task_list) return null;
  else
    return (
      <span className="text-xs px-1.5 rounded-sm bg-background-secondary py-0.5 text-secondary">
        {task_list?.name}
      </span>
    );
};

const Task = ({ task }: { task: ChatTask }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const handleCheckboxChange = async () => {
    setLoading(true);
    try {
      const positiveTaskUpdate: ChatTask = {
        ...task,
        checked: !task.checked,
      };
      updateTaskInStore(positiveTaskUpdate);
      const res = await updateTask(task.id, positiveTaskUpdate);
      if (!res) updateTaskInStore(task);
    } catch (error) {
      console.error(error);
      updateTaskInStore(task);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div
      aria-checked={task.checked ?? false}
      data-state={task.checked ?? false}
      className="w-full group bg-background flex items-center justify-start rounded-xl border gap-2 p-2"
    >
      <div className="flex items-start gap-2">
        <Checkbox
          disabled={loading}
          className={cn(
            "size-6 shrink-0 rounded-md [&>span>svg]:size-4",
            loading && "animate-pulse",
          )}
          checked={task.checked ?? false}
          onClick={handleCheckboxChange}
        />
        <div className="w-full flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span
              className={cn(
                task.checked ? "text-secondary line-through" : "",
                task.note?.length !== 0 && "text-sm",
              )}
            >
              {task.title}
            </span>
            {typeof task.task_list === "number" && <TaskListTag task={task} />}
          </div>
          {!!task.note && task.note.length !== 0 && (
            <span
              className={cn(
                "text-xs text-secondary line-clamp-1",
                task.checked ? "text-secondary line-through" : "",
              )}
            >
              {task.note}
            </span>
          )}
        </div>
      </div>
      <div className="flex items-center shrink-0 ml-auto gap-2">
        <TaskDropdown id={task.id}>
          <Button variant="ghost" size="icon" className="size-6">
            <EllipsisVerticalIcon size={16} />
          </Button>
        </TaskDropdown>
      </div>
    </div>
  );
};

const TaskDropdown = ({
  id,
  children,
}: {
  children: React.ReactNode;
  id: string;
}) => {
  const handleDeleteTask = async () => {
    if (!id) return;
    try {
      const res = await deleteTask(id);
      if (res) removeTask(res.id);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem className="gap-2" onClick={handleDeleteTask}>
          <TrashIcon size={16} />
          <span>Удалить задачу</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

// tasks_filter_list === null - all
// tasks_filter_list === -1 - completed
// tasks_filter_list >= 0 - created task list
const applyFilter = (tasks: ChatTask[], tasks_filter_list: number | null) => {
  if (tasks_filter_list === null) return tasks;
  else if (tasks_filter_list === -1)
    return tasks.filter((task) => task.checked);
  else if (tasks_filter_list === -2)
    return tasks.filter((task) => !task.checked);
  else return tasks.filter((task) => task.task_list === tasks_filter_list);
};
const TaskList = ({ tasks: providedTasks }: { tasks: ChatTask[] }) => {
  const tasks = useChatApi((state) => state.tasks);
  const tasks_filter_list = useChatApi((state) => state.tasks_filter_list);
  useEffect(() => {
    if (providedTasks.length === 0) return;
    setTasks(providedTasks);
  }, [providedTasks]);
  const list = applyFilter(tasks, tasks_filter_list);
  return (
    <div className="w-full space-y-3 px-4">
      {list.length === 0 && (
        <div className="text-center text-sm text-secondary">Нет задач</div>
      )}
      {list.map((task, index) => {
        return <Task key={task.id} task={task} />;
      })}
    </div>
  );
};

export default TaskList;
