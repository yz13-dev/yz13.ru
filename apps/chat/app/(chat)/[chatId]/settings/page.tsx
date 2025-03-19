import { Separator } from "mono/components/separator";
import { cn } from "yz13/cn";
import DeleteChatButton from "./delete-chat-button";

type PageProps = {
  params: {
    chatId: string;
  };
};
const page = ({ params }: PageProps) => {
  const chatId = params.chatId;
  return (
    <>
      <div
        className={cn(
          "mx-auto min-h-[calc(100dvh-56px)] md:max-w-[calc(var(--breakpoint-md)-68px)] max-w-[calc(var(--breakpoint-md)-52px)]",
          "py-16",
        )}
      >
        <div className="space-y-6">
          <span className="text-2xl block font-semibold">Настройки</span>
          <div className="w-full flex flex-col gap-2">
            <span className="text-base text-secondary font-medium block">
              Тэги
            </span>
            <div className="w-full"></div>
          </div>
          <div className="w-full flex flex-col gap-2">
            <span className="text-base text-secondary font-medium block">
              Списки задач
            </span>
            <div className="w-full"></div>
          </div>
          <Separator />
          <DeleteChatButton chatId={chatId} />
        </div>
      </div>
    </>
  );
};

export default page;
