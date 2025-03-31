import { Separator } from "mono/components/separator";
import { Suspense } from "react";
import { getAuthorizedUser } from "rest-api/auth";
import { redirect } from "next/navigation";
import { Loader2Icon } from "lucide-react";
import { getTasks } from "rest-api/tasks";
import TasksListInput from "./list-input";
import TaskLists from "./task-lists";
import TaskList from "./task-list";
import TaskInput from "./task-input";
import Topbar from "../../top-bar/bar";

export type TasksViewProps = {
  params: {
    chatId: string;
  };
};
const View = async ({ params }: TasksViewProps) => {
  const chatId = params.chatId;
  const { data } = await getTasks(chatId);
  const tasks = data ?? [];
  const { data: user } = await getAuthorizedUser();
  if (!user) return redirect("/");
  return (
    <>
      <Topbar hideBreadcrumbs>
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

export default View;
