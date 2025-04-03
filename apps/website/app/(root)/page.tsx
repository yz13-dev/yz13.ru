import Availability from "@/components/availability";
import Dock, { DockSkeleton } from "@/components/dock/dock";
import Header from "@/components/header";
import { Logo } from "@/components/logo";
import Nav from "@/components/nav/nav";
import User from "@/components/user";
import {
  availableForWork,
  showAppsLink,
  showCallToAction,
  showLogoUnderFooter,
  showPriceDetails,
  showTimeline,
  showUser,
} from "@/const/flags";
import { LayoutGridIcon } from "lucide-react";
import { Button } from "mono/components/button";
import { Skeleton } from "mono/components/skeleton";
import Link from "next/link";
import { Suspense } from "react";
import { isDev } from "../login/get-url";
import Footer from "../../components/small-footer";
import CallToAction from "./call-to-action";
import Hero from "./hero";
import ServicesDetails from "./services-details";
import TechList from "./tech-list";
import Timeline from "./timeline";

const page = async () => {
  return (
    <>
      <Header className="sticky top-0 yz13-container border-x">
        <Nav side="left">
          <Link href="/">
            <Logo size={{ width: 110, height: 20 }} type="full" />
          </Link>
        </Nav>
        <div className="flex items-center gap-2">
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
            {(await showUser()) && <User />}
          </Suspense>
        </div>
      </Header>
      <div className="w-full divide-y border-b">
        <Hero />
        {(await showCallToAction()) && (
          <>
            <div className="w-full">
              <div className="grid-template yz13-container border-x">
                <div className="w-full h-full pattern-lines" />
                <div className="h-6 border-x" />
                <div className="w-full h-full pattern-lines" />
              </div>
            </div>
            <div className="w-full">
              <div className="grid-template yz13-container border-x">
                <div className="w-full h-full pattern-lines" />
                <div className="w-full h-fit border-x px-6">
                  <CallToAction busy={await availableForWork()} />
                </div>
                <div className="w-full h-full pattern-lines" />
              </div>
            </div>
            <div className="w-full">
              <div className="grid-template yz13-container border-x">
                <div className="w-full h-full pattern-lines" />
                <div className="h-6 border-x" />
                <div className="w-full h-full pattern-lines" />
              </div>
            </div>
          </>
        )}
        {(await showTimeline()) && (
          <div className="w-full">
            <div className="grid-template yz13-container border-x">
              <div className="w-full h-full pattern-lines" />
              <div className="h-6 border-x" />
              <div className="w-full h-full pattern-lines" />
            </div>
            <div className="w-full">
              <div className="grid-template yz13-container border-x">
                <div className="w-full h-full pattern-lines" />
                <div className="border-x h-16">
                  <Timeline />
                </div>
                <div className="w-full h-full pattern-lines" />
              </div>
            </div>
          </div>
        )}
        <div className="w-full">
          <div className="grid-template yz13-container border-x">
            <div className="w-full h-full pattern-lines" />
            <div className="h-6 border-x" />
            <div className="w-full h-full pattern-lines" />
          </div>
        </div>
        <div className="w-full">
          <div className="grid-template yz13-container border-x">
            <div className="w-full h-full pattern-lines" />
            <div className="h-fit border-x px-6 py-3 bg-background/60 backdrop-blur-sm">
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
          <div className="grid-template yz13-container border-x">
            <div className="w-full h-full pattern-lines" />
            <div className="h-6 border-x" />
            <div className="w-full h-full pattern-lines" />
          </div>
        </div>
        {false && (
          <div className="w-full">
            <div className="yz13-container border-x">
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
          fallback={<Skeleton className="h-[475px] w-full rounded-none" />}
        >
          {(await showPriceDetails()) && (
            <div className="w-full">
              <div className="yz13-container border-x flex flex-row divide-x overflow-x-auto">
                <ServicesDetails />
              </div>
            </div>
          )}
        </Suspense>
        <div className="w-full">
          <div className="yz13-container border-x">
            <div className="h-20" />
          </div>
        </div>
        <div className="w-full relative">
          <div className="yz13-container border-x">
            <div className="h-fit p-6 space-y-6">
              <Footer />
            </div>
          </div>
        </div>
      </div>
      {/* <PageDockFiller /> */}
      <Suspense fallback={<DockSkeleton />}>
        <Dock showUser={await showUser()} />
      </Suspense>
      {(await showLogoUnderFooter()) && (
        <div className="w-full 2xl:h-[450px] lg:h-[300px] md:h-[150px] h-[125px] overflow-hidden flex items-start justify-center">
          <span
            style={{
              fontSize: "46dvw",
              lineHeight: "0.7",
            }}
            className="font-semibold divide-x text-center *:w-1/4 *:overflow-hidden block text-secondary/5 select-none *:transition-colors *:duration-500"
          >
            <span className="hover:text-foreground">Y</span>
            <span className="hover:text-foreground">Z</span>
            <span className="hover:text-foreground">1</span>
            <span className="hover:text-foreground">3</span>
          </span>
        </div>
      )}
    </>
  );
};

export default page;
