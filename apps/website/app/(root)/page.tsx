import Dock from "@/components/dock/dock";
import { Logo } from "@/components/logo";
import PageDockFiller from "@/components/page-dock-filler";
import { showProcess, showReleasesList } from "@/const/flags";
import { get } from "@vercel/edge-config";
import { Button } from "mono/components/button";
import { Skeleton } from "mono/components/skeleton";
import Link from "next/link";
import { Suspense } from "react";
import { cn } from "yz13/cn";
import User from "../user";
import Footer from "./footer";
import Hero from "./hero";
import Process from "./process";
import ReleasesList from "./releases-list";

const page = async () => {
  const isBusy = await get<boolean>("busy");
  return (
    <div className="w-full lg:!px-0 px-6 divide-y">
      <header className="w-full h-16">
        <div className="w-full max-w-4xl h-full mx-auto border-x px-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Logo size={{ width: 80, height: 15 }} type="full" />
            <nav className=" items-center gap-2 hidden">
              <Button variant="ghost" rounded="full">
                Услуги
              </Button>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            {!isBusy && (
              <Button variant="outline" size="sm" asChild>
                <Link href="/contact-me">Связаться</Link>
              </Button>
            )}
            <Suspense fallback={<Skeleton className="size-9 rounded-full" />}>
              <User sideOffset={12} />
            </Suspense>
          </div>
        </div>
      </header>
      <main
        className={cn(
          "w-full max-w-4xl space-y-0 mx-auto *:p-6 border-x divide-y",
          "min-h-[calc(100dvh-4rem)]",
        )}
      >
        <Hero />
        {(await showProcess()) && <Process />}
        {(await showReleasesList()) && <ReleasesList />}
      </main>
      <div className="w-full max-w-4xl mx-auto border-x *:p-6 divide-y">
        <Footer />
        <PageDockFiller />
      </div>
      <Dock />
    </div>
  );
};

export default page;
