import {
  ArrowLeftIcon,
  MessageCircleIcon,
  MonitorIcon,
  MousePointer2Icon,
  Share2Icon,
  SmartphoneIcon,
  TabletIcon,
} from "lucide-react";
import { Button } from "mono/components/button";
import Link from "next/link";

const Dock = () => {
  return (
    <div className="fixed bottom-6 left-0 right-0 flex items-center justify-center gap-3">
      <div className="rounded-full bg-neutral-100 *:size-10">
        <Button className="rounded-full" size="icon" variant="ghost" asChild>
          <Link href="/">
            <ArrowLeftIcon size={18} />
          </Link>
        </Button>
      </div>
      <div className="rounded-full bg-neutral-100 *:size-10">
        <Button className="rounded-full" size="icon" variant="ghost">
          <MousePointer2Icon size={18} />
        </Button>
        <Button className="rounded-full" size="icon" variant="ghost">
          <MessageCircleIcon size={18} />
        </Button>
        <Button className="rounded-full" size="icon" variant="ghost">
          <Share2Icon size={18} />
        </Button>
      </div>
      <div className="rounded-full bg-neutral-100 *:size-10">
        <Button className="rounded-full" size="icon" variant="default">
          <MonitorIcon size={18} />
        </Button>
        <Button className="rounded-full" size="icon" variant="ghost">
          <TabletIcon size={18} />
        </Button>
        <Button className="rounded-full" size="icon" variant="ghost">
          <SmartphoneIcon size={18} />
        </Button>
      </div>
    </div>
  );
};

export default Dock;
