import Availability from "@/components/availability";
import Dock from "@/components/dock/dock";
import { Logo } from "@/components/logo";
import Nav from "@/components/nav/nav";
import PageDockFiller from "@/components/page-dock-filler";
import User from "@/components/user";
import { showAppsLink, showFAQ, showPriceDetails } from "@/const/flags";
import { LayoutGridIcon } from "lucide-react";
import { Button } from "mono/components/button";
import { Skeleton } from "mono/components/skeleton";
import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import ServicesDetails from "../(root)/services-details";
import Header from "../../components/header";
import { isDev } from "../login/get-url";
import Footer from "../old/footer";
import FAQ from "./faq";

export const metadata: Metadata = {
  title: "Услуги по разработке",
  description:
    "Нужен разработчик? Здесь вы можете найти подходящие услуги для вас.",
};

const page = async () => {
  return (
    <>
      <Header className="sticky top-0">
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
            {isDev && <User />}
          </Suspense>
        </div>
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
            <Suspense
              fallback={<Skeleton className="h-[386px] w-full rounded-none" />}
            >
              {(await showPriceDetails()) && <ServicesDetails />}
            </Suspense>
            <div className="w-full h-full pattern-lines" />
          </div>
        </div>
        {(await showFAQ()) && (
          <>
            <div className="w-full">
              <div className="max-w-screen-2xl w-full mx-auto border-x">
                <div className="h-20 pattern-lines" />
              </div>
            </div>
            <FAQ />
          </>
        )}
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
      <PageDockFiller />
      <Dock />
    </>
  );
};

export default page;
