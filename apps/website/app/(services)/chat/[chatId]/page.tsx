import ChatInput from "../chat-input";
import ChatSidebarTrigger from "../chat-sidebar-trigger";
import ChatHistory from "./chat-history";

const page = () => {
  return (
    <>
      <div className="pt-6 px-6 absolute top-0 left-0 flex items-center gap-2">
        <ChatSidebarTrigger />
      </div>
      <div
        id="chat-history-wrapper"
        className="max-w-3xl mx-auto w-full h-[87.5dvh]"
      >
        <ChatHistory />
      </div>
      <ChatInput />
    </>
  );
};

export default page;
