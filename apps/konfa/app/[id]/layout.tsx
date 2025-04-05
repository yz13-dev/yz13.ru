import { auth } from "@/lib/auth";
const StoreProvider = dynamic(() => import("./room-api/api-provider"), {
  ssr: false,
});
import ParticipantsObserver from "./room-api/participants.observer";
import { redirect } from "next/navigation";
import dynamic from "next/dynamic";

type LayoutProps = {
  params: { id: string };
  children: React.ReactNode;
};
export default async function layout({ children, params }: LayoutProps) {
  const id = params.id;
  const user = await auth();
  if (!user) return redirect("/");
  const uid = user.id;
  const roomId = `konfa/room/${id}`;
  return (
    <StoreProvider initialState={{ roomId }}>
      <ParticipantsObserver id={id} uid={uid} user={user} />
      {children}
    </StoreProvider>
  );
}
