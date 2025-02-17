import Availability from "@/components/availability";
import Dock from "@/components/dock/dock";
import Header from "@/components/header";
import { Logo } from "@/components/logo";
import Nav from "@/components/nav";
import PageDockFiller from "@/components/page-dock-filler";
import { PagesLogo } from "@/components/pages-logo";
import { showPagesPromo, showPriceDetails } from "@/const/flags";
import { ArrowRightIcon } from "lucide-react";
import { Button } from "mono/components/button";
import { Skeleton } from "mono/components/skeleton";
import Link from "next/link";
import { Suspense } from "react";
import { isDev } from "../login/get-url";
import Footer from "../old/footer";
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
          {(await showPagesPromo()) && (
            <div className="size-9 flex justify-center group relative items-center transition-colors">
              <PagesLogo
                size={{ width: 16, height: 16 }}
                type="only-icon"
                className="opacity-50 group-hover:opacity-100 transition-opacity"
              />
              <Link
                href="https://pages.yz13.ru"
                className="w-full h-full absolute inset-0"
              />
            </div>
          )}
          {isDev && (
            <Button className="gap-2" asChild>
              <Link href="/login">
                Войти
                <ArrowRightIcon size={16} />
              </Link>
            </Button>
          )}
        </Nav>
      </Header>

      <div className="w-full divide-y border-b">
        <Hero />
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
        <div className="w-full">
          <div className="max-w-screen-2xl w-full mx-auto border-x">
            <div className="h-fit divide-y">
              <div className="flex flex-col gap-2 bg-neutral-100 p-6">
                <span className="text-secondary text-2xl block font-medium">
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
        <div className="w-full">
          <div className="max-w-screen-2xl w-full mx-auto border-x">
            <div className="h-20" />
          </div>
        </div>
        {(await showPriceDetails()) && <ServicesDetails />}
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
      <Dock />
    </>
  );
};

export default page;
