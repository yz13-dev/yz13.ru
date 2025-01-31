import Dock from "@/components/dock/dock";
import { Logo } from "@/components/logo";
import PageDockFiller from "@/components/page-dock-filler";
import { showProcess } from "@/const/flags";
import { ArrowRightIcon } from "lucide-react";
import { Button } from "mono/components/button";
import { Skeleton } from "mono/components/skeleton";
import Link from "next/link";
import { Suspense } from "react";
import { cn } from "yz13/cn";
import Availability from "../(root)/availability";
import Process from "../(root)/process";

const page = async () => {
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
            <div className="w-full h-2/3 aspect-[9/12] gap-3 hover:bg-background-back flex flex-col items-center rounded-3xl p-6 relative">
              <span className="text-2xl font-medium">Сайты</span>
              <Button variant="secondary" className="gap-2" size="sm" disabled>
                От 0₽
                <ArrowRightIcon size={16} />
              </Button>
              <div className="absolute left-0 right-0 mx-auto rounded-xl top-1/2 border-2 border-dashed w-3/4 aspect-square" />
            </div>
            <div className="w-full h-1/3 p-6 hover:bg-background-back rounded-3xl space-x-3">
              <span className="text-xl font-medium">
                Проекты с открытым кодом.
              </span>
              <span className="text-xl font-medium text-secondary">Скоро.</span>
            </div>
          </div>
          <div className="w-full h-full aspect-[9/12] gap-3 hover:bg-background-back flex flex-col border items-center rounded-3xl p-6 relative overflow-hidden *:transition-colors">
            <span className="text-2xl font-medium">Страницы</span>
            <Button variant="secondary" className="gap-2" size="sm" disabled>
              От 0₽
              <ArrowRightIcon size={16} />
            </Button>
            <div className="absolute left-0 right-0 mx-auto rounded-xl top-1/3 border-2 border-dashed w-3/4 aspect-[9/16]" />
          </div>
          <div className="w-full h-full flex md:!col-span-1 col-span-full flex-col *:border gap-3 *:overflow-hidden *:transition-colors">
            <div className="w-full h-1/3 p-6 hover:bg-background-back rounded-3xl space-x-3">
              <span className="text-lg font-medium text-secondary">
                Есть идея? Могу помочь вам с разработкой MVP, за ???₽/месяц.
              </span>
            </div>
            <div className="w-full h-2/3 aspect-[9/10] gap-3 hover:bg-background-back flex flex-col items-center rounded-3xl p-6 relative">
              <span className="text-2xl font-medium">Веб приложения</span>
              <Button variant="secondary" className="gap-2" size="sm" disabled>
                От 0₽
                <ArrowRightIcon size={16} />
              </Button>
              <div className="absolute left-6 rounded-xl -bottom-6 border-2 border-dashed w-[125%] aspect-video" />
            </div>
          </div>
        </div>
        {false && (
          <div className="w-full grid h-96 md:!grid-cols-3 grid-cols-2 gap-3 !pt-3">
            <div className="w-full h-full col-span-2 rounded-xl border" />
            <div className="w-full h-full rounded-xl border" />
          </div>
        )}
        <div className="w-full">
          <Suspense fallback={<Skeleton className="h-4 w-full rounded-md" />}>
            <Availability />
          </Suspense>
        </div>
        {(await showProcess()) && <Process />}
      </main>
      <PageDockFiller />
      <Dock />
    </>
  );
};

export default page;
