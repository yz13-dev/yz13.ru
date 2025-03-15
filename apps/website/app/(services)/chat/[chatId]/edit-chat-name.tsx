"use client";
import { updateChat } from "@/actions/chats/chats";
import { PencilLineIcon, SaveIcon, XIcon } from "lucide-react";
import { Input } from "mono/components/input";
import { useState } from "react";
import { cn } from "yz13/cn";

type Props = {
  id: string;
  name?: string;
};

const EditChatName = ({ id, name = "Без названия" }: Props) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [roomName, setRoomName] = useState<string>(name);
  const [loading, setLoading] = useState<boolean>(false);
  const handleSave = async () => {
    setLoading(true);
    setEditMode(false);
    try {
      const updatedChat = await updateChat(id, { name: roomName });
      console.log(updatedChat);
      if (updatedChat) setRoomName(updatedChat.name || "Без названия");
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
        <span
          className={cn("text-lg font-semibold", loading ? "opacity-50" : "")}
        >
          {roomName || "Без названия"}
        </span>
        <button className="cursor-pointer" onClick={() => setEditMode(true)}>
          <PencilLineIcon size={16} className="group-hover:flex hidden" />
        </button>
      </div>
    );
};

export default EditChatName;
