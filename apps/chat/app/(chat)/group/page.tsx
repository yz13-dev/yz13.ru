import ChatInput from "../chat-input";
import Header from "../header";
import GroupChatInput from "./group-chat-input";

const page = async () => {
  return (
    <>
      <Header />
      <div className="w-full h-[calc(100dvh-56px)] flex flex-col gap-5 items-center justify-center">
        <div className="max-w-md w-full flex flex-col gap-4 justify-center">
          <span className="text-center text-2xl font-medium text-foreground/60">
            Новый групповой чат
          </span>
          <GroupChatInput />
        </div>
      </div>
      {false && <ChatInput containerClassName="absolute" />}
    </>
  );
};
export default page;
