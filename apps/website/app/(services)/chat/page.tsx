import { getFullPricing } from "@/actions/pricing/pricing";
import { Loader2Icon } from "lucide-react";
import { Suspense } from "react";
import ChatInput from "./chat-input";
import { StoreProvider } from "./chat-provider";
import ChatRequestSelector from "./chat-request-selector";
import ChatSidebarTrigger from "./chat-sidebar-trigger";
import ChatTypeSelector from "./chat-type-selector";

const page = async () => {
  const services = await getFullPricing();
  return (
    <StoreProvider services={services}>
      <div className="pt-6 px-6 absolute top-0 left-0 flex items-center gap-2">
        <ChatSidebarTrigger />
        <ChatRequestSelector />
      </div>
      <div className="w-full h-dvh flex flex-col gap-5 items-center justify-center">
        <span className="text-center text-2xl font-medium text-foreground/60">
          Выберите услугу для заказа
        </span>
        <Suspense fallback={<Loader2Icon size={16} />}>
          <ChatTypeSelector services={services} />
        </Suspense>
      </div>
      <ChatInput />
      <span className="text-center text-xs text-secondary absolute bottom-1 left-0 right-0 mx-auto">
        {/* Обратите внимание, данный сервис не использует искусственный интеллект */}
      </span>
    </StoreProvider>
  );
};
export default page;
