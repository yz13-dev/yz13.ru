"use client";
import { updateChat } from "@/actions/chats/chats";
import { PencilLineIcon, SaveIcon, XIcon } from "lucide-react";
import { Input } from "mono/components/input";
import { motion } from "motion/react";
import { useState } from "react";
import { cn } from "yz13/cn";
import { updateChatInList } from "../chat-api/chat-api";
import { useTopbar } from "../top-bar";

type Props = {
  id: string;
  name?: string;
};

const EditChatName = ({ id, name = "Без названия" }: Props) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [roomName, setRoomName] = useState<string>(name);
  const [loading, setLoading] = useState<boolean>(false);
  const overscrolled = useTopbar((state) => state.overscrolled);
  const handleSave = async () => {
    setLoading(true);
    setEditMode(false);
    try {
      const updatedChat = await updateChat(id, { name: roomName });
      if (updatedChat) {
        setRoomName(updatedChat.name || "Без названия");
        updateChatInList(updatedChat);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };
  if (editMode) {
    return (
      <div className="flex items-center gap-2 bg-neutral-200 rounded-md">
        <Input
          className="h-[28px] w-28 text-lg font-semibold border-none rounded-md px-2"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          placeholder="Название чата"
        />
        <button
          className="cursor-pointer px-2"
          onClick={() => setEditMode(false)}
        >
          <XIcon size={16} />
        </button>
        <button className="cursor-pointer px-2" onClick={handleSave}>
          <SaveIcon size={16} />
        </button>
      </div>
    );
  } else
    return (
      <div className="flex items-center gap-2 group px-2 hover:bg-neutral-200 rounded-md">
        {
          !overscrolled &&
          <motion.span
            layoutId="chat-name"
            className={cn("text-lg font-semibold", loading ? "opacity-50" : "")}
          >
            {roomName || "Без названия"}
          </motion.span>
        }
        <button className="cursor-pointer" onClick={() => setEditMode(true)}>
          <PencilLineIcon size={16} className="group-hover:flex hidden" />
        </button>
      </div>
    );
};

export default EditChatName;
