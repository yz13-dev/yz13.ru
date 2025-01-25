import { HandwrittenStrikethrough } from "@/components/handwritten-strikethrough";
import { Logo } from "@/components/logo";
import { SparklesText } from "@/components/sparkle-text";
import { Skeleton } from "mono/components/skeleton";
import dynamic from "next/dynamic";
import Image from "next/image";
import { Suspense } from "react";
const Availability = dynamic(() => import("./availability"), {
  loading: () => <Skeleton className="h-5 w-full rounded-md" />,
});
const ConnectButton = dynamic(() => import("./connect-button"), {
  loading: () => (
    <span className="w-28 h-7 rounded-lg bg-background-back animate-pulse inline-block ml-2" />
  ),
});

const Hero = () => {
  return (
    <div className="w-full space-y-6">
      <div className="flex items-start gap-3 w-full">
        <div className="flex flex-col gap-1 w-full">
          <div className="mb-2 gap-2 flex items-center w-full justify-between">
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
        </div>
      </div>

      <div className="w-full">
        <Suspense fallback={<Skeleton className="h-5 w-full rounded-md" />}>
          <Availability />
        </Suspense>
      </div>

      <div
        className="relative w-full h-fit aspect-video rounded-xl border overflow-hidden"
        itemScope
        itemType="http://schema.org/ImageObject"
      >
        <Image
          fill
          itemProp="contentUrl"
          src="/og/yz-dark-window.png"
          className="dark-mode-image w-full"
          alt="Нужен разработчик?"
        />
        <Image
          fill
          itemProp="contentUrl"
          src="/og/yz-light-window.png"
          className="light-mode-image w-full"
          alt="Нужен разработчик?"
        />
      </div>
    </div>
  );
};

export default Hero;
