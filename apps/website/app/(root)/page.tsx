import Availability from "@/components/availability";
import Footer from "@/components/small-footer";
import { showCallToAction, showPriceDetails } from "@/const/flags";
import { Skeleton } from "mono/components/skeleton";
import { Suspense } from "react";
import ServicesDetails from "../(root)/services-details";
import Timeline from "../(root)/timeline";
import Background from "./background";
import Stack from "./stack";
import CallToAction from "./call-to-action";
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
              {(await showCallToAction()) && <CallToAction />}
            </div>
          </div>
        </main>
        <div className="w-full yz-future-container yz-future-container-max mx-auto h-20 px-6">
          <Timeline focusAlign="center" align="bottom" />
        </div>
        <div className="yz-future-container yz-future-container-max mx-auto bg-background/80 backdrop-blur-sm rounded-t-3xl border-t border-x md:py-[2.5%] py-[5%]">
          <div className="w-full space-y-5 md:space-y-10">
            <div className="w-full max-w-dvw md:px-[2.5%] px-[5%] h-fit yz-future-container yz-future-container-max mx-auto">
              <Suspense
                fallback={<Skeleton className="h-4 w-full rounded-md" />}
              >
                <Availability />
              </Suspense>
            </div>
          </div>
          <div className="md:py-[2.5%] py-[5%] space-y-12">
            <div className="w-full space-y-6">
              <div className="yz-future-container yz-future-container-max mx-auto">
                <span className="text-3xl font-semibold">Стэк</span>
              </div>
              <div className="yz-future-container yz-future-container-max mx-auto ">
                <Stack />
              </div>
            </div>
            <div className="w-full space-y-6">
              <div className="yz-future-container yz-future-container-max mx-auto">
                <span className="text-3xl font-semibold">Услуги</span>
              </div>
              <div className="yz-future-container yz-future-container-max mx-auto md:gap-[2.5%] gap-[5%] divide-y *:py-4">
                <Suspense
                  fallback={
                    <Skeleton className="h-[475px] w-full rounded-none" />
                  }
                >
                  {(await showPriceDetails()) && <ServicesDetails />}
                </Suspense>
              </div>
            </div>
            <Footer className="yz-future-container yz-future-container-max mx-auto md:py-[2.5%] py-[5%]" />
          </div>
        </div>
      </div>
    </>
  );
}
