import Dock from "@/components/dock/dock";
import { Logo } from "@/components/logo";
import PageDockFiller from "@/components/page-dock-filler";
import { Skeleton } from "mono/components/skeleton";
import Link from "next/link";
import { cn } from "yz13/cn";
import Footer from "./footer";
import Hero from "./hero";
import root from "./root.module.css";

const loading = () => {
  return (
    <>
      <header className="w-full h-16 flex items-center justify-center">
        <Link href="/">
          <Logo size={{ width: 96, height: 18 }} type="full" />
        </Link>
      </header>
      <main className={cn("w-full max-w-xl space-y-0 mx-auto *:p-6 ")}>
        <Hero />
      </main>
      <div className="w-full max-w-xl mx-auto *:px-6 space-y-3">
        <div className={cn("w-full", root["root-page-grid"])}>
          <Skeleton
            className={cn(
              "w-full h-full overflow-hidden col-span-2 row-span-2 flex flex-col items-center",
              "relative group",
              root["grid-item"],
            )}
          ></Skeleton>
          <Skeleton
            className={cn(
              "w-full h-full flex flex-col gap-y-3 px-6 py-4",
              "relative group",
              root["grid-item"],
            )}
          ></Skeleton>
          <Skeleton
            className={cn(
              "w-full h-full flex flex-col justify-between gap-y-3 p-6",
              "relative group",
              root["grid-item"],
            )}
          ></Skeleton>
        </div>
      </div>
      <div className="w-full max-w-xl mx-auto *:p-6">
        <Footer />
        <PageDockFiller />
      </div>
      <Dock />
    </>
  );
};

export default loading;
