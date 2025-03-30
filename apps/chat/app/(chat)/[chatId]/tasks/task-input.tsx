"use client";
import { createTask } from "rest-api/tasks";
import AutoTextarea from "@/components/auto-textarea";
import { useUser } from "@/hooks/use-user";
import { ChatList, NewChatTask } from "rest-api/types/chats";
import { Loader2Icon, PlusIcon } from "lucide-react";
import { Checkbox } from "mono/components/checkbox";
import { Input } from "mono/components/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "mono/components/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "mono/components/select";
import { useMemo, useState } from "react";
import { create } from "zustand";
import { useChatApi } from "../../chat-api/chat-provider";

type State = {
  open: boolean;
  task: NewChatTask;
};
const useTaskMenu = create<State>((set) => ({
  open: false,
  task: {
    task_list: null,
    title: "",
    chat_id: "",
    from_id: "",
    note: "",
    checked: false,
  },
}));
const clearTask = () =>
  useTaskMenu.setState((state) => ({
    task: {
      ...state.task,
      title: "",
      note: "",
      checked: false,
      task_list: null,
    },
  }));
const setChecked = (checked: boolean) =>
  useTaskMenu.setState((state) => ({ task: { ...state.task, checked } }));
const setTitle = (title: string) =>
  useTaskMenu.setState((state) => ({ task: { ...state.task, title } }));
const setNote = (note: string) =>
  useTaskMenu.setState((state) => ({ task: { ...state.task, note } }));
const setOpen = (open: boolean) => useTaskMenu.setState((state) => ({ open }));
const setList = (list: number | null) =>
  useTaskMenu.setState((state) => ({
    task: { ...state.task, task_list: list },
  }));

const TaskMenu = () => {
  const checked = useTaskMenu((state) => state.task.checked);
  const title = useTaskMenu((state) => state.task.title);
  const note = useTaskMenu((state) => state.task.note);
  const chat = useChatApi((state) => state.chat);
  const list = useTaskMenu((state) => state.task.task_list);
  const task_lists = useMemo(
    () => (chat ? chat.task_lists : []) as ChatList[],
    [chat],
  );
  return (
    <PopoverContent
      className="rounded-3xl max-w-full space-y-2 p-2 w-[calc(var(--container-md)-10px)]"
      side="top"
      sideOffset={12}
    >
      <div className="w-full relative flex items-center">
        <Checkbox
          className="absolute left-2 size-6 rounded-md [&>span>svg]:size-4"
          checked={checked ?? false}
          onCheckedChange={(checked) => setChecked(checked as boolean)}
        />
        <Input
          placeholder="Название задачи"
          className="bg-background-secondary px-10"
          value={title ?? ""}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="w-full flex items-center gap-2">
        <Select
          value={list ? String(list) : undefined}
          onValueChange={(value) => setList(Number(value))}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Без списка" />
          </SelectTrigger>
          <SelectContent>
            {task_lists.map((list) => (
              <SelectItem key={list.id} value={String(list.id)}>
                {list.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <AutoTextarea
        placeholder="Описание задачи"
        className="bg-background-secondary rounded-lg w-full p-2 min-h-24 border"
        value={note ?? ""}
        onChange={(e) => setNote(e.target.value)}
      />
    </PopoverContent>
  );
};
const TaskInput = ({ chatId }: { chatId: string }) => {
  const open = useTaskMenu((state) => state.open);
  const [loading, setLoading] = useState<boolean>(false);
  const [user] = useUser();
  const handleCreateTask = async () => {
    if (!open) {
      setOpen(false);
      return;
    }
    if (!user) {
      setOpen(false);
      return;
    }
    const task = useTaskMenu.getState().task;
    if (!task.title) {
      setOpen(false);
      return;
    }
    setLoading(true);
    try {
      await createTask(chatId, { ...task, from_id: user.id });
      setLoading(false);
      setOpen(false);
      clearTask();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <footer className="sticky z-10 left-0 right-0 bottom-6 max-w-md mx-auto px-2 w-full">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger
          disabled={!user}
          onClick={(e) => {
            if (!open) return;
            e.preventDefault();
            handleCreateTask();
          }}
          className="flex items-center h-fit p-2 rounded-3xl bg-background-secondary/60 backdrop-blur-md border w-full justify-between"
        >
          <div className="flex items-center gap-2">
            <div className="size-6 flex items-center justify-center">
              {loading ? (
                <Loader2Icon size={16} className="animate-spin" />
              ) : (
                <PlusIcon size={16} />
              )}
            </div>
            <span className="text-sm">Создать задачу</span>
          </div>
          <kbd className="text-xs inline-flex gap-1 items-center *:h-6 *:px-2 *:rounded-full *:bg-neutral-300 *:flex *:items-center  *:justify-center">
            <span>Ctrl</span>
            <span>N</span>
          </kbd>
        </PopoverTrigger>
        <TaskMenu />
      </Popover>
    </footer>
  );
};

export default TaskInput;
