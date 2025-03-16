import { cn } from "yz13/cn";
import ChatInput from "../chat-input";
import ChatHistory from "./chat-history";
import PageWrapper from "./page-wrapper";

type PageProps = {
  params: {
    chatId: string;
  };
};
const page = async ({ params }: PageProps) => {
  const chatId = params.chatId;
  return (
    <>
      <PageWrapper
        className={cn(
          "mx-auto min-h-[80dvh] md:max-w-[calc(var(--breakpoint-xl)-68px)] max-w-[calc(var(--breakpoint-xl)-52px)]",
          "pb-[110px]",
        )}
      >
        <ChatHistory />
      </PageWrapper>
      <ChatInput chatId={chatId} />
    </>
  );
};

export default page;
