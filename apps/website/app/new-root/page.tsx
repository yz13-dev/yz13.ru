import Availability from "@/components/availability";
import Header from "@/components/header";
import { Logo } from "@/components/logo";
import Nav from "@/components/nav/nav";
import User from "@/components/user";
import {
  availableForWork,
  showAppsLink,
  showCallToAction,
  showUser,
} from "@/const/flags";
import { LayoutGridIcon } from "lucide-react";
import { Button } from "mono/components/button";
import { Skeleton } from "mono/components/skeleton";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import Timeline from "../(root)/timeline";
import Dock, { DockSkeleton } from "@/components/dock/dock";
import CallToAction from "../(root)/call-to-action";
import { wait } from "@/helpers/wait";

export default async function page() {
  return (
    <>
      <div className="w-full">
        <div className="w-full h-dvh absolute top-0 left-0">
          <div className="w-full h-full relative">
            <Image
              className="object-cover w-full h-full invert dark:invert-0"
              src="/background/variant-1.gif"
              fill
              alt="background"
            />
            <div className="w-full h-full absolute top-0 left-0 backdrop-grayscale backdrop-blur-xl" />
          </div>
        </div>
        <Header className="border-none z-10 background-transparent md:px-[2.5%] px-[5%]">
          <Nav side="left">
            <Link href="/">
              <Logo size={{ width: 110, height: 20 }} type="full" />
            </Link>
          </Nav>
          <div className="flex items-center gap-2">
            <Suspense fallback={<Skeleton className="size-9" />}>
              {(await showAppsLink()) && (
                <Button variant="ghost" size="icon" asChild>
                  <Link href="/apps">
                    <LayoutGridIcon size={16} />
                  </Link>
                </Button>
              )}
            </Suspense>
            <Suspense fallback={<Skeleton className="h-9 w-[75px]" />}>
              {(await showUser()) && <User />}
            </Suspense>
          </div>
        </Header>
        <main className="w-full relative h-[calc(100dvh-56px)]">
          <div className="absolute bottom-0 left-0 space-y-10">
            <div className="w-full *:max-w-4xl space-y-6 md:px-[2.5%] px-[5%] *:block *:lg:text-5xl *:text-4xl">
              <h1 className="text-foreground font-semibold">
                YZ13 - Фронтенд разработчик
              </h1>
              <p className="text-secondary font-medium text-balance">
                Специализируюсь на разработке сайтов, веб-приложений. Увлекаюсь
                разработкой интерфейсов для сайтов и приложений.
              </p>
            </div>
            <div className="w-full max-w-dvw md:px-[2.5%] px-[5%] h-fit">
              {(await showCallToAction()) && (
                <CallToAction busy={await availableForWork()} />
              )}
            </div>
            <div className="w-full max-w-dvw md:px-[2.5%] px-[5%] h-fit">
              <Suspense
                fallback={<Skeleton className="h-4 w-full rounded-md" />}
              >
                <Availability />
              </Suspense>
            </div>
            <div className="w-full relative h-20 overflow-visible">
              <div className="w-full h-40 absolute bottom-0 z-0 left-0 bg-gradient-to-b from-transparent to-background" />
              <div className="w-full max-w-dvw h-20 px-6 pb-2 background-transition-to-b">
                <Timeline />
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
