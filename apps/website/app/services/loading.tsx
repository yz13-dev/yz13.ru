import { Logo } from "@/components/logo";
import { Skeleton } from "mono/components/skeleton";
import Link from "next/link";
import { cn } from "yz13/cn";

const loading = () => {
  return (
    <>
      <header className="w-full h-16 flex items-center justify-center">
        <Link href="/">
          <Logo size={{ width: 96, height: 18 }} type="full" />
        </Link>
      </header>
      <main
        className={cn(
          "w-full max-w-4xl space-y-0 mx-auto *:p-6 ",
          "min-h-[calc(100dvh-4rem)]",
        )}
      >
        <div className="w-full grid md:!grid-cols-3 sm:!grid-cols-2 grid-cols-1 gap-3 !pb-0">
          <div className="w-full h-[460px] flex flex-col gap-3 *:border *:overflow-hidden *:transition-colors">
            <Skeleton className="w-full h-2/3 aspect-[9/12] gap-3 hover:bg-background-back flex flex-col items-center rounded-3xl p-6 relative" />
            <div className="w-full h-1/3 p-6 hover:bg-background-back rounded-3xl space-x-3">
              <span className="text-xl font-medium">
                Проекты с открытым кодом.
              </span>
              <span className="text-xl font-medium text-secondary">Скоро.</span>
            </div>
          </div>
          <Skeleton className="w-full h-full aspect-[9/12] gap-3 hover:bg-background-back flex flex-col border items-center rounded-3xl p-6 relative overflow-hidden *:transition-colors" />
          <div className="w-full h-full flex md:!col-span-1 col-span-full flex-col *:border gap-3 *:overflow-hidden *:transition-colors">
            <Skeleton className="w-full h-1/3 p-6 hover:bg-background-back rounded-3xl space-x-3 relative" />
            <Skeleton className="w-full h-2/3 aspect-[9/10] gap-3 hover:bg-background-back flex flex-col items-center rounded-3xl p-6 relative" />
          </div>
        </div>
        <div>
          <Skeleton className="h-5 w-full rounded-md" />
        </div>
      </main>
    </>
  );
};

export default loading;
