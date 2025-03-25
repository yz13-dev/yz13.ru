import { getChatMessages } from "@/actions/chats/chats";
import { getAuthorizedUser } from "@/actions/user/user";
import { showChatTopics } from "@/const/flags";
import { Loader2Icon, SearchIcon } from "lucide-react";
import { Button } from "mono/components/button";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { cn } from "yz13/cn";
import ChatInput from "../chat-input/input";
import ChatToolbar from "../chat-toolbar/chat-toolbar";
import Topbar from "../top-bar";
import AttachmentPreview from "./attachment-preview";
import ChatHistory from "./chat-history";
import GroupChatParticipants from "./group-chat-participants";
import PageWrapper from "./page-wrapper";
import PinnedMessage from "./pinned-message";

type PageProps = {
  params: {
    chatId: string;
  };
};
const page = async ({ params }: PageProps) => {
  const chatId = params.chatId;
  const messages = await getChatMessages(chatId);
  const showTopics = await showChatTopics();
  const user = await getAuthorizedUser();
  if (!user) return redirect("/");
  return (
    <>
      <Topbar>
        <div className="w-full overflow-x-auto flex items-center gap-2">
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
          <GroupChatParticipants />
        </div>
      </Topbar>
      <div
        id="chat-history-wrapper"
        className="w-full min-h-[calc(100dvh-48px-48px-126px)] pt-6 overflow-y-visible flex pb-4"
      >
        <PageWrapper>
          <div
            className={cn(
              "mx-auto min-h-[70dvh] md:max-w-[calc(var(--breakpoint-2xl)-68px)] max-w-[calc(var(--breakpoint-2xl)-52px)]",
              "pb-2",
            )}
          >
            <Suspense fallback={<Loader2Icon className="animate-spin" />}>
              <ChatHistory messages={messages} user={user} />
            </Suspense>
          </div>
        </PageWrapper>
        <ChatToolbar chatId={chatId} showTopics={showTopics} />
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
