import { getTasks } from "@/actions/chats/tasks";
import { Separator } from "mono/components/separator";
import { cn } from "yz13/cn";
import ChatToolbar from "../../chat-toolbar/chat-toolbar";
import Topbar from "../../top-bar";
import PageWrapper from "../page-wrapper";
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
      <Topbar>
        <TasksListInput chatId={chatId} />
        <Separator orientation="vertical" className="h-6" />
        <TaskLists />
      </Topbar>
      <div
        id="chat-history-wrapper"
        className="w-full min-h-[calc(100dvh-48px-48px)] pt-6 overflow-y-visible flex pb-2"
      >
        <PageWrapper>
          <div
            className={cn(
              "mx-auto md:max-w-[calc(var(--breakpoint-md)-68px)] max-w-[calc(var(--breakpoint-md)-52px)]",
              "pb-4",
            )}
          >
            <TaskList tasks={tasks} />
          </div>
        </PageWrapper>
        <ChatToolbar chatId={chatId} />
      </div>
      <TaskInput chatId={chatId} />
    </>
  );
};

export default page;
