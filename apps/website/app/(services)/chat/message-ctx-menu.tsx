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
import { Input } from "mono/components/input";

const MessageCtxMenu = ({
  children,
  className = "",
  onOpenChange,
}: {
  onOpenChange?: (open: boolean) => void;
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <ContextMenu onOpenChange={onOpenChange}>
      <ContextMenuTrigger className={className}>{children}</ContextMenuTrigger>
      <ContextMenuContent className="w-64 *:gap-2">
        <ContextMenuLabel>
          <Input
            className="h-8 rounded-md text-xs"
            placeholder="Тэг для сообщения"
          />
        </ContextMenuLabel>
        <ContextMenuItem>
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
        <ContextMenuItem>
          <CopyIcon size={16} />
          <span>Копировать текст</span>
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem>
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
