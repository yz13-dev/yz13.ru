import { Skeleton } from "mono/components/skeleton";
import { RootHeaderSkeleton } from "./header";
import Footer from "@/components/small-footer";

export default function Loading() {
  return (
    <>
      <div className="w-full">
        <Skeleton className="w-full h-dvh absolute top-0 left-0 rounded-none" />
        <main className="w-full relative flex flex-col mt-[10%] justify-between">
          <div className="w-full md:py-[2.5%] py-[5%] yz-future-container yz-future-container-max mx-auto md:gap-[2.5%] gap-[5%]">
            <div className="w-full h-full space-y-10">
              <div className="w-fit space-y-6">
                <h1 className="max-w-4xl text-foreground font-medium block lg:text-7xl text-5xl">
                  YZ13
                </h1>
                <div className="w-fit h-fit space-y-4 max-w-lg">
                  <p className="text-secondary font-medium text-balance lg:text-3xl text-2xl">
                    Специализируюсь на разработке сайтов, веб-приложений.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Skeleton className="w-full yz-future-container yz-future-container-max mx-auto h-20 " />
        <div className="yz-future-container yz-future-container-max mx-auto bg-background/80 backdrop-blur-sm rounded-t-3xl border-t border-x md:py-[2.5%] py-[5%]">
          <div className="w-full space-y-5 md:space-y-10">
            <div className="w-full max-w-dvw md:px-[2.5%] px-[5%] h-fit yz-future-container yz-future-container-max mx-auto">
              <Skeleton className="h-4 w-full rounded-md" />
            </div>
          </div>
          <div className="md:py-[2.5%] py-[5%] space-y-12">
            <div className="w-full space-y-6">
              <div className="yz-future-container yz-future-container-max mx-auto">
                <span className="text-3xl font-semibold">Стэк</span>
              </div>
              <Skeleton className="yz-future-container yz-future-container-max mx-auto h-10" />
            </div>
            <div className="w-full space-y-6">
              <div className="yz-future-container yz-future-container-max mx-auto">
                <span className="text-3xl font-semibold">Услуги</span>
              </div>
              <div className="yz-future-container yz-future-container-max mx-auto md:gap-[2.5%] gap-[5%] divide-y *:py-4">
                <Skeleton className="h-[475px] w-full rounded-none" />
              </div>
            </div>
            <Footer className="yz-future-container yz-future-container-max mx-auto md:py-[2.5%] py-[5%]" />
          </div>
        </div>
      </div>
    </>
  );
}
