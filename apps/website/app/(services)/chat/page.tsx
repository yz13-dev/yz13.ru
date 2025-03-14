import { Loader2Icon } from "lucide-react";
import { Suspense } from "react";
import ChatInput from "./chat-input";
import ChatTypeSelector from "./chat-type-selector";
import Header from "./header";

const page = async () => {
  return (
    <>
      <Header />
      <div className="w-full h-[calc(100dvh-56px)] flex flex-col gap-5 items-center justify-center">
        <span className="text-center text-2xl font-medium text-foreground/60">
          Выберите услугу для заказа
        </span>
        <Suspense fallback={<Loader2Icon size={16} />}>
          <ChatTypeSelector />
        </Suspense>
      </div>
      <ChatInput />
      <span className="text-center text-xs text-secondary absolute bottom-1 left-0 right-0 mx-auto">
        {/* Обратите внимание, данный сервис не использует искусственный интеллект */}
      </span>
    </>
  );
};
export default page;
