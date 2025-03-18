import { getChatMessages } from "@/actions/chats/chats";
import { cn } from "yz13/cn";
import ChatInput from "../chat-input";
import ChatHistory from "./chat-history";

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
      <div
        className={cn(
          "mx-auto min-h-[80dvh] md:max-w-[calc(var(--breakpoint-lg)-68px)] max-w-[calc(var(--breakpoint-lg)-52px)]",
          "md:pb-[110px] pb-12",
        )}
      >
        <ChatHistory messages={messages} />
      </div>
      <ChatInput chatId={chatId} containerClassName="sticky" />
    </>
  );
};

export default page;
