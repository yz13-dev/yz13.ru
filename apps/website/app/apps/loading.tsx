import { Skeleton } from "mono/components/skeleton";
import { RootHeaderSkeleton } from "../(root)/header";
import { abc } from "./empty";
import { DockSkeleton } from "@/components/dock/dock";

const loading = () => {
  return (
    <>
      <RootHeaderSkeleton />
      <div className="w-full h-fit space-y-10 md:p-[2.5%] p-[5%]">
        <h1 className="text-2xl font-medium">Приложения</h1>
      </div>
      <div className="w-full space-y-6"></div>
      <DockSkeleton />
    </>
  );
};

export default loading;
