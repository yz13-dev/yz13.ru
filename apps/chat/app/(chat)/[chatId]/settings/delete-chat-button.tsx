"use client";
import { deleteChat } from "@/actions/chats/chats";
import { Loader2Icon, TrashIcon } from "lucide-react";
import { Button } from "mono/components/button";
import { useRouter } from "next/navigation";
import { useState } from "react";

const DeleteChatButton = ({ chatId }: { chatId: string }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const handleDeleteChat = async () => {
    setLoading(true);
    try {
      const res = await deleteChat(chatId);
      if (res) router.push("/");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Button
      variant="secondary"
      className="gap-2"
      disabled={loading}
      onClick={handleDeleteChat}
    >
      {loading ? (
        <Loader2Icon size={16} className="animate-spin" />
      ) : (
        <TrashIcon size={16} />
      )}
      Удалить чат
    </Button>
  );
};

export default DeleteChatButton;
