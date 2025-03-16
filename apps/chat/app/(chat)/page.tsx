import ChatInput from "./chat-input";
import Header from "./header";

const page = async () => {
  return (
    <>
      <Header />
      <div className="w-full h-[calc(100dvh-56px)] flex flex-col gap-5 items-center justify-center">
        <span className="text-center text-2xl font-medium text-foreground/60">
          Выберите тип чата
        </span>
      </div>
      <ChatInput containerClassName="absolute" />
      <span className="text-center text-xs text-secondary absolute bottom-1 left-0 right-0 mx-auto">
        {/* Обратите внимание, данный сервис не использует искусственный интеллект */}
      </span>
    </>
  );
};
export default page;
