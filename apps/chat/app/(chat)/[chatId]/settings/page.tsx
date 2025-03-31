import { Separator } from "mono/components/separator";
import { cn } from "yz13/cn";
import ChatToolbar from "../../chat-toolbar/chat-toolbar";
import PageWrapper from "../page-wrapper";
import DeleteChatButton from "./delete-chat-button";
import Tags from "./tags";
import TaskLists from "./task-lists";
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
const page = ({ params }: PageProps) => {
  const chatId = params.chatId;
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
      </Topbar>
      <div
        id="chat-history-wrapper"
        className="w-full min-h-[calc(100dvh-96px-126px-24px)] p-6 overflow-y-visible flex"
      >
        <div className="space-y-6">
          <span className="text-2xl block font-semibold">Настройки</span>
          <div className="w-full flex flex-col gap-2">
            <span className="text-base font-medium block">Тэги</span>
            <span className="text-sm text-secondary block">
              При удалении тэга, у сообщений будет удален тэг
            </span>
            <div className="w-full mt-3">
              <Tags />
            </div>
          </div>
          <div className="w-full flex flex-col gap-2">
            <span className="text-base font-medium block">Списки задач</span>
            <span className="text-sm text-secondary block">
              При удалении списка, задачи будет перемещены в основной список
            </span>
            <div className="w-full mt-3">
              <TaskLists />
            </div>
          </div>
          <Separator />
          <DeleteChatButton chatId={chatId} />
        </div>
      </div>
    </>
  );
};

export default page;
