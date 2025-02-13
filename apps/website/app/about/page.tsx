import Dock from "@/components/dock/dock";
import Footer from "@/components/footer";
import { Logo } from "@/components/logo";
import PageDockFiller from "@/components/page-dock-filler";
import { ArrowRightIcon } from "lucide-react";
import { Button } from "mono/components/button";
import { Skeleton } from "mono/components/skeleton";
import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import Availability from "../(root)/availability";
import Banner from "../(root)/banner";
import MVP from "../services/grid/mvp";
import Pages from "../services/grid/pages";
import WebApps from "../services/grid/web-apps";
import Website from "../services/grid/website";
import TechList from "./tech-list";

export const metadata: Metadata = {
  title: "Немного о себе",
  description:
    "Если хотите узнать больше о разработчике YZ13, то посетите эту страницу.",
};

const page = () => {
  return (
    <>
      <header className="w-full justify-between border-x py-4 px-6 h-20 flex items-center gap-4 border-b">
        <Link href="/">
          <Logo size={{ width: 128, height: 24 }} type="full" />
        </Link>
        <nav className="flex items-center gap-2">
          <Button className="gap-2" variant="ghost">
            Pages
          </Button>
          <Button className="gap-2" variant="secondary">
            Проекты <ArrowRightIcon size={16} />
          </Button>
        </nav>
      </header>

      <div className="w-full divide-y border-b">
        <div className="w-full">
          <div className="grid-template max-w-screen-2xl w-full mx-auto border-x">
            <div className="w-full h-full pattern-lines" />
            <div className="lg:!h-20 h-10 border-x p-6 space-y-6" />
            <div className="w-full h-full pattern-lines" />
          </div>
        </div>
        <div className="w-full">
          <div className="grid-template max-w-screen-2xl w-full mx-auto border-x">
            <div className="w-full h-full pattern-lines" />
            <main className="h-fit border-x px-6 py-3 flex flex-col gap-6">
              <h1 className="text-foreground lg:!text-5xl text-4xl font-medium">
                <span className="font-pixel">YZ13, </span>
                Фронтенд-разработчик
              </h1>
              <p className="text-secondary lg:!text-2xl texg-xl font-medium max-w-4xl text-balance">
                Специализируюсь на разработке сайтов, веб-приложений. Увлекаюсь
                разработкой интерфейсов для сайтов и приложений. Стараюсь
                расширить круг компетенций.
              </p>
            </main>
            <div className="w-full h-full pattern-lines" />
          </div>
        </div>
        <div className="w-full">
          <div className="grid-template max-w-screen-2xl w-full mx-auto border-x">
            <div className="w-full h-full pattern-lines" />
            <div className="h-6 border-x" />
            <div className="w-full h-full pattern-lines" />
          </div>
        </div>
        {false && (
          <>
            <div className="w-full">
              <div className="grid-template max-w-screen-2xl w-full mx-auto border-x">
                <div className="w-full h-full pattern-lines" />
                <div className="h-fit px-3 py-0 border-x flex items-center gap-2">
                  <Button className="gap-2" variant="secondary">
                    Проекты <ArrowRightIcon size={16} />
                  </Button>
                </div>
                <div className="w-full h-full pattern-lines" />
              </div>
            </div>
            <div className="w-full">
              <div className="grid-template max-w-screen-2xl w-full mx-auto border-x">
                <div className="w-full h-full pattern-lines" />
                <div className="h-6 border-x" />
                <div className="w-full h-full pattern-lines" />
              </div>
            </div>
          </>
        )}
        <div className="w-full">
          <div className="grid-template max-w-screen-2xl w-full mx-auto border-x">
            <div className="w-full h-full pattern-lines" />
            <div className="h-fit border-x px-6 py-3">
              <Suspense
                fallback={<Skeleton className="h-4 w-full rounded-md" />}
              >
                <Availability />
              </Suspense>
            </div>
            <div className="w-full h-full pattern-lines" />
          </div>
        </div>
        <div className="w-full">
          <div className="grid-template max-w-screen-2xl w-full mx-auto border-x">
            <div className="w-full h-full pattern-lines" />
            <div className="h-6 border-x" />
            <div className="w-full h-full pattern-lines" />
          </div>
        </div>
        <div className="w-full">
          <div className="grid-template max-w-screen-2xl w-full mx-auto border-x">
            <div className="w-full h-full pattern-lines" />
            <div className="h-fit flex items-center divide-x border-x xl:!grid flex xl:!grid-cols-3 xl:!grid-rows-1 flex-col">
              <div className="relative w-full h-full col-span-2 p-3 bg-neutral-100">
                <Banner imageClassName="!static object-cover" />
              </div>
              <div className="w-full flex flex-col h-full justify-between">
                <div className="relative w-full space-y-3 p-3 h-full pattern-lines">
                  <div className="w-full p-3 rounded-lg flex items-center gap-3 bg-background border justify-between">
                    <Website noBanner />
                  </div>
                  <div className="w-full p-3 rounded-lg flex items-center gap-3 bg-background border justify-between">
                    <Pages noBanner />
                  </div>
                  <div className="w-full p-3 rounded-lg flex items-center gap-3 bg-background border justify-between">
                    <WebApps noBanner />
                  </div>
                  <div className="w-full p-3 rounded-lg flex items-center gap-3 bg-background border justify-between">
                    <MVP />
                  </div>
                </div>
                <div className="w-full flex items-center gap-3 p-3 bg-neutral-100 border-t">
                  <Button className="w-1/2" variant="default">
                    Все услуги
                  </Button>
                  <Button className="w-1/2" variant="secondary">
                    Заказать услугу
                  </Button>
                </div>
              </div>
            </div>
            <div className="w-full h-full pattern-lines" />
          </div>
        </div>
        <div className="w-full">
          <div className="grid-template max-w-screen-2xl w-full mx-auto border-x">
            <div className="w-full h-full pattern-lines" />
            <div className="h-6 border-x p-6 space-y-6" />
            <div className="w-full h-full pattern-lines" />
          </div>
        </div>
        <div className="w-full">
          <div className="grid-template max-w-screen-2xl w-full mx-auto border-x">
            <div className="w-full h-full pattern-lines" />
            <div className="h-fit border-x pattern-lines divide-y">
              <div className="space-y-6 bg-neutral-100 p-6">
                <span className="text-secondary text-2xl block font-medium">
                  Доступные технологии для разработки
                </span>
              </div>
              <TechList className="p-6 bg-neutral-100" />
            </div>
            <div className="w-full h-full pattern-lines" />
          </div>
        </div>
        <div className="w-full">
          <div className="grid-template max-w-screen-2xl w-full mx-auto border-x">
            <div className="w-full h-full pattern-lines" />
            <div className="h-fit border-x p-6 space-y-6">
              <Footer />
            </div>
            <div className="w-full h-full pattern-lines" />
          </div>
        </div>
      </div>
      <PageDockFiller />
      <Dock />
    </>
  );
};

export default page;
