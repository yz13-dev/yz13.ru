import {
  getBlogV1Posts,
  getNewsV1Recent,
  getPinsV1PinsRecommendations,
} from "@yz13/api";
import { Badge } from "@yz13/ui/badge";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { ExternalLinkIcon, LayoutGridIcon } from "lucide-react";
import Link from "next/link";
import Favicon from "./components/favicon";
import { Logo } from "./components/logo";
import LogoSvg from "./components/logo-svg";
import LinkLogo from "./components/logos/link-logo";
import PinsGrid from "./components/pins/pins-grid";
import SearchInput from "./components/search-input";
import User from "./components/user";
import News, { NewsLoading } from "./components/news";
import { Suspense } from "react";
import Blog, { BlogLoading } from "./components/blog";
import Pins from "./components/pins";
import { Skeleton } from "@yz13/ui/skeleton";
import YzlabLogo from "./components/logos/yzlab-logo";
import ExternalProject from "./components/external-project";
import { Button } from "@yz13/ui/button";
import { Popover } from "@yz13/ui/popover";
import { PopoverTrigger } from "@yz13/ui/popover";
import { PopoverContent } from "@yz13/ui/popover";

export default function () {
  return (
    <>
      <header className="w-full flex px-6 pt-6 items-center justify-between">
        <div className="w-fit gap-3 items-center flex justify-start">
          <Logo type="full" />
        </div>
        <div className="w-fit flex justify-end items-center gap-3">
          <User />
        </div>
      </header>
      <div className="max-w-4xl md:h-[calc(75dvh-64px)] h-fit mx-auto flex flex-col items-center justify-center pt-12 md:pb-36 pb-12 gap-2">
        <div className="w-full px-6 flex flex-col justify-center gap-24">
          <div className="flex items-center mx-auto gap-6">
            <ExternalProject label="Портфолио" link="https://yz13.dev">
              <Logo type="icon" />
            </ExternalProject>

            <ExternalProject label="Линк" link="https://yz13.link">
              <LinkLogo type="icon" />
            </ExternalProject>

            <ExternalProject label="yzlab" link="https://yzlab.ru">
              <YzlabLogo type="icon" />
            </ExternalProject>
          </div>
          <SearchInput />
        </div>
        <div className="flex px-6 justify-between w-full items-center">
          <div></div>
          <div></div>
        </div>
      </div>
      <div className="w-full max-w-6xl mx-auto pb-6 *:px-6 *:pt-6">
        <div className="w-full flex md:flex-row flex-col gap-6">
          <section className="md:w-2/3 w-full">
            <div className="w-full py-4">
              <h3 className="text-2xl font-medium">Новостная лента</h3>
            </div>
            <Suspense fallback={<NewsLoading />}>
              <News />
            </Suspense>
          </section>
          <section className="md:w-1/3 w-full">
            <div className="w-full py-4">
              <h3 className="text-2xl font-medium">Блог</h3>
            </div>
            <Suspense fallback={<BlogLoading />}>
              <Blog />
            </Suspense>
          </section>
        </div>
        <section className="w-full">
          <div className="w-full py-4">
            <h3 className="text-2xl font-medium">Пины</h3>
          </div>
          <div className="w-full flex gap-2">
            <Suspense fallback={<Skeleton className="w-full" />}>
              <Pins />
            </Suspense>
          </div>
        </section>
      </div>
      <footer className="max-w-6xl mx-auto w-full px-6 pt-24 pb-6">
        <LogoSvg className="opacity-10" />
      </footer>
    </>
  );
}
