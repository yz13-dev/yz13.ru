import { showUser } from "@/const/flags";
import { Skeleton } from "mono/components/skeleton";
import dynamic from "next/dynamic";
import Items from "./dock-items";
import DockWrapper, { DockWidgets } from "./dock-wrapper";
import MenuPopover from "./menu-popover";
import Overlay from "./overlay";
const RadioPlayer = dynamic(() => import("./components/radio-player"), {
  ssr: false,
  loading: () => <Skeleton className="h-[26px] w-[100px] rounded-full" />,
});

export const DockSkeleton = () => {
  return (
    <Skeleton className="h-[58px] w-64 border rounded-2xl fixed left-0 right-0 mx-auto bottom-3 z-20" />
  );
};

type DockProps = {
  className?: string;
};

const Dock = async ({ className = "" }: DockProps) => {
  const showUserInDock = await showUser();
  return (
    <>
      <Overlay />
      <MenuPopover />
      <DockWrapper className={className}>
        <DockWidgets>
          <RadioPlayer />
        </DockWidgets>
        <Items showUser={showUserInDock} />
      </DockWrapper>
    </>
  );
};

export default Dock;
