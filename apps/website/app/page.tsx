import { HandwrittenStrikethrough } from "@/components/handwritten-strikethrough";
import { Logo } from "@/components/logo";
import { NextIcon } from "@/components/pixel-stack/next-icon";
import { ReactIcon } from "@/components/pixel-stack/react-icon";
import { TailwindIcon } from "@/components/pixel-stack/tailwind-icon";
import { TypeScriptIcon } from "@/components/pixel-stack/typescript-icon";
import { ViteIcon } from "@/components/pixel-stack/vite-icon";
import { SparklesText } from "@/components/sparkle-text";
import { Badge } from "mono/components/badge";
import Availability from "./availability";

const page = () => {
  return (
    <div className="w-full min-h-dvh h-fit flex flex-col items-center gap-6">
      <div className="w-full max-w-lg space-y-6 mt-[30dvh] *:px-6">
        <div className="flex items-start gap-3">
          <div className="flex flex-col gap-1">
            <div className="inline-flex items-center mb-2 gap-2 flex-wrap">
              <Logo size={{ width: 32, height: 32 }} />
              <span className="text-foreground text-xl font-pixel font-semibold">
                YZ13
              </span>
            </div>
            <span className="text-secondary text-xl font-medium">
              <SparklesText
                text="Фронтенд разработчик,"
                className="text-foreground inline mr-2 text-xl font-medium"
              />
              {/* <span className="text-foreground">Фронтенд разработчик</span>, */}
              ничего серьезного.
            </span>
            <span className="text-secondary text-xl font-medium">
              На пути к{" "}
              <HandwrittenStrikethrough>отдыху</HandwrittenStrikethrough>{" "}
              фуллстеку.
            </span>
          </div>
        </div>
        <div className="w-full">
          <Availability />
        </div>
        <div className="w-full !mt-12 space-y-6">
          <span className="text-secondary text-xl font-medium">Мой стек:</span>
          <ul className="grid md:grid-cols-3 grid-cols-2 gap-x-2 gap-y-6">
            <li className="flex items-center gap-2 group cursor-default">
              <NextIcon className="size-6 fill-secondary group-hover:fill-foreground" />
              {/* <div className="size-6 bg-background-back rounded-md" /> */}
              <span className="text-secondary text-xl font-medium transition-colors group-hover:text-foreground">
                NextJS
              </span>
            </li>
            <li className="flex items-center gap-2 group cursor-default">
              <TypeScriptIcon className="size-6 fill-secondary group-hover:fill-foreground" />
              {/* <div className="size-6 bg-background-back rounded-md" /> */}
              <span className="text-secondary text-xl font-medium transition-colors group-hover:text-foreground">
                TypeScript
              </span>
            </li>
            <li className="flex items-center gap-2 group cursor-default">
              <TailwindIcon className="size-6 fill-secondary group-hover:fill-foreground" />
              {/* <div className="size-6 bg-background-back rounded-md" /> */}
              <span className="text-secondary text-xl font-medium transition-colors group-hover:text-foreground">
                TailwindCSS
              </span>
            </li>
            <li className="flex items-center gap-2 group cursor-default">
              <ReactIcon className="size-6 fill-secondary group-hover:fill-foreground" />
              {/* <div className="size-6 bg-background-back rounded-md" /> */}
              <span className="text-secondary text-xl font-medium transition-colors group-hover:text-foreground">
                React
              </span>
            </li>
            <li className="flex items-center gap-2 group cursor-default">
              <ViteIcon className="size-6 fill-secondary group-hover:fill-foreground" />
              {/* <div className="size-6 bg-background-back rounded-md" /> */}
              <span className="text-secondary text-xl font-medium transition-colors group-hover:text-foreground">
                Vite
              </span>
            </li>
            <li className="flex items-center gap-2 relative">
              <div className="size-6 bg-background-back border rounded-md" />
              <Badge
                className="absolute rotate-12 z-10 right-2 -top-3"
                variant="secondary"
              >
                Скоро
              </Badge>
              <HandwrittenStrikethrough
                textClassName="text-secondary text-xl font-medium"
                className="stroke-secondary"
              >
                NestJS
              </HandwrittenStrikethrough>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default page;
