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
  return (
    <>
      <div
        className={cn(
          "mx-auto min-h-[80dvh] md:max-w-[calc(var(--breakpoint-xl)-68px)] max-w-[calc(var(--breakpoint-xl)-52px)]",
          "pb-[110px]",
        )}
      >
        <ChatHistory />
      </div>
      <ChatInput chatId={chatId} containerClassName="sticky" />
    </>
  );
};

export default page;
