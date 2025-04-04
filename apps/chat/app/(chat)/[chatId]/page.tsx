import { getChatMessages } from "rest-api/messages";
import { getAuthorizedUser } from "rest-api/auth";
import {
  ListTodoIcon,
  Loader2Icon,
  MessageCircleIcon,
  SearchIcon,
  SettingsIcon,
} from "lucide-react";
import { Button } from "mono/components/button";
import { Separator } from "mono/components/separator";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import ChatInput from "../chat-input/input";
import Topbar, { ChatName } from "../top-bar/bar";
import AttachmentPreview from "./attachment-preview";
import ChatHistory from "./chat-history";
import GroupChatParticipants from "./group-chat-participants";
import PinnedMessage from "./pinned-message";
import SplitScreen from "../top-bar/split-screen";
import Link from "next/link";
import ChatSidebarTrigger from "../sidebar-trigger";

type PageProps = {
  params: {
    chatId: string;
  };
};
const page = async ({ params }: PageProps) => {
  const chatId = params.chatId;
  const { data } = await getChatMessages(chatId);
  const messages = data ?? [];
  const { data: user } = await getAuthorizedUser();
  if (!user) return redirect("/");
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
        className="w-full min-h-[calc(100dvh-96px-64px)] pt-6 overflow-y-visible flex pb-4"
      >
        <Suspense fallback={<Loader2Icon className="animate-spin" />}>
          <ChatHistory messages={messages} user={user} />
        </Suspense>
      </div>
      <ChatInput
        chatId={chatId}
        containerClassName="pt-2 pb-4 px-4 sticky !bottom-0 md:w-full w-dvw"
        className="w-full"
      />
      <AttachmentPreview />
    </>
  );
};

export default page;
