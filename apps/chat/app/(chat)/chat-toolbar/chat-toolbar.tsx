import {
  AlbumIcon,
  CalendarIcon,
  ListTodoIcon,
  MessageCircleIcon,
  SettingsIcon,
  TagIcon,
} from "lucide-react";
import { Button } from "mono/components/button";
import Link from "next/link";

type ChatToolbarProps = {
  chatId?: string;
};
const ChatToolbar = ({ chatId }: ChatToolbarProps) => {
  return (
    <>
      <Button size="icon" variant="secondary" asChild>
        <Link href={`/chat/${chatId}`}>
          <MessageCircleIcon size={16} />
        </Link>
      </Button>
      <Button size="icon" variant="secondary" asChild>
        <Link href={`/chat/${chatId}/tasks`}>
          <ListTodoIcon size={16} />
        </Link>
      </Button>
      <Button size="icon" variant="secondary">
        <CalendarIcon size={16} />
      </Button>
      <Button size="icon" variant="secondary">
        <AlbumIcon size={16} />
      </Button>
      <Button size="icon" variant="secondary">
        <TagIcon size={16} />
      </Button>
      <Button size="icon" variant="secondary">
        <SettingsIcon size={16} />
      </Button>
    </>
  );
};

export default ChatToolbar;
