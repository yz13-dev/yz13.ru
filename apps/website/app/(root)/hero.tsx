import { HandwrittenStrikethrough } from "@/components/handwritten-strikethrough";
import { Logo } from "@/components/logo";
import { SparklesText } from "@/components/sparkle-text";
import { Skeleton } from "mono/components/skeleton";
import dynamic from "next/dynamic";

import { Suspense } from "react";
import Availability from "./availability";
import Banner from "./banner";

const ConnectButton = dynamic(() => import("./connect-button"), {
  loading: () => (
    <span className="w-28 h-7 rounded-lg bg-background-back animate-pulse inline-block ml-2" />
  ),
});

const Hero = () => {
  return (
    <div className="w-full space-y-6">
      <div className="flex items-start sm:!flex-row flex-col gap-6 w-full">
        <Banner className="sm:!block hidden" />
        <div className="flex flex-col gap-4 w-full">
          <div className="gap-2 flex items-center w-full justify-between">
            <div className="flex items-center gap-2">
              <Logo size={{ width: 80, height: 15 }} type="full" />
            </div>
            <div className="flex items-center gap-4"></div>
          </div>
          <div className="flex flex-row gap-x-2 flex-wrap w-full">
            <SparklesText
              tag="h1"
              text="Фронтенд разработчик,"
              className="text-foreground text-xl font-medium"
            />
            <p className="text-secondary text-xl w-fit font-medium">
              ничего серьезного. На пути к{" "}
              <HandwrittenStrikethrough>отдыху</HandwrittenStrikethrough>{" "}
              фуллстеку.
              <Suspense
                fallback={
                  <span className="w-28 h-7 rounded-lg bg-background-back animate-pulse inline-block ml-2" />
                }
              >
                <ConnectButton className="inline-block ml-2" />
              </Suspense>
            </p>
          </div>
          <div className="w-full">
            <Suspense fallback={<Skeleton className="h-4 w-full rounded-md" />}>
              <Availability />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
