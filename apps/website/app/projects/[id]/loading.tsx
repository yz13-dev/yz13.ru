import { Skeleton } from "mono/components/skeleton";

const loading = () => {
  return (
    <div className="w-full lg:p-6 p-3 space-y-4">
      <header className="w-full flex gap-2 items-center justify-between">
        <Skeleton className="w-[290px] h-12" />
        <Skeleton className="size-9 rounded-full" />
      </header>
    </div>
  );
};

export default loading;
