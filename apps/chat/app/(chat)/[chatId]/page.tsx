import {
  Loader2Icon
} from "lucide-react";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { getAuthorizedUser } from "rest-api/auth";
import { getChatMessages } from "rest-api/messages";
import ChatInput from "../chat-input/input";
import ChatSidebarTrigger from "../sidebar-trigger";
import Topbar, { ChatName } from "../top-bar/bar";
import AttachmentPreview from "./attachment-preview";
import ChatHistory from "./chat-history";
import GroupChatParticipants from "./group-chat-participants";
import PinnedMessage from "./pinned-message";

type PageProps = {
  params: Promise<{
    chatId: string;
  }>;
};
const page = async ({ params }: PageProps) => {
  const { chatId } = await params;
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
