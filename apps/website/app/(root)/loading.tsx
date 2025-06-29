import { AvailabilitySkeleton } from "@/components/availability";
import { Logo } from "@/components/logo";
import { cn } from "@yz13/ui/cn";
import { Button } from "@yz13/ui/components/button";
import { Skeleton } from "@yz13/ui/components/skeleton";
import { ArrowRightIcon, CircleHelp } from "lucide-react";
import Link from "next/link";
import { CallToActionSkeleton } from "./components/call-to-action";
import { OtherProjectsSkeleton } from "./components/other-projects";

export default function loading() {
  return (
    <>
      <header className="w-full h-16 flex items-center">
        <div className="max-w-screen-2xl px-6 w-full mx-auto h-fit flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Logo type="full" size={24} />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-9 w-16" />
          </div>
        </div>
      </header>
      <div className="h-[calc(100dvh-64px)]">
        <div className="w-full h-16 justify-center items-center flex">
          <AvailabilitySkeleton />
        </div>
        <main
          className={cn(
            "w-full max-w-5xl mx-auto h-[calc(100%-64px-10%)] min-h-min",
            "md:gap-20 gap-10 py-6",
            "flex flex-col md:justify-center justify-between items-center"
          )}
        >
          <div className="px-6 md:space-y-8 space-y-4">
            <div className="flex flex-row md:justify-center justify-start items-center md:gap-6 gap-3">
              <div className="size-[148px] lg:flex hidden aspect-square items-center justify-center">
                <Logo size={148} />
              </div>
              <div className="size-[96px] lg:hidden flex aspect-square items-center justify-center">
                <Logo size={96} />
              </div>
              <h1 className="lg:text-9xl text-7xl md:text-center text-start font-bold">YZ13</h1>
            </div>
            <p className="lg:text-4xl text-2xl block max-w-3xl w-full md:text-center text-start font-medium text-muted-foreground">
              Фронтенд разработчик, специализируюсь на разработке сайтов, веб-приложений.
            </p>
          </div>

          <div className={cn(
            "flex lg:flex-row flex-col w-full items-center justify-center gap-6 px-6",
          )}>
            <CallToActionSkeleton className="lg:[&>div>*]:w-56 [&>div>*]:w-full lg:[&>div]:flex-row [&>div]:flex-col" />
          </div>
        </main>
        <div className="w-full h-[10%] py-3 flex iteitems-center justify-center" />
      </div>
      <div className="w-full *:max-w-screen-2xl space-y-12">
        <div className="w-full mx-auto">
          <div className="w-full grid *:p-6 lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
            <div className="col-span-2 w-full h-full">
              <div className="space-y-6">
                <div className="space-y-0.5">
                  <Skeleton className="w-full h-6" />
                  <Skeleton className="w-1/2 h-6" />
                </div>
                <div className="w-full flex gap-2 flex-wrap items-start">
                  <Skeleton className="w-36 h-10" />
                  <Skeleton className="w-36 h-10" />
                  <Skeleton className="w-36 h-10" />
                  <Skeleton className="w-36 h-10" />
                </div>
              </div>
            </div>
            <div className="w-full h-full flex flex-col gap-3">
              <Skeleton className="w-1/3 h-6" />
              <Skeleton className="w-full h-10" />
            </div>
          </div>
        </div>
        <section className="w-full py-6 *:px-6 space-y-6 mx-auto">
          <div className="w-full space-y-3">
            <div className="w-full">
              <h3 className="text-2xl font-medium">
                Виджеты
              </h3>
              <p className="text-base text-muted-foreground">Последние добавленные виджеты.</p>
            </div>
            <div className="w-full flex flex-row gap-3">
              <Skeleton className="w-36 h-10" />
              <Skeleton className="w-36 h-10" />
              <Skeleton className="w-36 h-10" />
            </div>
          </div>
          <div className="w-full">
            <Skeleton className="w-full h-[250px]" />
          </div>
        </section>
        <section className="w-full py-6 *:px-6 space-y-10 mx-auto">
          <div className="w-full">
            <h3 className="text-2xl font-medium">
              Проекты
            </h3>
            <p className="text-base text-muted-foreground">
              Готовые и в процессе разработки.
            </p>
          </div>
          <div className="w-full">
            <ul className="gap-6 grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full">
              <OtherProjectsSkeleton />
            </ul>
          </div>
        </section>
        <div className="w-full py-6 *:px-6 space-y-10 mx-auto">
          <div className="w-full grid *:p-6 lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
            <div className="col-span-2 w-full h-full flex items-center">
              <div className="h-16 w-full text-background bg-foreground rounded-full flex items-center pl-6 pr-1.5 py-1.5">
                <span className="lg:text-4xl text-3xl font-semibold">
                  Готовы начать?
                </span>
                <div className="h-full aspect-square flex items-center justify-center rounded-full text-foreground bg-background ml-auto">
                  <CircleHelp className="lg:size-12 size-10" />
                </div>
              </div>
            </div>
            <div className="w-full h-full space-y-3">
              <Button className="w-full justify-between" variant="default" disabled>
                Запланировать видеозвонок
                <ArrowRightIcon />
              </Button>
              <Button
                className="w-full justify-between"
                variant="outline"
                asChild
              >
                <Link href="/" target="_blank">
                  Открыть чат
                  <ArrowRightIcon />
                </Link>
              </Button>
            </div>
          </div>
        </div>
        <Skeleton className="w-full p-6 mx-auto h-80" />
      </div>
    </>
  );
}
