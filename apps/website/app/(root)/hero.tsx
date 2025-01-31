import { HandwrittenStrikethrough } from "@/components/handwritten-strikethrough";
import { SparklesText } from "@/components/sparkle-text";
import { Skeleton } from "mono/components/skeleton";
import dynamic from "next/dynamic";

import { Suspense } from "react";
import Availability from "./availability";

const ConnectButton = dynamic(() => import("./connect-button"), {
  loading: () => (
    <span className="w-28 h-7 rounded-lg bg-background-back animate-pulse inline-block ml-2" />
  ),
});

const Hero = () => {
  return (
    <div className="flex flex-col gap-4 w-full h-full">
      <div className="flex flex-row gap-x-2 flex-wrap w-full">
        <SparklesText
          tag="h1"
          text="Фронтенд разработчик,"
          className="text-foreground text-xl font-medium"
        />
        <p className="text-secondary text-xl w-fit font-medium">
          ничего серьезного. На пути к{" "}
          <HandwrittenStrikethrough>отдыху</HandwrittenStrikethrough> фуллстеку.
          <Suspense
            fallback={
              <span className="w-28 h-7 rounded-lg bg-background-back animate-pulse inline-block mx-2" />
            }
          >
            <ConnectButton className="inline-block mx-2" />
          </Suspense>
          Помогаю вам создать сайты и приложения.
        </p>
      </div>
      <div className="w-full">
        <Suspense fallback={<Skeleton className="h-4 w-full rounded-md" />}>
          <Availability />
        </Suspense>
      </div>
    </div>
  );
};

export default Hero;
