"use client";
import { updateChat } from "rest-api/chats";
import { Loader2Icon, PencilLineIcon, SaveIcon, XIcon } from "lucide-react";
import { Input } from "mono/components/input";
import { motion } from "motion/react";
import { useMemo, useState } from "react";
import { cn } from "yz13/cn";
import { updateChatInList } from "../chat-api/chat-api";
import { useTopbar } from "../top-bar/bar";
import { Button } from "mono/components/button";

type Props = {
  id: string;
  name?: string;
};

const EditChatName = ({ id, name = "Без названия" }: Props) => {
  const [roomName, setRoomName] = useState<string>(name);
  const sameName = useMemo(() => roomName === name, [roomName, name]);
  const [loading, setLoading] = useState<boolean>(false);
  const handleSave = async () => {
    setLoading(true);
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
  return (
    <div className="flex items-center gap-2">
      <Input
        disabled={loading}
        value={roomName}
        onChange={(e) => setRoomName(e.target.value)}
        placeholder="Название чата"
        className="h-10 text-base bg-background/60"
      />
      <Button
        disabled={loading || sameName}
        size="icon"
        variant="secondary"
        className="size-10 shrink-0"
        onClick={handleSave}
      >
        {loading ? (
          <Loader2Icon size={18} className="animate-spin" />
        ) : (
          <SaveIcon size={18} />
        )}
      </Button>
    </div>
  );
};

export default EditChatName;
