"use client";

import ChatSidebarTrigger from "../chat-sidebar-trigger";
import { useTopbar } from "../top-bar";
import EditChatName from "./edit-chat-name";

type ChatHeaderControlProps = {
  chatId: string;
  chatName?: string;
};
const ChatHeaderControl = ({
  chatId,
  chatName = "Без названия",
}: ChatHeaderControlProps) => {
  const overscrolled = useTopbar((state) => state.overscrolled);
  return (
    <div className="flex items-center gap-2">
      {!overscrolled && <ChatSidebarTrigger />}
      <EditChatName id={chatId} name={chatName ?? undefined} />
    </div>
  );
};

export default ChatHeaderControl;
