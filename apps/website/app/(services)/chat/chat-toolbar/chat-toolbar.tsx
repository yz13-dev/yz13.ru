import { AlbumIcon, ListTodoIcon, SettingsIcon, TagIcon } from "lucide-react";
import { Button } from "mono/components/button";
import Todos from "./todo";

const ChatToolbar = () => {
  return (
    <>
      <Todos>
        <Button size="icon" variant="secondary">
          <ListTodoIcon size={16} />
        </Button>
      </Todos>
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
