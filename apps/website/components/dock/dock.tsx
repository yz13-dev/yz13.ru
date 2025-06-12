import { Skeleton } from "@yz13/ui/components/skeleton";
import RadioClient from "./components/radio-client-wrapper";
import Items from "./dock-items";
import DockWrapper, { DockWidgets } from "./dock-wrapper";
import MenuPopover from "./menu-popover";
import Overlay from "./overlay";


export const DockSkeleton = () => {
  return (
    <Skeleton className="h-[58px] w-64 border rounded-2xl fixed left-0 right-0 mx-auto bottom-3 z-20" />
  );
};

type DockProps = {
  className?: string;
};

const Dock = async ({ className = "" }: DockProps) => {
  return (
    <>
      <Overlay />
      <MenuPopover />
      <DockWrapper className={className}>
        <DockWidgets>
          <RadioClient />
        </DockWidgets>
        <Items />
      </DockWrapper>
    </>
  );
};

export default Dock;
