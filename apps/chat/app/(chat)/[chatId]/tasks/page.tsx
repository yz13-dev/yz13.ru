import { getTasks } from "@/actions/chats/tasks";
import { Separator } from "mono/components/separator";
import { cn } from "yz13/cn";
import TasksListInput from "./list-input";
import TaskInput from "./task-input";
import TaskList from "./task-list";
import TaskLists from "./task-lists";

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
          <TasksListInput chatId={chatId} />
          <Separator orientation="vertical" className="h-6" />
          <TaskLists />
        </div>
        <TaskList tasks={tasks} />
      </div>
      <TaskInput chatId={chatId} />
    </>
  );
};

export default page;
