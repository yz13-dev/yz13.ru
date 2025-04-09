import { Skeleton } from "mono/components/skeleton";
import { RootHeaderSkeleton } from "./header";
import Footer from "@/components/small-footer";
import TaskList from "./task-list";
import { Logo } from "@/components/logo";

export default function Loading() {
  return (
    <>
      <div className="w-full">
        <Skeleton className="w-full h-dvh absolute top-0 left-0 rounded-none" />
        <main className="w-full relative mt-[10%] space-y-12 mb-12">
          <div className="w-full yz-future-container yz-future-container-max mx-auto md:gap-[2.5%] gap-[5%] flex items-center justify-between">
            <div className="w-fit h-full space-y-10">
              <Logo size={{ width: 128, height: 24 }} type="full" />
              <div className="w-fit max-w-lg">
                <h1 className="inline text-foreground font-medium lg:text-3xl text-2xl">
                  YZ13
                </h1>
                <span className="text-secondary inline font-medium text-balance lg:text-3xl text-2xl">
                  {" "}
                  -{" "}
                </span>
                <p className="text-secondary inline font-medium text-balance lg:text-3xl text-2xl">
                  Фронтенд разработчик, специализируюсь на разработке сайтов,
                  веб-приложений.
                </p>
              </div>
              <Skeleton className="h-9 w-full max-w-lg" />
            </div>
            <TaskList className="md:block hidden" />
          </div>
        </main>
        <Skeleton className="w-full yz-future-container rounded-none yz-future-container-max mx-auto h-20" />
        <div className="yz-future-container yz-future-container-max mx-auto bg-background/80 backdrop-blur-sm rounded-t-3xl border-t border-x md:py-[2.5%] py-[5%]">
          <div className="w-full space-y-5 md:space-y-10">
            <Skeleton className="h-4 w-full rounded-md" />
          </div>
          <div className="md:py-[2.5%] py-[5%] space-y-12">
            <div className="w-full space-y-6">
              <span className="text-3xl block font-semibold">Стэк</span>
            </div>
            <div className="w-full space-y-6">
              <span className="text-3xl block font-semibold">Услуги</span>
              <div className="md:gap-[2.5%] gap-[5%] divide-y space-y-6 *:pb-6">
                <Skeleton className="h-[475px] w-full rounded-none" />
              </div>
            </div>
            <Footer className="md:py-[2.5%] py-[5%]" />
          </div>
        </div>
      </div>
    </>
  );
}
