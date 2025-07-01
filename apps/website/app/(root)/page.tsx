import Availability, { AvailabilitySkeleton } from "@/components/availability";
import Footer from "@/components/footer/footer";
import { Logo } from "@/components/logo";
import Nav from "@/components/nav";
import User from "@/components/user";
import { availableForWork, getMainEmail, getSecondaryEmail } from "@yz13/flags";
import { cn } from "@yz13/ui/cn";
import { Badge } from "@yz13/ui/components/badge";
import { Button } from "@yz13/ui/components/button";
import { Skeleton } from "@yz13/ui/components/skeleton";
import { ArrowRightIcon, CircleHelp, SendIcon } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import Background from "./components/background";
import CallToAction from "./components/call-to-action";
import OtherProjects, { OtherProjectsSkeleton } from "./components/other-projects";
import ServicesDetails from "./components/services-details";
import Stand from "./components/widgets/stand";

export default async function page() {

  const isAvailable = await availableForWork();
  const chat_url = "https://t.me/yz13_dev";

  const primaryEmail = await getMainEmail()
  const secondaryEmail = await getSecondaryEmail()

  return (
    <>
      <Background />
      {
        false &&
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
      }
      <div className="h-dvh">
        <div className="w-full h-16 justify-center items-center flex">
          <Suspense fallback={<AvailabilitySkeleton />}>
            <Availability />
          </Suspense>
        </div>
        <main
          className={cn(
            "w-full max-w-5xl mx-auto h-[calc(100%-64px-120px)] min-h-min",
            "md:gap-20 gap-10 pt-6 lg:pb-12 pb-6",
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
            "flex md:flex-row flex-col w-full items-center justify-center gap-6 px-6",
            "[&>button]:h-12 [&>button]:px-6 [&>button]:text-base [&>button]:rounded-full [&>button>svg]:!size-5",
            "[&>a]:h-12 [&>a]:px-6 [&>a]:text-base [&>a]:rounded-full [&>a>svg]:!size-5",
            "md:*:w-fit *:w-full"
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
        <div className="w-full h-[120px] py-3">
          <div className="w-full max-w-5xl h-fit mx-auto px-6 flex md:flex-row flex-col gap-6 items-center justify-between">
            <div className="flex flex-col gap-1">
              <span className="text-muted-foreground text-xs">По вопросам и/или предложениям пишите:</span>
              <div className="flex items-center gap-2">
                <Link href={`mailto:${primaryEmail}`} className="text-foreground text-xs hover:underline">{primaryEmail}</Link>
                <span className="text-muted-foreground text-xs">или</span>
                <Link href={`mailto:${secondaryEmail}`} className="text-foreground text-xs hover:underline">{secondaryEmail}</Link>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Nav />
              <Suspense fallback={<Skeleton className="h-9 w-16" />}>
                <User />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full *:max-w-5xl mt-[10%] space-y-12">
        <section className="w-full py-6 *:px-6 space-y-6 mx-auto">
          <div className="w-full">
            <h3 className="text-2xl font-medium">
              Услуги
            </h3>
            {/* <p className="text-base text-muted-foreground"></p> */}
          </div>
          <div className="w-full grid grid-cols-1">
            <div className="lg:col-span-2 col-span-1 w-full h-full">
              <ServicesDetails />
            </div>
            {
              false &&
              <div className="w-full h-full flex flex-col gap-3">
                <Badge variant="secondary">Секция в разработке</Badge>
                <span className="block text-muted-foreground text-base">
                  Скоро появится страница для прямой оплаты услуг.
                </span>
                <Button
                  className="justify-between mt-auto w-full lg:max-w-full max-w-md"
                  disabled
                  size="lg"
                >
                  Заказать <ArrowRightIcon />
                </Button>
              </div>
            }
          </div>
        </section>
        <section className="w-full py-6 *:px-6 space-y-6 mx-auto">
          <Stand />
        </section>
        <section className="w-full py-6 *:px-6 space-y-10  mx-auto">
          <div className="w-full">
            <h3 className="text-2xl font-medium">
              Проекты
            </h3>
            <p className="text-base text-muted-foreground">
              Готовые и в процессе разработки.
            </p>
          </div>
          <div className="w-full">
            <ul className="gap-6 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full">
              <Suspense fallback={<OtherProjectsSkeleton />}>
                <OtherProjects />
              </Suspense>
            </ul>
          </div>
        </section>
        <div className="w-full py-6 *:px-6  mx-auto">
          <div className="w-full grid gap-6 lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
            <div className="lg:col-span-2 col-span-1 w-full h-full flex items-center">
              <div className="w-full h-16 relative group flex items-center justify-center">
                <div
                  className={cn(
                    "w-full h-full rounded-full bg-foreground/40 absolute transition-all",
                    "group-hover:scale-100 group-hover:blur-md"
                  )}
                />
                <div className="h-full w-full z-10 text-background bg-foreground rounded-full flex items-center pl-6 pr-1.5 py-1.5">
                  <span className="lg:text-4xl text-3xl font-semibold">
                    Готовы начать?
                  </span>
                  <div className="h-full aspect-square flex items-center justify-center rounded-full text-foreground bg-background ml-auto">
                    <CircleHelp className="lg:size-12 size-10" />
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full h-full space-y-3">
              <Button
                className="w-full justify-between text-base"
                variant="default"
                size="lg"
                disabled={!isAvailable}
              >
                Запланировать видеозвонок
                <ArrowRightIcon className="size-5" />
              </Button>
              <Button
                className="w-full justify-between text-base"
                variant="outline"
                size="lg"
                asChild
              >
                <Link href={chat_url} target="_blank">
                  Открыть чат
                  <ArrowRightIcon className="size-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
        <div className="w-full p-6  mx-auto">
          <Footer />
        </div>
      </div>
    </>
  );
}
