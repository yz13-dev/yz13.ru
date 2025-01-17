import { HandwrittenStrikethrough } from "@/components/handwritten-strikethrough";
import { Logo } from "@/components/logo";
import { SparklesText } from "@/components/sparkle-text";
import { Skeleton } from "mono/components/skeleton";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import Availability from "./availability";
import ConnectButton from "./connect-button";
const LiveTime = dynamic(() => import("@/components/live/live-time"), {
  ssr: false,
  loading: () => <Skeleton className="w-14 h-7 rounded-lg" />,
});

const Hero = () => {
  return (
    <div className="w-full space-y-6">
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
    </div>
  );
};

export default Hero;
