import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import drafts_dark from "public/projects/maps/drafts-project-dark.png";
import drafts from "public/projects/maps/drafts-project.png";
import maps_dark from "public/projects/maps/map-project-dark.png";
import maps from "public/projects/maps/map-project.png";
import { cn } from "yz13/cn";
import Banner from "./banner";
import root from "./root.module.css";

const RootGrid = () => {
  return (
    <div className={cn("w-full", root["root-page-grid"])}>
      <div
        className={cn(
          "w-full h-full overflow-hidden col-span-2 row-span-2 flex flex-col items-center",
          "relative group",
          root["grid-item"],
        )}
      >
        <button className="flex items-center gap-2 text-foreground/80 p-6">
          <ArrowLeftIcon size={20} />
          <span className="text-xl font-medium">Обо мне</span>
        </button>
        <div className="h-full aspect-video relative left-14">
          <Banner className="w-[100%] absolute left-0 top-0" />
          <div className="absolute left-0 top-0 w-full h-full bg-gradient-to-b from-transparent to-background group-hover:to-background-back transition-colors" />
        </div>
        <Link href="/about" className="w-full absolute h-full top-0 left-0" />
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
        <div className="w-44 aspect-video border transition-all group-hover:rotate-3 overflow-hidden absolute rotate-6 -bottom-8 -right-6 rounded-lg bg-background">
          <Image
            src={drafts_dark}
            alt="Проект черновики"
            className="object-cover dark-mode-image"
            fill
          />
          <Image
            src={drafts}
            alt="Проект черновики"
            className="object-cover light-mode-image"
            fill
          />
        </div>
        <div className="w-44 aspect-video border transition-all group-hover:-rotate-3 overflow-hidden absolute -rotate-6 -bottom-12 -left-6 rounded-lg bg-background">
          <Image
            src={maps_dark}
            alt="Проект карты"
            className="object-cover dark-mode-image"
            fill
          />
          <Image
            src={maps}
            alt="Проект карты"
            className="object-cover light-mode-image"
            fill
          />
        </div>
        <Link
          href="/projects"
          className="w-full absolute h-full top-0 left-0"
        />
      </div>
    </div>
  );
};

export default RootGrid;
