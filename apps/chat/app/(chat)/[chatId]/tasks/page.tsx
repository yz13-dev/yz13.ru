import { getTasks } from "rest-api/tasks";
import { Separator } from "mono/components/separator";
import TasksListInput from "./list-input";
import TaskInput from "./task-input";
import TaskList from "./task-list";
import TaskLists from "./task-lists";
import { Suspense } from "react";
import { Loader2Icon } from "lucide-react";
import Topbar from "../../top-bar/bar";

type PageProps = {
  params: {
    chatId: string;
  };
};
const page = async ({ params }: PageProps) => {
  const chatId = params.chatId;
  const { data } = await getTasks(chatId);
  const tasks = data ?? [];
  return (
    <>
      <Topbar>
        <TasksListInput chatId={chatId} />
        <Separator orientation="vertical" className="h-6" />
        <TaskLists />
      </Topbar>
      <div
        id="chat-history-wrapper"
        className="w-full min-h-[calc(100dvh-96px-126px-24px)] max-w-2xl mx-auto pt-6 overflow-y-visible flex pb-4"
      >
        <Suspense fallback={<Loader2Icon className="animate-spin" />}>
          <TaskList tasks={tasks} />
        </Suspense>
      </div>
      <TaskInput chatId={chatId} />
    </>
  );
};

export default page;
