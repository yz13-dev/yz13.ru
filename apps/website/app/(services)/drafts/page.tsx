import Dock from "@/components/dock/dock";
import PageDockFiller from "@/components/page-dock-filler";
import { Input } from "mono/components/input";
import { Suspense } from "react";
import DraftsGrid, { DraftsGridSkeleton } from "./grid";

const page = async () => {
  return (
    <>
      <div className="p-3 space-y-3">
        <div className="w-full py-12 flex items-center justify-center flex-col gap-8">
          <span className="text-2xl font-medium max-w-md text-center">
            Откройте для себя коллекцию черновиков
          </span>
          <Input
            placeholder="Поиск по черновикам"
            className="max-w-md rounded-full"
          />
        </div>
        <Suspense fallback={<DraftsGridSkeleton />}>
          <DraftsGrid />
        </Suspense>
      </div>
      <PageDockFiller />
      <Dock />
    </>
  );
};

export default page;
