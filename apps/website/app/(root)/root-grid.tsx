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

import web_app_dark from "public/works/reservia/map-editor-page-dark.png";
import web_app from "public/works/reservia/map-editor-page.png";

// import website_dark from "public/og/yz-dark-window.png";
// import website from "public/og/yz-light-window.png";

import pages_dark from "public/works/yz13/yz13-page-dark.png";
import pages from "public/works/yz13/yz13-page.png";

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
          <ArrowLeftIcon size={18} />
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
          <ArrowRightIcon size={18} />
        </button>
        <div className="w-20 aspect-[9/17] transition-all border absolute -bottom-16 -left-0.5 group-hover:-bottom-14 rounded-lg bg-background">
          <div className="w-full relative h-full rounded-xl">
            <Image
              placeholder="blur"
              src={pages_dark}
              alt="Обложка для услуги страниц"
              className="object-cover dark-mode-image"
              fill
            />
            <Image
              placeholder="blur"
              src={pages}
              alt="Обложка для услуги страниц"
              className="object-cover light-mode-image"
              fill
            />
          </div>
        </div>
        <div className="h-20 aspect-[16/9] transition-all border absolute -bottom-1.5 group-hover:bottom-0 left-6 rounded-lg bg-background">
          <div className="w-full relative h-full rounded-xl">
            <Image
              placeholder="blur"
              src={web_app_dark}
              alt="Обложка для услуги веб-приложений"
              className="object-cover dark-mode-image"
              fill
            />
            <Image
              placeholder="blur"
              src={web_app}
              alt="Обложка для услуги веб-приложений"
              className="object-cover light-mode-image"
              fill
            />
          </div>
        </div>
        <div className="h-20 aspect-[16/9] transition-all border absolute group-hover:-bottom-4 -bottom-5 left-16 rounded-lg bg-background">
          {/* <div className="w-full relative h-full rounded-xl">
            <Image
            placeholder="blur"
              src={website_dark}
              alt="Обложка для услуги сайта"
              className="object-cover dark-mode-image"
              fill
            />
            <Image
            placeholder="blur"
              src={website}
              alt="Обложка для услуги сайта"
              className="object-cover light-mode-image"
              fill
            />
          </div> */}
        </div>
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
          <ArrowRightIcon size={18} />
        </button>
        <div className="w-44 aspect-video border transition-all group-hover:rotate-3 overflow-hidden absolute rotate-6 -bottom-8 -right-6 rounded-lg bg-background">
          <Image
            placeholder="blur"
            src={drafts_dark}
            alt="Проект черновики"
            className="object-cover dark-mode-image"
            fill
          />
          <Image
            placeholder="blur"
            src={drafts}
            alt="Проект черновики"
            className="object-cover light-mode-image"
            fill
          />
        </div>
        <div className="w-44 aspect-video border transition-all group-hover:-rotate-3 overflow-hidden absolute -rotate-6 -bottom-12 -left-6 rounded-lg bg-background">
          <Image
            placeholder="blur"
            src={maps_dark}
            alt="Проект карты"
            className="object-cover dark-mode-image"
            fill
          />
          <Image
            placeholder="blur"
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
