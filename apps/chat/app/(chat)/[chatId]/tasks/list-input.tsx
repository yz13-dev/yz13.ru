"use client";
import { updateChat } from "@/actions/chats/chats";
import { randomNumberId } from "@/lib/random-id";
import { ChatList } from "@/types/chat";
import { ArrowUpIcon, Loader2Icon, PlusIcon, XIcon } from "lucide-react";
import { Button } from "mono/components/button";
import { Input } from "mono/components/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "mono/components/popover";
import { useMemo, useState } from "react";
import { setChat } from "../../chat-api/chat-api";
import { useChatApi } from "../../chat-api/chat-provider";

type TasksListInputProps = {
  chatId: string;
};
const TasksListInput = ({ chatId }: TasksListInputProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const chat = useChatApi((state) => state.chat);
  const chatLists = useMemo(
    () => (chat ? chat.task_lists : []) as ChatList[],
    [chat],
  );
  const [name, setName] = useState<string>("");
  const alreadyExists = useMemo(() => {
    const lowerCaseTag = name.toLowerCase();
    if (name.length === 0) return false;
    else
      return chatLists.some((list) => {
        const listName = list.name.toLowerCase();
        return listName === lowerCaseTag;
      });
  }, [chatLists, name]);
  const handleAddList = async () => {
    if (alreadyExists) return;
    if (!chat) return;
    setLoading(true);
    try {
      const chatId = chat.id;
      const newList: ChatList = {
        id: randomNumberId(10),
        name,
      };
      const task_lists = [
        ...(chat.task_lists as ChatList[]),
        newList,
      ] as ChatList[];
      const updatedChat = await updateChat(chatId, { task_lists });
      if (updatedChat) setChat(updatedChat);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setName("");
      setOpen(false);
    }
  };
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon">
          {open ? <XIcon size={16} /> : <PlusIcon size={16} />}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="rounded-2xl flex flex-col gap-2 p-2">
        <div className="flex items-center gap-2">
          <Input
            placeholder="Название списка"
            className="w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Button
            variant="ghost"
            size="icon"
            className="shrink-0"
            onClick={handleAddList}
            disabled={alreadyExists || loading}
          >
            {loading ? (
              <Loader2Icon size={16} className="animate-spin" />
            ) : (
              <ArrowUpIcon size={16} />
            )}
          </Button>
        </div>
        {alreadyExists && (
          <span className="text-xs text-secondary">
            Такой список уже существует
          </span>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default TasksListInput;
