import { ListTodoIcon, MessageCircleIcon, SettingsIcon } from "lucide-react";
import { Button } from "mono/components/button";
import Link from "next/link";

type ChatToolbarProps = {
  chatId?: string;
};
const ChatToolbar = ({ chatId }: ChatToolbarProps) => {
  return (
    <>
      <Button size="icon" variant="secondary" asChild>
        <Link href={`/${chatId}`}>
          <MessageCircleIcon size={16} />
        </Link>
      </Button>
      <Button size="icon" variant="secondary" asChild>
        <Link href={`/${chatId}/tasks`}>
          <ListTodoIcon size={16} />
        </Link>
      </Button>
      <Button size="icon" variant="secondary">
        <SettingsIcon size={16} />
      </Button>
    </>
  );
};

export default ChatToolbar;
