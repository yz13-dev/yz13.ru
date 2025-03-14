import { getChat, getChatMessages } from "@/actions/chats/chats";
import { redirect } from "next/navigation";
import ChatInput from "../chat-input";
import Header from "../header";
import ChatHistory from "./chat-history";
import ChatProvider from "./chat-provider";

type PageProps = {
  params: {
    chatId: string;
  };
};
const page = async ({ params }: PageProps) => {
  const chatId = params.chatId;
  const chat = await getChat(chatId);
  const messages = await getChatMessages(chatId);
  if (!chat) return redirect("/chat");
  return (
    <ChatProvider chat={chat} messages={messages}>
      <Header />
      <div
        id="chat-history-wrapper"
        className="max-w-xl mx-auto w-full h-[calc(87.5dvh-56px)]"
      >
        <ChatHistory />
      </div>
      <ChatInput chatId={chatId} />
    </ChatProvider>
  );
};

export default page;
