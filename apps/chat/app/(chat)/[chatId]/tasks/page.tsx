import { Loader2Icon } from "lucide-react";
import { Separator } from "mono/components/separator";
import { Suspense } from "react";
import { getTasks } from "rest-api/tasks";
import ChatSidebarTrigger from "../../sidebar-trigger";
import Topbar, { ChatName } from "../../top-bar/bar";
import GroupChatParticipants from "../group-chat-participants";
import PinnedMessage from "../pinned-message";
import TasksListInput from "./list-input";
import TaskInput from "./task-input";
import TaskList from "./task-list";
import TaskLists from "./task-lists";

type PageProps = {
  params: Promise<{
    chatId: string;
  }>;
};
const page = async ({ params }: PageProps) => {
  const { chatId } = await params;
  const { data } = await getTasks(chatId);
  const tasks = data ?? [];
  return (
    <>
      <Topbar>
        <div className="w-full flex items-center justify-between">
          <div className="w-fit flex items-center mr-auto">
            <ChatSidebarTrigger />
            <ChatName />
            <PinnedMessage />
          </div>
          <div className="w-fit flex items-center gap-2 shrink-0">
            <GroupChatParticipants />
          </div>
        </div>
        <div className="w-full flex items-center justify-start gap-2">
          <TasksListInput chatId={chatId} />
          <Separator orientation="vertical" className="h-6" />
          <TaskLists />
        </div>
      </Topbar>
      <div
        id="chat-history-wrapper"
        className="w-full min-h-[calc(100dvh-105px-42px)] max-w-2xl mx-auto pt-6 overflow-y-visible flex pb-4"
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
