import { HandwrittenStrikethrough } from "@/components/handwritten-strikethrough";
import { HeroPill, HeroPillIcon, HeroPillText } from "@/components/hero-pill";
import { Logo } from "@/components/logo";
import PageDockFiller from "@/components/page-dock-filler";
import { Typewriter } from "@/components/text-writter";
import { showPagesPromo } from "@/const/flags";
import { ExternalLinkIcon, PackagePlusIcon } from "lucide-react";
import { Skeleton } from "mono/components/skeleton";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Suspense } from "react";
import { cn } from "yz13/cn";
import Availability from "./availability";
import Footer from "./footer";
import RootGrid from "./root-grid";
const ConnectButton = dynamic(() => import("./connect-button"), {
  loading: () => (
    <span className="w-28 h-7 rounded-lg bg-background-back animate-pulse inline-block ml-2" />
  ),
});

const wait = async (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

const page = async () => {
  return (
    <>
      <header className="w-full h-16 flex items-center justify-center">
        <Link href="/">
          <Logo size={{ width: 96, height: 18 }} type="full" />
        </Link>
      </header>
      <main className={cn("w-full max-w-xl space-y-6 mx-auto *:px-6 py-6 ")}>
        <div className="flex flex-row gap-x-2 flex-wrap w-full">
          <div className="w-full">
            <Typewriter
              text={[
                "Фронтенд разработчик.",
                "Страницы, сайты и веб-приложения.",
                "YZ13",
              ]}
              speed={100}
              loop={true}
              className="text-foreground text-xl font-medium"
            />
          </div>
          <span className="text-secondary text-xl w-fit font-medium">
            На пути к{" "}
            <HandwrittenStrikethrough>отдыху</HandwrittenStrikethrough>{" "}
            фуллстеку.
            <Suspense
              fallback={
                <span className="w-28 h-7 rounded-lg bg-background-back animate-pulse inline-block mx-2" />
              }
            >
              <ConnectButton className="inline-block mx-2" />
            </Suspense>
          </span>
        </div>
        <div className="w-full">
          <Suspense fallback={<Skeleton className="h-4 w-full rounded-md" />}>
            <Availability />
          </Suspense>
        </div>
      </main>
      {(await showPagesPromo()) && (
        <div className="w-fit relative mx-auto flex items-center justify-center px-6 my-6">
          <HeroPill>
            <HeroPillIcon>
              <PackagePlusIcon size={12} />
            </HeroPillIcon>
            <HeroPillText>
              Pages - Библиотека страниц и компонентов
            </HeroPillText>
            <HeroPillIcon>
              <ExternalLinkIcon size={12} />
            </HeroPillIcon>
          </HeroPill>
          <Link
            href="https://pages.yz13.ru"
            className="absolute top-0 right-0 w-full h-full"
          />
        </div>
      )}
      <div className="w-full max-w-xl mx-auto *:px-6 space-y-3">
        <RootGrid />
      </div>
      <div className="w-full max-w-xl mx-auto *:p-6">
        <Footer />
        <PageDockFiller />
      </div>
    </>
  );
};

export default page;
