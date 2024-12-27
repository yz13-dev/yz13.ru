import {
  ArrowRightLeftIcon,
  Banknote,
  MousePointer2Icon,
  VaultIcon,
} from "lucide-react";
import { Button } from "mono/components/button";
import { cn } from "yz13/cn";

const Dock = () => {
  return (
    <footer
      className={cn(
        "w-fit absolute bottom-6 left-0 right-0 mx-auto p-2",
        "border z-10 flex items-center gap-2 p-1 rounded-xl bg-background",
      )}
    >
      <Button variant="ghost" size="icon" className="size-10">
        <MousePointer2Icon size={24} />
      </Button>
      <Button variant="ghost" size="icon" className="size-10">
        <ArrowRightLeftIcon size={24} />
      </Button>
      <Button variant="ghost" size="icon" className="size-10">
        <VaultIcon size={24} />
      </Button>
      <Button variant="ghost" size="icon" className="size-10">
        <Banknote size={24} />
      </Button>
    </footer>
  );
};

export default Dock;
