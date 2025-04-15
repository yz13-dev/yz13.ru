import Availability from "@/components/availability";
import RadioClient from "@/components/dock/components/radio-client-wrapper";
import Footer from "@/components/footer/footer";
import { Logo } from "@/components/logo";
import User from "@/components/user";
import {
  availableForWork,
  showCallToAction,
  showPriceDetails,
  showUser,
} from "@/const/flags";
import { Skeleton } from "mono/components/skeleton";
import { Suspense } from "react";
import ServicesDetails from "../(root)/services-details";
import Timeline from "../(root)/timeline";
import Background from "./background";
import CallToAction from "./call-to-action";
import Stack from "./stack";
import NavTabs from "./tabs";

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
            </div>s
            <div className="yz-future-padding-y">
              {(await showCallToAction()) && (
                <CallToAction busy={await availableForWork()} />
              )}
            </div>
          </div>
        </main>
        <div className="w-full yz-future-container yz-future-container-max mx-auto h-20 px-6">
          <Timeline focusAlign="center" align="bottom" />
        </div>
        <div className="yz-future-container-no-padding yz-future-container-max mx-auto bg-background/80 backdrop-blur-sm">
          <div className="w-full flex items-center justify-between yz-future-padding-x yz-future-padding-y">
            <NavTabs />
            <div className="flex items-center gap-2">
              <RadioClient />
              <Suspense fallback={<Skeleton className="h-9 w-[75px]" />}>
                {(await showUser()) && <User />}
              </Suspense>
            </div>
          </div>
          <div className="w-full space-y-5 md:space-y-10 yz-future-padding-x yz-future-padding-y">
            <Suspense fallback={<Skeleton className="h-4 w-full rounded-md" />}>
              <Availability />
            </Suspense>
          </div>
          <div className="space-y-12">
            <div className="w-full space-y-6 yz-future-padding-x">
              <span className="text-3xl block font-semibold">Стэк</span>
              <Stack />
            </div>
            <div className="w-full space-y-6 yz-future-padding-x">
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
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
}
