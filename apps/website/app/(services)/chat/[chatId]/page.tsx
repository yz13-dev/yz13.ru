import { getChat, getChatMessages } from "@/actions/chats/chats";
import { redirect } from "next/navigation";
import ChatInput from "../chat-input";
import ChatSidebarTrigger from "../chat-sidebar-trigger";
import ChatHistory from "./chat-history";

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
    <>
      <div className="pt-6 px-6 absolute top-0 left-0 flex items-center gap-2">
        <ChatSidebarTrigger />
      </div>
      <div
        id="chat-history-wrapper"
        className="max-w-xl mx-auto w-full h-[87.5dvh]"
      >
        <ChatHistory chat={chat} messages={messages} />
      </div>
      <ChatInput chatId={chatId} />
    </>
  );
};

export default page;
