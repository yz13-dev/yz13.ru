import Availability from "@/components/availability";
import Dock, { DockSkeleton } from "@/components/dock/dock";
import { Logo } from "@/components/logo";
import Footer from "@/components/small-footer";
import {
  availableForWork,
  showCallToAction,
  showPriceDetails,
} from "@/const/flags";
import { Skeleton } from "mono/components/skeleton";
import { Suspense } from "react";
import ServicesDetails from "../(root)/services-details";
import Timeline from "../(root)/timeline";
import Background from "./background";
import CallToAction from "./call-to-action";
import Stack from "./stack";
import TaskList from "./task-list/list";

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
              {(await showCallToAction()) && (
                <CallToAction busy={await availableForWork()} />
              )}
            </div>
            <TaskList className="md:block hidden" />
          </div>
        </main>
        <div className="w-full yz-future-container yz-future-container-max mx-auto h-20 px-6">
          <Timeline focusAlign="center" align="bottom" />
        </div>
        <div className="yz-future-container yz-future-container-max mx-auto bg-background/80 backdrop-blur-sm border-t border-x md:py-[2.5%] py-[5%] yz-future-panel">
          <div className="w-full space-y-5 md:space-y-10">
            <Suspense fallback={<Skeleton className="h-4 w-full rounded-md" />}>
              <Availability />
            </Suspense>
          </div>
          <div className="md:py-[2.5%] py-[5%] space-y-12">
            <div className="w-full space-y-6">
              <span className="text-3xl block font-semibold">Стэк</span>
              <Stack />
            </div>
            <div className="w-full space-y-6">
              <span className="text-3xl block font-semibold">Услуги</span>
              <div className="md:gap-[2.5%] gap-[5%] divide-y space-y-6 *:pb-6">
                <Suspense
                  fallback={
                    <Skeleton className="h-[475px] w-full rounded-none" />
                  }
                >
                  {(await showPriceDetails()) && <ServicesDetails />}
                </Suspense>
              </div>
            </div>
            <Footer className="md:py-[2.5%] py-[5%]" />
          </div>
        </div>
      </div>
      <Suspense fallback={<DockSkeleton />}>
        <Dock />
      </Suspense>
    </>
  );
}
