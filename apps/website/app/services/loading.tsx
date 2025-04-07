import { Skeleton } from "mono/components/skeleton";
import { RootHeaderSkeleton } from "../(root)/header";
import { DockSkeleton } from "@/components/dock/dock";

const loading = () => {
  return (
    <>
      <RootHeaderSkeleton />
      <div className="max-w-dvw md:p-[2.5%] p-[5%] overflow-x-auto w-full flex">
        <Skeleton className="h-4 w-full rounded-md" />
      </div>
      <div className="max-w-dvw md:px-[2.5%] px-[5%] overflow-x-auto w-full flex">
        <Skeleton className="h-[475px] w-full rounded-none" />
      </div>
      <DockSkeleton />
    </>
  );
};

export default loading;
