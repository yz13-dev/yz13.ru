import Availability, { AvailabilitySkeleton } from "@/components/availability";
import Footer from "@/components/footer/footer";
import { Logo } from "@/components/logo";
import User from "@/components/user";
import { availableForWork } from "@yz13/flags";
import { cn } from "@yz13/ui/cn";
import { Badge } from "@yz13/ui/components/badge";
import { Button } from "@yz13/ui/components/button";
import { Skeleton } from "@yz13/ui/components/skeleton";
import { ArrowRightIcon, CircleHelp, SendIcon } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import Background from "./components/background";
import CallToAction from "./components/call-to-action";
import GitHubActivityMap from "./components/github-activity-map";
import OtherProjects, { OtherProjectsSkeleton } from "./components/other-projects";
import ServicesDetails from "./components/services-details";

export default async function page() {
  const isAvailable = await availableForWork();
  const chat_url = "https://t.me/yz13_dev";
  return (
    <>
      <Background />
      <header className="w-full h-16 flex items-center">
        <div className="max-w-screen-2xl px-6 w-full mx-auto h-fit flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Logo type="full" size={24} />
          </div>
          <div className="flex items-center gap-2">
            <Suspense fallback={<Skeleton className="h-9 w-16" />}>
              <User />
            </Suspense>
          </div>
        </div>
      </header>
      <div className="py-8 h-[calc(100dvh-64px)]">
        <div className="w-full h-16 justify-center items-center flex">
          <Suspense fallback={<AvailabilitySkeleton />}>
            <Availability />
          </Suspense>
        </div>
        <main className="w-full max-w-5xl mx-auto h-[calc(100%-64px)] flex flex-col gap-20 justify-center items-center">
          <div className="px-6 space-y-8">
            <div className="flex md:flex-row flex-col justify-center items-center gap-6">
              <div className="size-[148px] lg:flex hidden aspect-square items-center justify-center">
                <Logo size={148} />
              </div>
              <div className="size-[96px] lg:hidden flex aspect-square items-center justify-center">
                <Logo size={96} />
              </div>
              <h1 className="lg:text-9xl text-7xl text-center font-bold">YZ13</h1>
            </div>
            <p className="lg:text-4xl text-2xl block max-w-3xl w-full text-center font-medium text-muted-foreground">
              Фронтенд разработчик, специализируюсь на разработке сайтов, веб-приложений.
            </p>
          </div>

          <div className={cn(
            "flex lg:flex-row flex-col w-full items-center justify-center gap-6 px-6",
            "[&>button]:h-12 [&>button]:px-6 [&>button]:text-base [&>button]:rounded-full [&>button>svg]:!size-5",
            "[&>a]:h-12 [&>a]:px-6 [&>a]:text-base [&>a]:rounded-full [&>a>svg]:!size-5",
            "lg:*:w-fit *:w-full"
          )}>
            <CallToAction available={isAvailable} />
            <Button variant="secondary" asChild>
              <Link href={chat_url} target="_blank">
                <SendIcon />
                Чат
              </Link>
            </Button>
          </div>
        </main>
      </div>
      <div className="w-full divide-y *:first:border-t *:border-x *:last:border-b">
        <div className="w-full max-w-5xl mx-auto bg-card rounded-t-lg">
          <div className="w-full grid *:p-6 lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
            <div className="col-span-2 w-full h-full">
              <ServicesDetails />
            </div>
            <div className="w-full h-full flex flex-col gap-3">
              <Badge variant="secondary">Секция в разработке</Badge>
              <span className="block text-muted-foreground text-base">
                Скоро появится страница для прямой оплаты услуг.
              </span>
              <Button
                className="justify-between mt-auto w-full"
                disabled
              >
                Заказать <ArrowRightIcon />
              </Button>
            </div>
          </div>
        </div>
        <section className="w-full py-6 *:px-6 space-y-10 max-w-5xl mx-auto bg-card">
          <div className="w-full">
            <h3 className="text-2xl font-medium">
              Активность
            </h3>
            <p className="text-base text-muted-foreground">Календарь активности GitHub.</p>
          </div>
          <div className="w-full">
            <GitHubActivityMap username="yz13-dev" />
          </div>
        </section>
        <section className="w-full py-6 *:px-6 space-y-10 max-w-5xl mx-auto bg-card">
          <div className="w-full">
            <h3 className="text-2xl font-medium">
              Проекты
            </h3>
            <p className="text-base text-muted-foreground">
              Готовые и в процессе разработки.
            </p>
          </div>
          <div className="w-full">
            <ul className="gap-6 grid md:grid-cols-2 grid-cols-1 w-full">
              <Suspense fallback={<OtherProjectsSkeleton />}>
                <OtherProjects />
              </Suspense>
            </ul>
          </div>
        </section>
        <div className="w-full py-6 *:px-6 space-y-10 max-w-5xl mx-auto bg-card">
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
              <Button className="w-full justify-between" variant="default" disabled={!isAvailable}>
                Запланировать видеозвонок
                <ArrowRightIcon />
              </Button>
              <Button
                className="w-full justify-between"
                variant="outline"
                asChild
              >
                <Link href={chat_url} target="_blank">
                  Открыть чат
                  <ArrowRightIcon />
                </Link>
              </Button>
            </div>
          </div>
        </div>
        <div className="w-full p-6 max-w-5xl mx-auto bg-card">
          <Footer />
        </div>
      </div>
    </>
  );
}
