import Dock from "@/components/dock/dock";
import { HeroPill, HeroPillIcon, HeroPillText } from "@/components/hero-pill";
import { Logo } from "@/components/logo";
import PageDockFiller from "@/components/page-dock-filler";
import { showPagesPromo } from "@/const/flags";
import { ExternalLinkIcon, PackagePlusIcon } from "lucide-react";
import Link from "next/link";
import { cn } from "yz13/cn";
import Footer from "./footer";
import Hero from "./hero";
import RootGrid from "./root-grid";

const page = async () => {
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
      <Dock />
    </>
  );
};

export default page;
