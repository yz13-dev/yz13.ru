import { removeAttachments } from "@/actions/chats/attachments";
import { deleteMessageFromChat, updateChat } from "@/actions/chats/chats";
import {
  CheckCircleIcon,
  CopyIcon,
  PencilIcon,
  PinIcon,
  ReplyIcon,
  TrashIcon,
} from "lucide-react";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "mono/components/context-menu";
import {
  deleteMessage,
  getChatAttachments,
  getChatAttachmentsById,
  setChat,
} from "../chat-api/chat-api";
import { setReplyTo } from "../chat-input/input-store";
import TagInput from "./tag-input";

const MessageCtxMenu = ({
  children,
  messageId,
  className = "",
  message,
  onOpenChange,
}: {
  message?: string;
  messageId?: string;
  onOpenChange?: (open: boolean) => void;
  className?: string;
  children: React.ReactNode;
}) => {
  const handleDelete = async () => {
    if (!messageId) return;
    const res = await deleteMessageFromChat(messageId);
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
  const handleCopyText = async () => {
    if (!message) return;
    await navigator.clipboard.writeText(message);
  };
  const handleReply = (messageId: string) => {
    setReplyTo(messageId);
  };
  return (
    <ContextMenu onOpenChange={onOpenChange}>
      <ContextMenuTrigger className={className} asChild>
        {children}
      </ContextMenuTrigger>
      <ContextMenuContent className="w-64 *:gap-2">
        <ContextMenuLabel>
          <TagInput messageId={messageId} />
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
        <ContextMenuItem>
          <CheckCircleIcon size={16} />
          <span>Выделить</span>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};

export default MessageCtxMenu;
