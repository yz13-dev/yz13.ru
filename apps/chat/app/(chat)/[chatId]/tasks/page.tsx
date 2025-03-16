import { getTasks } from "@/actions/chats/tasks";
import { PlusIcon } from "lucide-react";
import { Button } from "mono/components/button";
import { cn } from "yz13/cn";
import TaskInput from "./task-input";
import TaskList from "./task-list";

type PageProps = {
  params: {
    chatId: string;
  };
};
const page = async ({ params }: PageProps) => {
  const chatId = params.chatId;
  const tasks = await getTasks(chatId);
  return (
    <>
      <div
        className={cn(
          "mx-auto min-h-[87.5dvh] md:max-w-[calc(var(--breakpoint-md)-68px)] max-w-[calc(var(--breakpoint-md)-52px)]",
          "pb-16",
        )}
      >
        <div className="p-4 flex items-center gap-2">
          <Button variant="secondary" size="sm">
            Все
          </Button>
          <Button variant="ghost" size="icon">
            <PlusIcon size={16} />
          </Button>
        </div>
        <TaskList tasks={tasks} />
      </div>
      <TaskInput chatId={chatId} />
    </>
  );
};

export default page;
