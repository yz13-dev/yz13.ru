"use client";
import { Loader2Icon, SaveIcon } from "lucide-react";
import { Button } from "mono/components/button";
import { Input } from "mono/components/input";
import { useMemo, useState } from "react";
import { updateChat } from "rest-api/chats";
import { updateChatInList } from "../chat-api/chat-api";

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
      const { data: updatedChat } = await updateChat(id, { name: roomName });
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
