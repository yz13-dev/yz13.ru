import Dock from "@/components/dock/dock";
import { Logo } from "@/components/logo";
import PageDockFiller from "@/components/page-dock-filler";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import { cn } from "yz13/cn";
import Banner from "./banner";
import Footer from "./footer";
import Hero from "./hero";
import root from "./root.module.css";

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
      <div className="w-full max-w-xl mx-auto *:p-6">
        <div className={cn("w-full", root["root-page-grid"])}>
          <div
            className={cn(
              "w-full h-full overflow-hidden p-6 col-span-2 row-span-2 flex flex-col items-center gap-y-6",
              "relative",
              root["grid-item"],
            )}
          >
            <button className="flex items-center gap-2 text-foreground/80">
              <ArrowLeftIcon size={20} />
              <span className="text-xl font-medium">Обо мне</span>
            </button>
            <div className="w-full relative aspect-video">
              <Banner className="w-[150%] absolute left-0 top-0" />
            </div>
            <Link
              href="/about"
              className="w-full absolute h-full top-0 left-0"
            />
          </div>
          <div
            className={cn(
              "w-full h-full flex flex-col gap-y-3 px-6 py-4",
              "relative group",
              root["grid-item"],
            )}
          >
            <button className="flex items-center gap-2 text-foreground/80">
              <span className="text-xl font-medium">Услуги</span>
              <ArrowRightIcon size={20} />
            </button>
            <div className="w-20 aspect-[9/16] transition-all group-hover:-rotate-6 border absolute -bottom-16 -left-3 -rotate-12 rounded-lg bg-background" />
            <div className="w-20 aspect-[9/16] transition-all group-hover:rotate-6 border absolute -bottom-16 left-6 rotate-12 rounded-lg bg-background" />
            <div className="w-20 aspect-[9/16] transition-all group-hover:rotate-6 border absolute -bottom-16 left-16 -rotate-12 rounded-lg bg-background" />
            <div className="w-20 aspect-[9/16] transition-all group-hover:-rotate-6 border absolute -bottom-16 left-24 rotate-12 rounded-lg bg-background" />
            <Link
              href="/services"
              className="w-full absolute h-full top-0 left-0"
            />
          </div>
          <div
            className={cn(
              "w-full h-full flex flex-col justify-between gap-y-3 p-6",
              "relative group",
              root["grid-item"],
            )}
          >
            <button className="flex items-center gap-2 text-foreground/80">
              <span className="text-xl font-medium">Проекты</span>
              <ArrowRightIcon size={20} />
            </button>
            <div className="w-44 aspect-video border transition-all group-hover:rotate-3 absolute rotate-6 -bottom-8 -right-6 rounded-lg bg-background" />
            <div className="w-44 aspect-video border transition-all group-hover:-rotate-3 absolute -rotate-6 -bottom-12 -left-6 rounded-lg bg-background" />
            <Link
              href="/projects"
              className="w-full absolute h-full top-0 left-0"
            />
          </div>
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

export default page;
