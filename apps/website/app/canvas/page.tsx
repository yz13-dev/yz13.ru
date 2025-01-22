import { getChannels, joinChannel } from "@/actions/ws/channels";
import { ChevronLeftIcon } from "lucide-react";
import { Button } from "mono/components/button";
import Link from "next/link";
import Canvas from "./canvas";
import Overlay from "./overlay";

const page = async () => {
  const channels = await getChannels();
  if (channels.length === 0) {
    joinChannel("canvas");
  }
  return (
    <div className="w-full h-dvh relative">
      <Overlay>
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-4 top-4"
          asChild
        >
          <Link href="/" className="w-fit h-fit">
            <ChevronLeftIcon size={18} />
          </Link>
        </Button>
        <Canvas />
      </Overlay>
    </div>
  );
};

export default page;
