import { getRoom } from "rest-api/rooms";
import { StoreProvider } from "@/components/canvas/api-provider";
import Canvas from "@/components/canvas/canvas";
import Overlay from "@/components/canvas/overlay";
import { ArrowLeftIcon } from "lucide-react";
import { Button } from "mono/components/button";
import Link from "next/link";
import { redirect } from "next/navigation";
import Multiplayer from "./multiplayer";
import MultiplayerCursors from "./multiplayer-cursors";
import { StoreProvider as MultiplayerProvider } from "./multiplayer.api";
import RoomUsers from "./room-users";

type PageProps = {
  params: {
    id: string;
  };
};
const page = async ({ params }: PageProps) => {
  const id = params.id;
  const room = await getRoom(id);
  if (!room) return redirect("/puzzle");
  return (
    <MultiplayerProvider>
      <StoreProvider>
        <div className="w-full h-dvh relative overflow-hidden">
          <Overlay>
            <div className="absolute top-6 left-6 flex items-center gap-2 w-fit h-fit">
              <Button asChild variant="outline" size="icon">
                <Link href="/puzzle">
                  <ArrowLeftIcon size={18} />
                </Link>
              </Button>
              <span className="text-foreground text-base font-medium px-2 py-1 rounded-md bg-background border">
                {room.name ?? room.id.slice(0, 6)}
              </span>
            </div>
            <RoomUsers className="absolute top-6 right-6" />
            <Canvas options={{ grid: true }} />
          </Overlay>
          <Multiplayer roomId={id} prefix="puzzle-room" />
          <MultiplayerCursors roomId={id} prefix="puzzle-room" />
        </div>
      </StoreProvider>
    </MultiplayerProvider>
  );
};

export default page;
