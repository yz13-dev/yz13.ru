import { getChatMessages } from "@/actions/chats/chats";
import { Loader2Icon, SearchIcon } from "lucide-react";
import { Button } from "mono/components/button";
import { Suspense } from "react";
import { cn } from "yz13/cn";
import ChatInput from "../chat-input";
import ChatToolbar from "../chat-toolbar/chat-toolbar";
import Topbar from "../top-bar";
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
  return (
    <>
      <Topbar>
        <div className="w-full overflow-x-auto flex items-center gap-2">
          <Button variant="secondary" className="gap-2" disabled>
            <SearchIcon size={16} />
            <span>Поиск</span>
          </Button>
          <PinnedMessage />
        </div>
        <div className="w-fit flex items-center gap-2 shrink-0">
          <GroupChatParticipants />
        </div>
      </Topbar>
      <div
        id="chat-history-wrapper"
        className="w-full min-h-[calc(100dvh-48px-48px)] overflow-y-visible flex pb-4"
      >
        <PageWrapper>
          <div
            className={cn(
              "mx-auto min-h-[80dvh] md:max-w-[calc(var(--breakpoint-lg)-68px)] max-w-[calc(var(--breakpoint-lg)-52px)]",
              "pb-2",
            )}
          >
            <Suspense fallback={<Loader2Icon className="animate-spin" />}>
              <ChatHistory messages={messages} />
            </Suspense>
          </div>
        </PageWrapper>
        <ChatToolbar chatId={chatId} />
      </div>
      <ChatInput
        chatId={chatId}
        containerClassName="sticky md:w-full w-dvw"
        className="w-full"
      />
    </>
  );
};

export default page;
