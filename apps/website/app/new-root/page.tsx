import Availability from "@/components/availability";
import Footer from "@/components/small-footer";
import {
  availableForWork,
  showCallToAction,
  showPriceDetails,
} from "@/const/flags";
import { Skeleton } from "mono/components/skeleton";
import { Suspense } from "react";
import CallToAction from "../(root)/call-to-action";
import ServicesDetails from "../(root)/services-details";
import Timeline from "../(root)/timeline";
import Background from "./background";
import RootHeader, { RootHeaderSkeleton } from "./header";
import { wait } from "@/helpers/wait";

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
          <div className="w-full h-fit space-y-10 md:p-[2.5%] p-[5%]">
            <div className="w-full *:max-w-4xl space-y-6 *:block *:lg:text-5xl *:md:text-4xl *:text-3xl">
              <h1 className="text-foreground font-semibold">
                YZ13 - Фронтенд разработчик
              </h1>
              <p className="text-secondary font-medium text-balance">
                Специализируюсь на разработке сайтов, веб-приложений. Увлекаюсь
                разработкой интерфейсов для сайтов и приложений.
              </p>
            </div>
            <div className="w-full max-w-dvw h-fit">
              {(await showCallToAction()) && (
                <CallToAction busy={await availableForWork()} />
              )}
            </div>
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
        <div className="w-full">
          <div className="max-w-dvw md:px-[2.5%] px-[5%] md:py-[5%] py-[10%] overflow-x-auto w-full flex">
            <Suspense
              fallback={<Skeleton className="h-[475px] w-full rounded-none" />}
            >
              {(await showPriceDetails()) && <ServicesDetails />}
            </Suspense>
          </div>
        </div>
        <Footer className="w-full max-w-dvw md:p-[2.5%] p-[5%]" />
      </div>
    </>
  );
}
