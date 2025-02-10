import Dock from "@/components/dock/dock";
import { HandwrittenStrikethrough } from "@/components/handwritten-strikethrough";
import { Logo } from "@/components/logo";
import PageDockFiller from "@/components/page-dock-filler";
import { Typewriter } from "@/components/text-writter";
import { Skeleton } from "mono/components/skeleton";
import Link from "next/link";
import { cn } from "yz13/cn";
import Footer from "./footer";
import root from "./root.module.css";

const loading = () => {
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
          </span>
        </div>
        <div className="w-full">
          <Skeleton className="h-5 w-full rounded-md" />
        </div>
      </main>
      <div className="w-full max-w-xl mx-auto *:px-6 space-y-3">
        <div className="w-fit relative mx-auto flex items-center justify-center px-6 my-6">
          <Skeleton className="w-64 h-[22px] rounded-md" />
        </div>
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
