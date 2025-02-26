import Availability from "@/components/availability";
import Dock, { DockSkeleton } from "@/components/dock/dock";
import Header from "@/components/header";
import { Logo } from "@/components/logo";
import Nav from "@/components/nav";
import PageDockFiller from "@/components/page-dock-filler";
import User from "@/components/user";
import {
  showAppsLink,
  showCallToAction,
  showPriceDetails,
} from "@/const/flags";
import { LayoutGridIcon } from "lucide-react";
import { Button } from "mono/components/button";
import { Skeleton } from "mono/components/skeleton";
import Link from "next/link";
import { Suspense } from "react";
import { isDev } from "../login/get-url";
import Footer from "../old/footer";
import CallToAction from "./call-to-action";
import Hero from "./hero";
import { ServicesSkeleton } from "./loading";
import Services from "./services";
import ServicesDetails from "./services-details";
import TechList from "./tech-list";

const page = async () => {
  return (
    <>
      <Header className="sticky top-0">
        <Link href="/">
          <Logo size={{ width: 110, height: 20 }} type="full" />
        </Link>
        <Nav>
          <Suspense fallback={<Skeleton className="size-9" />}>
            {(await showAppsLink()) && (
              <Button variant="ghost" size="icon" asChild>
                <Link href="/apps">
                  <LayoutGridIcon size={16} />
                </Link>
              </Button>
            )}
          </Suspense>
          <Suspense fallback={<Skeleton className="h-9 w-[75px]" />}>
            {isDev && <User />}
          </Suspense>
        </Nav>
      </Header>

      <div className="w-full divide-y border-b">
        <Hero />
        {(await showCallToAction()) && <CallToAction />}
        <div className="w-full">
          <div className="grid-template max-w-screen-2xl w-full mx-auto border-x">
            <div className="w-full h-full pattern-lines" />
            <div className="h-6 border-x" />
            <div className="w-full h-full pattern-lines" />
          </div>
        </div>
        <div className="w-full">
          <div className="grid-template max-w-screen-2xl w-full mx-auto border-x">
            <div className="w-full h-full pattern-lines" />
            <div className="h-fit border-x px-6 py-3">
              <Suspense
                fallback={<Skeleton className="h-4 w-full rounded-md" />}
              >
                <Availability />
              </Suspense>
            </div>
            <div className="w-full h-full pattern-lines" />
          </div>
        </div>
        <div className="w-full">
          <div className="grid-template max-w-screen-2xl w-full mx-auto border-x">
            <div className="w-full h-full pattern-lines" />
            <div className="h-6 border-x" />
            <div className="w-full h-full pattern-lines" />
          </div>
        </div>
        <Suspense fallback={<ServicesSkeleton />}>
          <Services />
        </Suspense>
        <div className="w-full">
          <div className="max-w-screen-2xl w-full mx-auto border-x">
            <div className="h-20" />
          </div>
        </div>
        {false && (
          <div className="w-full">
            <div className="max-w-screen-2xl w-full mx-auto border-x">
              <div className="h-fit divide-y">
                <div className="flex flex-col gap-2 bg-neutral-100 p-6">
                  <span className="text-foreground/80 text-2xl block font-medium">
                    Доступные технологии для разработки
                  </span>
                  <span className="text-secondary text-sm">
                    Со временем список технологий будет расширяться
                  </span>
                </div>
                <TechList className="p-6 bg-neutral-100" />
              </div>
            </div>
          </div>
        )}
        <Suspense
          fallback={<Skeleton className="h-[386px] w-full rounded-none" />}
        >
          {(await showPriceDetails()) && <ServicesDetails />}
        </Suspense>
        <div className="w-full">
          <div className="max-w-screen-2xl w-full mx-auto border-x">
            <div className="h-20" />
          </div>
        </div>
        <div className="w-full">
          <div className="max-w-screen-2xl w-full mx-auto border-x">
            <div className="h-fit p-6 space-y-6">
              <Footer />
            </div>
          </div>
        </div>
      </div>
      <PageDockFiller className="pattern-lines max-w-screen-2xl w-full mx-auto border-x" />
      <Suspense fallback={<DockSkeleton />}>
        <Dock />
      </Suspense>
    </>
  );
};

export default page;
