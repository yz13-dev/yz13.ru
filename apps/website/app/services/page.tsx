import Process from "@/app/services/process";
import Availability from "@/components/availability";
import Dock from "@/components/dock/dock";
import { Logo } from "@/components/logo";
import PageDockFiller from "@/components/page-dock-filler";
import { PagesLogo } from "@/components/pages-logo";
import { showPagesPromo, showPriceDetails, showProcess } from "@/const/flags";
import { Skeleton } from "mono/components/skeleton";
import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import ServicesDetails from "../(root)/services-details";
import Header from "../../components/header";
import Nav from "../../components/nav";
import Footer from "../old/footer";
import Column from "./grid/column";
import MVP from "./grid/mvp";
import Pages from "./grid/pages";
import WebApps from "./grid/web-apps";
import Website from "./grid/website";
import Wrapper from "./grid/wrapper";

export const metadata: Metadata = {
  title: "Услуги по разработке",
  description:
    "Нужен разработчик? Здесь вы можете найти подходящие услуги для вас.",
};

const page = async () => {
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
            <Wrapper>
              <Column className="divide-y *:overflow-hidden">
                <div className="w-full h-2/3 gap-3 hover:bg-background-back flex flex-col items-center p-6 relative">
                  <Suspense
                    fallback={
                      <Skeleton className="w-full h-full absolute left-0 top-0 rounded-none" />
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
              </Column>
              <Column className="gap-3 p-6">
                <Suspense
                  fallback={
                    <Skeleton className="w-full h-full absolute left-0 top-0 rounded-none" />
                  }
                >
                  <Pages />
                </Suspense>
              </Column>
              <Column className="divide-y *:overflow-hidden">
                <div className="w-full h-1/3 p-6 hover:bg-background-back space-x-3 relative">
                  <Suspense
                    fallback={
                      <Skeleton className="w-full h-full absolute left-0 top-0 rounded-none" />
                    }
                  >
                    <MVP />
                  </Suspense>
                </div>
                <div className="w-full h-2/3 gap-3 hover:bg-background-back flex flex-col items-center p-6 relative">
                  <Suspense
                    fallback={
                      <Skeleton className="w-full h-full absolute left-0 top-0 rounded-none" />
                    }
                  >
                    <WebApps />
                  </Suspense>
                </div>
              </Column>
            </Wrapper>
            <div className="w-full h-full pattern-lines" />
          </div>
        </div>
        <div className="w-full">
          <div className="max-w-screen-2xl w-full mx-auto border-x">
            <div className="h-20" />
          </div>
        </div>
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
        {(await showProcess()) && (
          <div className="w-full">
            <div className="max-w-screen-2xl p-6 w-full mx-auto border-x">
              <Process className="w-full" />
            </div>
          </div>
        )}
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
