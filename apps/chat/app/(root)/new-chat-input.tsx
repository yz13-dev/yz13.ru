"use client";
import { createChat } from "rest-api/chats";
import { useUser } from "@/hooks/use-user";
import { ChatRoom } from "rest-api/types/chats";
import { ArrowUpIcon, Loader2Icon, PlusIcon } from "lucide-react";
import { Button } from "mono/components/button";
import { Input } from "mono/components/input";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

type NewChatInputProps = {
  type?: ChatRoom["type"];
  showLabel?: boolean;
  label?: string;
};
const NewChatInput = ({
  type = "personal",
  showLabel = false,
  label = "Создать",
}: NewChatInputProps) => {
  const [name, setName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [user] = useUser();
  const disabled = useMemo(
    () => !name || loading || !user,
    [name, loading, user],
  );
  const router = useRouter();
  const handleNewChat = async () => {
    if (!user) return;
    setLoading(true);
    const newChat = await createChat({
      from_id: user.id,
      name,
      type,
      chat_participants: [user.id],
    });
    if (newChat) {
      router.push(`/${newChat.id}`);
      setName("");
    }
    setLoading(false);
  };
  return (
    <div className="flex w-full items-center gap-2">
      <Input
        placeholder="Название чата"
        className="w-full h-10 text-base font-medium bg-background"
        value={name}
        onChange={(e) => setName(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            if (disabled) return;
            handleNewChat();
          }
        }}
      />
      <Button
        onClick={handleNewChat}
        variant={disabled ? "secondary" : "default"}
        className="rounded-full h-10 gap-2 shrink-0"
        disabled={disabled}
      >
        {loading ? (
          <Loader2Icon size={18} className="animate-spin" />
        ) : (
          <PlusIcon size={18} />
        )}
        {!loading && showLabel && (
          <span className="md:inline hidden">{label}</span>
        )}
      </Button>
    </div>
  );
};
export default NewChatInput;
