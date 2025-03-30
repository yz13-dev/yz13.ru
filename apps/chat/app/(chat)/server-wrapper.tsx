import { getChats } from "rest-api/chats";
import { getFullPricing } from "rest-api/pricing";
import { auth } from "@/lib/auth";
import { StoreProvider } from "./chat-api/chat-provider";
import { redirect } from "next/navigation";

const ServerWrapper = async ({ children }: { children: React.ReactNode }) => {
  const { data } = await getFullPricing();
  const services = data ?? [];
  const user = await auth();
  if (!user) return redirect("/");
  const id = user?.id;
  const { data: dataChats } = await getChats(id);
  const chats = dataChats ?? [];
  return (
    <StoreProvider services={services} chats={chats}>
      {children}
    </StoreProvider>
  );
};
export default ServerWrapper;
