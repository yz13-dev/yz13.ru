import Availability from "@/components/availability";
import Footer from "@/components/small-footer";
import {
  availableForWork,
  showCallToAction,
  showPriceDetails,
  showStack,
} from "@/const/flags";
import { Skeleton } from "mono/components/skeleton";
import { Suspense } from "react";
import CallToAction from "../(root)/call-to-action";
import ServicesDetails from "../(root)/services-details";
import Timeline from "../(root)/timeline";
import Background from "./background";
import RootHeader, { RootHeaderSkeleton } from "./header";
import Stack from "./stack";

export default async function page() {
  return (
    <>
      <div className="w-full">
        <Suspense
          fallback={
            <Skeleton className="w-full h-dvh absolute top-0 left-0 rounded-none" />
          }
        >
          <Background />
        </Suspense>
        <Suspense fallback={<RootHeaderSkeleton />}>
          <RootHeader />
        </Suspense>
        <main className="w-full relative flex flex-col justify-between h-[calc(100dvh-56px)]">
          <div className="w-full h-[calc(100dvh-56px-140px)] md:p-[2.5%] p-[5%] md:gap-[2.5%] gap-[5%] grid md:grid-rows-1 grid-rows-2 md:grid-cols-2 grid-cols-1">
            <div className="w-full h-fit space-y-10">
              <div className="w-full *:max-w-4xl space-y-6 *:block">
                <h1 className="text-foreground font-semibold lg:text-5xl md:text-4xl text-3xl">
                  YZ13 - Фронтенд разработчик
                </h1>
                <p className="text-secondary font-medium text-balance lg:text-3xl md:text-2xl text-xl">
                  Специализируюсь на разработке сайтов, веб-приложений.
                  Увлекаюсь разработкой интерфейсов для сайтов и приложений.
                </p>
              </div>
              <div className="w-full max-w-dvw h-fit">
                {(await showCallToAction()) && (
                  <CallToAction busy={await availableForWork()} />
                )}
              </div>
            </div>
            {(await showStack()) && (
              <div className="w-full h-full overflow-hidden">
                <Stack />
              </div>
            )}
          </div>
          <div className="w-full space-y-5 md:space-y-10">
            <div className="w-full max-w-dvw md:px-[2.5%] px-[5%] h-fit">
              <Suspense
                fallback={<Skeleton className="h-4 w-full rounded-md" />}
              >
                <Availability />
              </Suspense>
            </div>
            <div className="w-full max-w-dvw h-20 px-6 pb-2 background-transition-to-b">
              <Timeline />
            </div>
          </div>
        </main>
        <div className="yz-future-container yz-future-container-max mx-auto md:py-[5%] py-[10%] !w-fit *:p-0 md:gap-[2.5%] gap-[5%] *:hover:bg-transparent *:w-full *:h-full grid 2xl:grid-cols-4 md:grid-cols-2 grid-cols-1 auto-rows-auto">
          <Suspense
            fallback={<Skeleton className="h-[475px] w-full rounded-none" />}
          >
            {(await showPriceDetails()) && <ServicesDetails />}
          </Suspense>
        </div>
        <Footer className="yz-future-container yz-future-container-max mx-auto md:py-[2.5%] py-[5%]" />
      </div>
    </>
  );
}
