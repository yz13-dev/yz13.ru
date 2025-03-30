import { getChatMessages } from "rest-api/chats";
import { getAuthorizedUser } from "rest-api/auth";
import { Loader2Icon, SearchIcon } from "lucide-react";
import { Button } from "mono/components/button";
import { Separator } from "mono/components/separator";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import ChatInput from "../chat-input/input";
import Topbar from "../top-bar/bar";
import AttachmentPreview from "./attachment-preview";
import ChatHistory from "./chat-history";
import GroupChatParticipants from "./group-chat-participants";
import PinnedMessage from "./pinned-message";
import SplitScreen from "../top-bar/split-screen";

type PageProps = {
  params: {
    chatId: string;
  };
};
const page = async ({ params }: PageProps) => {
  const chatId = params.chatId;
  const messages = await getChatMessages(chatId);
  const user = await getAuthorizedUser();
  if (!user) return redirect("/");
  return (
    <>
      <Topbar>
        <div className="w-fit flex items-center gap-2 mr-auto">
          <Separator orientation="vertical" className="h-7" />
          <Button
            variant="ghost"
            className="gap-2 h-8 rounded-md text-xs py-0.5 px-3"
          >
            <SearchIcon size={14} />
            <span className="h-[14px]">Поиск</span>
          </Button>
          <PinnedMessage />
        </div>
        <div className="w-fit flex items-center gap-2 shrink-0">
          <SplitScreen />
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

export default page;
