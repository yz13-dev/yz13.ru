import { DockSkeleton } from "@/components/dock/dock";
import { Logo } from "@/components/logo";
import Footer from "@/components/small-footer";
import { Skeleton } from "mono/components/skeleton";

export default function Loading() {
  return (
    <>
      <div className="w-full">
        <Skeleton className="w-full h-dvh absolute top-0 left-0 rounded-none" />
        <main className="w-full relative space-y-12 py-[10%]">
          <div className="w-full yz-future-container yz-future-container-max mx-auto space-y-10">
            <Logo size={{ width: 140, height: 26 }} type="full" />
            <div style={{ lineHeight: 1.2 }} className="w-fit lg:text-5xl text-3xl pr-[7.5%] *:font-semibold *:text-pretty">
              <h1 className="inline text-foreground">
                YZ13
              </h1>
              <span className="text-muted-foreground inline">
                {" "}
                -{" "}
              </span>
              <p className="text-muted-foreground inline">
                Фронтенд разработчик, специализируюсь на разработке сайтов,
                веб-приложений.
              </p>
            </div>
            <div className="yz-future-padding-y">
              <Skeleton className="h-9 w-full max-w-lg" />
            </div>
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
      <DockSkeleton />
    </>
  );
}
