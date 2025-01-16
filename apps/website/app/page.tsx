import { HandwrittenStrikethrough } from "@/components/handwritten-strikethrough";
import { Logo } from "@/components/logo";
import { NextIcon } from "@/components/pixel-stack/next-icon";
import { ReactIcon } from "@/components/pixel-stack/react-icon";
import { TailwindIcon } from "@/components/pixel-stack/tailwind-icon";
import { TypeScriptIcon } from "@/components/pixel-stack/typescript-icon";
import { ViteIcon } from "@/components/pixel-stack/vite-icon";
import { SparklesText } from "@/components/sparkle-text";
import { Skeleton } from "mono/components/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "mono/components/tooltip";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import Availability from "./availability";
import ConnectButton from "./connect-button";
import { isDev } from "./login/get-url";
import RadioPlayer from "./radio-player";
import User from "./user";
const LiveTime = dynamic(() => import("@/components/live/live-time"), {
  ssr: false,
  loading: () => <Skeleton className="w-14 h-7 rounded-lg" />,
});

const page = () => {
  return (
    <>
      <RadioPlayer />
      <div className="w-full max-w-lg space-y-6 mx-auto mt-[30dvh] *:px-6">
        <div className="flex items-start gap-3 w-full">
          <div className="flex flex-col gap-1 w-full">
            <div className="mb-2 gap-2 flex items-center w-full justify-between">
              <div className="flex items-center gap-2">
                <Logo size={{ width: 32, height: 18 }} />
                <span className="text-foreground text-xl font-pixel font-semibold">
                  YZ13
                </span>
              </div>
              <div className="flex items-center gap-4">
                <LiveTime className="text-secondary text-xl font-medium" />
                {isDev && <User />}
              </div>
            </div>
            <div>
              <span className="text-secondary text-xl w-fit inline-block font-medium mr-2">
                <SparklesText
                  text="Фронтенд разработчик,"
                  className="text-foreground inline mr-2 text-xl font-medium"
                />
                {/* <span className="text-foreground">Фронтенд разработчик</span>, */}
                ничего серьезного.
              </span>
              <span className="text-secondary text-xl font-medium w-fit inline mr-2">
                На пути к{" "}
                <HandwrittenStrikethrough>отдыху</HandwrittenStrikethrough>{" "}
                фуллстеку.
              </span>
              <Suspense
                fallback={
                  <Skeleton className="w-28 h-7 rounded-lg inline-block" />
                }
              >
                <ConnectButton />
              </Suspense>
            </div>
          </div>
        </div>
        <div className="w-full">
          <Suspense fallback={<Skeleton className="h-5 w-full rounded-md" />}>
            <Availability />
          </Suspense>
        </div>
        <div className="w-full !mt-12 space-y-3">
          <span className="text-secondary text-base font-medium">
            Мой стек:
          </span>
          <ul className="flex w-fit flex-row p-1 rounded-xl bg-yz-neutral-100 gap-1 border border-yz-neutral-200">
            <li className="group cursor-default">
              <Tooltip delayDuration={100}>
                <TooltipTrigger className="p-2 transition-colors rounded-lg bg-yz-neutral-200 hover:bg-yz-neutral-300">
                  <NextIcon className="size-6 fill-secondary group-hover:fill-foreground" />
                </TooltipTrigger>
                <TooltipContent side="bottom" className="border">
                  NextJS
                </TooltipContent>
              </Tooltip>
            </li>
            <li className="group cursor-default">
              <Tooltip delayDuration={100}>
                <TooltipTrigger className="p-2 transition-colors rounded-lg bg-yz-neutral-200 hover:bg-yz-neutral-300">
                  <TypeScriptIcon className="size-6 fill-secondary group-hover:fill-foreground" />
                </TooltipTrigger>
                <TooltipContent side="bottom" className="border">
                  TypeScript
                </TooltipContent>
              </Tooltip>
            </li>
            <li className="group cursor-default">
              <Tooltip delayDuration={100}>
                <TooltipTrigger className="p-2 transition-colors rounded-lg bg-yz-neutral-200 hover:bg-yz-neutral-300">
                  <TailwindIcon className="size-6 fill-secondary group-hover:fill-foreground" />
                </TooltipTrigger>
                <TooltipContent side="bottom" className="border">
                  TailwindCSS
                </TooltipContent>
              </Tooltip>
            </li>
            <li className="group cursor-default">
              <Tooltip delayDuration={100}>
                <TooltipTrigger className="p-2 transition-colors rounded-lg bg-yz-neutral-200 hover:bg-yz-neutral-300">
                  <ReactIcon className="size-6 fill-secondary group-hover:fill-foreground" />
                </TooltipTrigger>
                <TooltipContent side="bottom" className="border">
                  React
                </TooltipContent>
              </Tooltip>
            </li>
            <li className="group cursor-default">
              <Tooltip delayDuration={100}>
                <TooltipTrigger className="p-2 transition-colors rounded-lg bg-yz-neutral-200 hover:bg-yz-neutral-300">
                  <ViteIcon className="size-6 fill-secondary group-hover:fill-foreground" />
                </TooltipTrigger>
                <TooltipContent side="bottom" className="border">
                  Vite
                </TooltipContent>
              </Tooltip>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default page;
