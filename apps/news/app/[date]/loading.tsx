import { Skeleton } from "mono/components/skeleton";

const loading = () => {
  return (
    <>
      <div className="py-6 space-y-6 mt-[10dvh] *:px-6 max-w-4xl mx-auto">
        <div className="flex w-full flex-col gap-2">
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-medium">Сводка новостей /</h1>
            <Skeleton className="w-32 h-9 rounded-full" />
          </div>
          <Skeleton className="w-48 h-9 rounded-full" />
        </div>
      </div>
      <Skeleton className="h-[calc(100dvh-10dvh-120px)] w-full max-w-4xl mx-auto rounded-3xl" />
    </>
  );
};

export default loading;
