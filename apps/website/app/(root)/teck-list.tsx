import { NextIcon } from "@/components/pixel-stack/next-icon";
import { ReactIcon } from "@/components/pixel-stack/react-icon";
import { TailwindIcon } from "@/components/pixel-stack/tailwind-icon";
import { TypeScriptIcon } from "@/components/pixel-stack/typescript-icon";
import { ViteIcon } from "@/components/pixel-stack/vite-icon";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "mono/components/tooltip";

const TechList = () => {
  return (
    <div className="w-full space-y-3">
      <span className="text-secondary text-base font-medium">Мой стек:</span>
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
  );
};

export default TechList;
