import Availability from "@/components/availability";
import Dock, { DockSkeleton } from "@/components/dock/dock";
import PageDockFiller from "@/components/page-dock-filler";
import Footer from "@/components/small-footer";
import { showFAQ, showPriceDetails, showUser } from "@/const/flags";
import { Skeleton } from "mono/components/skeleton";
import type { Metadata } from "next";
import { Suspense } from "react";
import ServicesDetails from "../(root)/services-details";
import RootHeader, { RootHeaderSkeleton } from "../(root)/header";
import FAQ from "./faq";

export const metadata: Metadata = {
  title: "Услуги по разработке",
  description:
    "Нужен разработчик? Здесь вы можете найти подходящие услуги для вас.",
};

const page = async () => {
  return (
    <>
      <Suspense fallback={<RootHeaderSkeleton />}>
        <RootHeader />
      </Suspense>
      <div className="max-w-dvw md:p-[2.5%] p-[5%] overflow-x-auto w-full flex">
        <h1 className="text-4xl font-medium">Услуги</h1>
      </div>
      <div className="max-w-dvw md:px-[2.5%] px-[5%] overflow-x-auto w-full flex">
        <Suspense fallback={<Skeleton className="h-4 w-full rounded-md" />}>
          <Availability />
        </Suspense>
      </div>
      <div className="yz-future-container mx-auto md:py-[5%] py-[10%] !w-fit *:p-0 md:gap-[2.5%] gap-[5%] *:hover:bg-transparent *:w-full *:h-full grid 2xl:grid-cols-4 md:grid-cols-2 grid-cols-1 auto-rows-auto">
        <Suspense
          fallback={<Skeleton className="h-[475px] w-full rounded-none" />}
        >
          {(await showPriceDetails()) && <ServicesDetails />}
        </Suspense>
      </div>
      <div className="max-w-dvw md:px-[2.5%] px-[5%] overflow-x-auto w-full space-y-6 mt-12">
        {(await showFAQ()) && <FAQ />}
      </div>
      <Suspense fallback={<DockSkeleton />}>
        <Dock showUser={await showUser()} />
      </Suspense>
    </>
  );
};

export default page;
