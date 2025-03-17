"use client";
import { createChat } from "@/actions/chats/chats";
import { useUser } from "@/hooks/use-user";
import { ArrowRightIcon, Loader2Icon } from "lucide-react";
import { Button } from "mono/components/button";
import { Input } from "mono/components/input";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

const GroupChatInput = () => {
  const [value, setValue] = useState<string>("");
  const [user, userLoading] = useUser();
  const [loading, setLoading] = useState<boolean>(false);
  const disabled = useMemo(() => {
    return !value || loading || !user || userLoading;
  }, [value, loading, userLoading, user]);
  const router = useRouter();
  const handleNewGroupChat = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const newChat = await createChat({
        from_id: user.id,
        name: value,
        chat_participants: [user.id],
        type: "group",
      });
      if (newChat) {
        router.prefetch(`/${newChat.id}`);
        router.push(`/${newChat.id}`);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex items-center gap-2">
      <Input
        placeholder="Название группы"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <Button
        disabled={disabled}
        variant="ghost"
        size="icon"
        className="shrink-0"
        onClick={handleNewGroupChat}
      >
        {loading ? (
          <Loader2Icon size={16} className="animate-spin" />
        ) : (
          <ArrowRightIcon size={16} />
        )}
      </Button>
    </div>
  );
};

export default GroupChatInput;
