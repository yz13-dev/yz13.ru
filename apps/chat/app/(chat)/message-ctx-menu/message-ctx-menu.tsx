import { removeAttachments } from "rest-api/attachments";
import { deleteMessageFromChat, updateChat } from "rest-api/chats";
import {
  CheckCheckIcon,
  CheckCircleIcon,
  CircleIcon,
  CopyIcon,
  PencilIcon,
  PinIcon,
  PlusIcon,
  ReplyIcon,
  TrashIcon,
  XIcon,
} from "lucide-react";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "mono/components/context-menu";
import dayjs from "dayjs";
import {
  addSelectedMessage,
  deleteMessage,
  getChatAttachments,
  getChatAttachmentsById,
  getMessage,
  getSelectedMessages,
  removeSelectedMessage,
  setChat,
} from "../chat-api/chat-api";
import { setReplyTo } from "../chat-input/input-store";
import TagInput from "./tag-input";
import { useMemo, useState } from "react";
import Tags from "./tags";

const removeMessage = async (id: string) => {
  const res = await deleteMessageFromChat(id);
  if (res) {
    deleteMessage(res.id);
    const hasAttachments = res.attachments && res.attachments.length !== 0;
    if (hasAttachments) {
      const attachments = getChatAttachmentsById(res.attachments ?? []);
      const paths = attachments.map((attachment) => attachment.path);
      const deleted = await removeAttachments(paths);
      if (deleted) {
        const deletedIds = deleted.map((attachment) => attachment.id);
        const chatAttachments = getChatAttachments();
        const updatedChatAttachments = chatAttachments.filter(
          (attachment) => !deletedIds.includes(attachment.id),
        );
        const updatedChat = await updateChat(res.chat_id, {
          attachments: updatedChatAttachments,
        });
        if (updatedChat) setChat(updatedChat);
      }
    }
  }
};

const MessageCtxMenu = ({
  children,
  messageId,
  className = "",
  from_id,
  selected = false,
  message,
  onOpenChange,
}: {
  from_id?: string;
  selected?: boolean;
  message?: string;
  messageId?: string;
  onOpenChange?: (open: boolean) => void;
  className?: string;
  children: React.ReactNode;
}) => {
  const [showTagInput, setShowTagInput] = useState<boolean>(false);
  const handleDelete = async () => {
    const selectedMessages = getSelectedMessages();
    const notEmpty = selectedMessages.length !== 0;
    if (notEmpty)
      await Promise.all(selectedMessages.map((msg) => removeMessage(msg.id)));
    else if (messageId) await removeMessage(messageId);
  };
  const handleCopyText = async () => {
    if (!message) return;
    await navigator.clipboard.writeText(message);
  };
  const handleReply = (messageId: string) => {
    setReplyTo(messageId);
  };
  const handleSelect = () => {
    if (!messageId) return;
    if (!from_id) return;
    if (selected) removeSelectedMessage(messageId);
    else addSelectedMessage({ id: messageId, from_id });
  };
  const messageData = useMemo(() => {
    if (!messageId) return;
    return getMessage(messageId);
  }, [messageId]);
  return (
    <ContextMenu onOpenChange={onOpenChange}>
      <ContextMenuTrigger className={className} asChild>
        {children}
      </ContextMenuTrigger>
      <ContextMenuContent className="w-64 *:gap-2">
        <ContextMenuLabel className="space-y-2">
          {messageData?.delivered_at && (
            <div className="flex items-center text-secondary gap-2">
              <CheckCheckIcon size={16} />
              <span className="text-xs capitalize">
                {dayjs(messageData?.delivered_at)
                  .locale("ru")
                  .format("HH:mm, DD MMMM YYYY")}
              </span>
            </div>
          )}
        </ContextMenuLabel>
        <ContextMenuSeparator />
        <ContextMenuItem
          disabled={!messageId}
          onClick={() => messageId && handleReply(messageId)}
        >
          <ReplyIcon size={16} />
          <span>Ответить</span>
        </ContextMenuItem>
        <ContextMenuItem>
          <PencilIcon size={16} />
          <span>Изменить</span>
        </ContextMenuItem>
        <ContextMenuItem>
          <PinIcon size={16} />
          <span>Закрепить</span>
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem disabled={!message} onClick={handleCopyText}>
          <CopyIcon size={16} />
          <span>Копировать текст</span>
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem disabled={!messageId} onClick={handleDelete}>
          <TrashIcon size={16} />
          <span>Удалить</span>
        </ContextMenuItem>
        <ContextMenuItem onClick={handleSelect}>
          {selected ? <CircleIcon size={16} /> : <CheckCircleIcon size={16} />}
          <span>{selected ? "Снять выделение" : "Выделить"}</span>
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuLabel className="space-y-2">
          <span className="text-xs block text-secondary">Тэги</span>
          <div className="flex flex-col gap-2">
            {showTagInput && <TagInput messageId={messageId} />}
            <div className="w-full flex flex-wrap gap-1 items-start">
              <button
                onClick={() => setShowTagInput(!showTagInput)}
                className="px-2 py-0.5 text-xs text-secondary cursor-pointer flex items-center gap-1 rounded-full border"
              >
                {showTagInput ? <XIcon size={14} /> : <PlusIcon size={14} />}
                {showTagInput ? "Закрыть" : "Добавить тэг"}
              </button>
              <Tags messageId={messageId} />
            </div>
          </div>
        </ContextMenuLabel>
      </ContextMenuContent>
    </ContextMenu>
  );
};

export default MessageCtxMenu;
