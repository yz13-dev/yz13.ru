import { Separator } from "mono/components/separator";
import Topbar from "../top-bar/bar";
import PinnedMessage from "./pinned-message";
import GroupChatParticipants from "./group-chat-participants";
import { Suspense } from "react";
import { getChatMessages } from "rest-api/messages";
import { getAuthorizedUser } from "rest-api/auth";
import { redirect } from "next/navigation";
import ChatHistory from "./chat-history";
import ChatInput from "../chat-input/input";
import AttachmentPreview from "./attachment-preview";
import { Loader2Icon } from "lucide-react";

export type ChatViewProps = {
  params: {
    chatId: string;
  };
};
const View = async ({ params }: ChatViewProps) => {
  const chatId = params.chatId;
  const { data: dataMessages } = await getChatMessages(chatId);
  const messages = dataMessages ?? [];
  const { data: user } = await getAuthorizedUser();
  if (!user) return redirect("/");
  return (
    <>
      <Topbar hideBreadcrumbs>
        <div className="w-fit flex items-center gap-2 mr-auto">
          <Separator orientation="vertical" className="h-7" />
          <PinnedMessage />
        </div>
        <div className="w-fit flex items-center gap-2 shrink-0">
          <GroupChatParticipants />
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

export default View;
