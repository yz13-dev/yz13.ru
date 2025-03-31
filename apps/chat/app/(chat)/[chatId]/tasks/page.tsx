import { getTasks } from "rest-api/tasks";
import { Separator } from "mono/components/separator";
import TasksListInput from "./list-input";
import TaskInput from "./task-input";
import TaskList from "./task-list";
import TaskLists from "./task-lists";
import { Suspense } from "react";
import { Loader2Icon } from "lucide-react";
import Topbar, { ChatName } from "../../top-bar/bar";
import ChatSidebarTrigger from "../../sidebar-trigger";
import PinnedMessage from "../pinned-message";
import SplitScreen from "../../top-bar/split-screen";
import GroupChatParticipants from "../group-chat-participants";

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
