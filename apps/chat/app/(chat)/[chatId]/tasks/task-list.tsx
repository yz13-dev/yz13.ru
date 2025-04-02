"use client";
import { deleteTask, updateTask } from "rest-api/tasks";
import { ChatList, ChatTask } from "rest-api/types/chats";
import { EllipsisVerticalIcon, TrashIcon } from "lucide-react";
import { Button } from "mono/components/button";
import { Checkbox } from "mono/components/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "mono/components/dropdown-menu";
import {
  useEffect,
  useMemo,
  useOptimistic,
  useState,
  useTransition,
} from "react";
import { cn } from "yz13/cn";
import {
  getChatTaskLists,
  getTask,
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

type TaskProps = {
  task: ChatTask;
  loading?: boolean;
  onCheckboxChange?: (task: ChatTask) => void;
  withDropdown?: boolean;
  withTag?: boolean;
};
export const Task = ({
  task,
  loading = false,
  onCheckboxChange,
  withDropdown = false,
  withTag = false,
}: TaskProps) => {
  const [isPending, startTransition] = useTransition();
  const [optTask, markTask] = useOptimistic(task, (state) => ({
    ...state,
    checked: !state.checked,
  }));
  const handleCheckboxChange = (checked: boolean) => {
    startTransition(() => {
      onCheckboxChange && onCheckboxChange(task);
      markTask(task);
    });
  };
  return (
    <div
      aria-checked={optTask.checked ?? false}
      data-state={optTask.checked ?? false}
      className="w-full group  flex items-center justify-start gap-2 p-2"
    >
      <div className="flex items-start gap-2">
        <Checkbox
          disabled={loading || isPending}
          className={cn(
            "size-6 shrink-0 rounded-md [&>span>svg]:size-4",
            loading && "animate-pulse",
          )}
          checked={optTask.checked ?? false}
          onCheckedChange={handleCheckboxChange}
          onClick={() => {
            // onCheckboxChange && onCheckboxChange(task);
          }}
        />
        <div className="w-full flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span
              className={cn(
                optTask.checked
                  ? "text-secondary line-through"
                  : "text-foreground/80",
                task.note?.length !== 0 && "text-sm",
              )}
            >
              {task.title}
            </span>
            {withTag && typeof task.task_list === "number" && (
              <TaskListTag task={task} />
            )}
          </div>
          {!!task.note && task.note.length !== 0 && (
            <span
              className={cn(
                "text-xs text-secondary line-clamp-1",
                optTask.checked ? "text-secondary line-through" : "",
              )}
            >
              {task.note}
            </span>
          )}
        </div>
      </div>
      <div className="flex items-center shrink-0 ml-auto gap-2">
        {withDropdown && (
          <TaskDropdown id={task.id} taskListId={task.task_list ?? undefined}>
            <Button variant="ghost" size="icon" className="size-6">
              <EllipsisVerticalIcon size={16} />
            </Button>
          </TaskDropdown>
        )}
      </div>
    </div>
  );
};

const TaskDropdown = ({
  id,
  children,
  taskListId,
}: {
  taskListId?: number;
  children: React.ReactNode;
  id: string;
}) => {
  const taskLists = getChatTaskLists();
  const currentTaskList = taskLists.find(
    (taskList) => taskList.id === taskListId,
  );
  const [open, setOpen] = useState<boolean>(false);
  const handleDeleteTask = async () => {
    if (!id) return;
    try {
      const res = await deleteTask(id);
      if (res) removeTask(res.id);
    } catch (error) {
      console.error(error);
    }
  };
  const handleSetTaskList = async (taskListId: number | null) => {
    const task = getTask(id);
    if (!task) return;
    if (!id) return;
    try {
      const res = await updateTask(id, {
        task_list: taskListId,
      });
      if (res) updateTaskInStore(res);
    } catch (error) {
      console.error(error);
    } finally {
      setOpen(false);
    }
  };
  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem className="gap-2" onClick={handleDeleteTask}>
          <TrashIcon size={16} />
          <span>Удалить задачу</span>
        </DropdownMenuItem>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Список задач</DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuCheckboxItem
                checked={!currentTaskList?.id}
                onClick={() => {
                  handleSetTaskList(null);
                }}
              >
                Без списка
              </DropdownMenuCheckboxItem>
              {taskLists.map((taskList) => (
                <DropdownMenuCheckboxItem
                  key={taskList.id}
                  checked={taskList.id === currentTaskList?.id}
                  onClick={() => {
                    handleSetTaskList(taskList.id);
                  }}
                >
                  {taskList.name}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
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
  const [taksProcessing, setTaksProcessing] = useState<string | null>(null);
  const handleCheckboxChange = async (task: ChatTask) => {
    setTaksProcessing(task.id);
    try {
      const positiveTaskUpdate: ChatTask = {
        ...task,
        checked: !task.checked,
      };
      const res = await updateTask(task.id, positiveTaskUpdate);
      if (!res) updateTaskInStore(task);
    } catch (error) {
      console.error(error);
      updateTaskInStore(task);
    } finally {
      setTaksProcessing(null);
    }
  };
  return (
    <ul className="w-full space-y-3 px-4">
      {list.length === 0 && (
        <div className="text-center text-sm text-secondary">Нет задач</div>
      )}
      {list.map((task, index) => {
        const isProcessing = taksProcessing === task.id;
        return (
          <li key={task.id} className="rounded-xl bg-background border">
            <Task
              task={task}
              loading={isProcessing}
              onCheckboxChange={handleCheckboxChange}
            />
          </li>
        );
      })}
    </ul>
  );
};

export default TaskList;
