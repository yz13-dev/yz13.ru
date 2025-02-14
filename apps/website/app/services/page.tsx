import Process from "@/app/services/process";
import Availability from "@/components/availability";
import Dock from "@/components/dock/dock";
import { Logo } from "@/components/logo";
import PageDockFiller from "@/components/page-dock-filler";
import { PagesLogo } from "@/components/pages-logo";
import { showPagesPromo, showProcess } from "@/const/flags";
import { wait } from "@/helpers/wait";
import { Skeleton } from "mono/components/skeleton";
import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import Header from "../(root)/header";
import Nav from "../(root)/nav";
import Footer from "../old/footer";
import MVP from "./grid/mvp";
import Pages from "./grid/pages";
import WebApps from "./grid/web-apps";
import Website from "./grid/website";

export const metadata: Metadata = {
  title: "Услуги по разработке",
  description:
    "Нужен разработчик? Здесь вы можете найти подходящие услуги для вас.",
};

const page = async () => {
  await wait(2000);
  return (
    <>
      <Header>
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
        </Nav>
      </Header>
      <div className="w-full divide-y border-b">
        <div className="w-full">
          <div className="grid-template max-w-screen-2xl w-full mx-auto border-x">
            <div className="w-full h-full pattern-lines" />
            <div className="h-fit border-x flex items-center p-6">
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
            <div className="w-full grid md:!grid-cols-3 border-x divide-y divide-x sm:!grid-cols-2 grid-cols-1 !pb-0">
              <div className="w-full divide-y h-full flex md:!col-span-1 col-span-full flex-col gap-3 *:overflow-hidden *:transition-colors">
                <div className="w-full h-2/3 aspect-[9/12] gap-3 hover:bg-background-back flex flex-col items-center p-6 relative">
                  <Suspense
                    fallback={
                      <Skeleton className="w-full h-full absolute left-0 top-0" />
                    }
                  >
                    <Website />
                  </Suspense>
                </div>
                <div className="w-full h-1/3 p-6 hover:bg-background-back space-x-3">
                  <span className="text-xl font-medium">
                    Проекты с открытым кодом.
                  </span>
                  <span className="text-xl font-medium text-secondary">
                    Скоро.
                  </span>
                </div>
              </div>
              <div className="w-full h-full aspect-[9/12] gap-3 hover:bg-background-back flex flex-col items-center p-6 relative overflow-hidden *:transition-colors">
                <Suspense
                  fallback={
                    <Skeleton className="w-full h-full absolute left-0 top-0" />
                  }
                >
                  <Pages />
                </Suspense>
              </div>
              <div className="w-full divide-y h-full flex md:!col-span-1 col-span-full flex-col gap-3 *:overflow-hidden *:transition-colors">
                <div className="w-full h-1/3 p-6 hover:bg-background-back space-x-3 relative">
                  <Suspense
                    fallback={
                      <Skeleton className="w-full h-full absolute left-0 top-0" />
                    }
                  >
                    <MVP />
                  </Suspense>
                </div>
                <div className="w-full h-2/3 aspect-[9/10] gap-3 hover:bg-background-back flex flex-col items-center p-6 relative">
                  <Suspense
                    fallback={
                      <Skeleton className="w-full h-full absolute left-0 top-0" />
                    }
                  >
                    <WebApps />
                  </Suspense>
                </div>
              </div>
            </div>
            <div className="w-full h-full pattern-lines" />
          </div>
          {(await showProcess()) && (
            <div className="w-full">
              <div className="max-w-screen-2xl p-6 w-full mx-auto border-x">
                <Process className="w-full" />
              </div>
            </div>
          )}
        </div>
        <div className="w-full">
          <div className="max-w-screen-2xl w-full mx-auto border-x">
            <div className="h-fit p-6 space-y-6">
              <Footer />
            </div>
          </div>
        </div>
      </div>
      <PageDockFiller />
      <Dock />
    </>
  );
};

export default page;
