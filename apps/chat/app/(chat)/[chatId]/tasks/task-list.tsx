"use client";
import { deleteTask, updateTask } from "@/actions/chats/tasks";
import { ChatTask } from "@/types/chat";
import { EllipsisVerticalIcon, TrashIcon } from "lucide-react";
import { Button } from "mono/components/button";
import { Checkbox } from "mono/components/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "mono/components/dropdown-menu";
import { useEffect, useState } from "react";
import { cn } from "yz13/cn";
import { deleteTask as removeTask, setTasks } from "../../chat-api/chat-api";
import { useChatApi } from "../../chat-api/chat-provider";

const Task = ({ task }: { task: ChatTask }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const handleCheckboxChange = async () => {
    setLoading(true);
    try {
      await updateTask(task.id, {
        checked: !task.checked,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div
      aria-checked={task.checked ?? false}
      data-state={task.checked ?? false}
      className="w-full group min-h-11 flex items-center justify-start rounded-xl border gap-2 p-2"
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
          <span
            className={cn(
              task.checked ? "text-secondary line-through" : "",
              task.note?.length !== 0 && "text-sm",
            )}
          >
            {task.title}
          </span>
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
          <Button variant="ghost" size="icon" className="size-8">
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

const TaskList = ({ tasks: providedTasks }: { tasks: ChatTask[] }) => {
  const tasks = useChatApi((state) => state.tasks);
  useEffect(() => {
    if (providedTasks.length === 0) return;
    setTasks(providedTasks);
  }, [providedTasks]);
  return (
    <div className="w-full space-y-3 px-4">
      {tasks
        .sort((a, b) => Number(b.checked) - Number(a.checked))
        .map((task, index) => {
          return <Task key={task.id} task={task} />;
        })}
    </div>
  );
};

export default TaskList;
