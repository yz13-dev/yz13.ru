import { getChats } from "rest-api/chats";
import { getFullPricing } from "rest-api/pricing";
import { auth } from "@/lib/auth";
import { StoreProvider } from "./chat-api/chat-provider";

const ServerWrapper = async ({ children }: { children: React.ReactNode }) => {
  const services = await getFullPricing();
  const user = await auth();
  const id = user?.id;
  const chats = id ? await getChats(id) : [];
  return (
    <StoreProvider services={services} chats={chats}>
      {children}
    </StoreProvider>
  );
};
export default ServerWrapper;
