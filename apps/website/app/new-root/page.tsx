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
import Link from "next/link";
import { Suspense } from "react";
import CallToAction from "../(root)/call-to-action";
import Timeline from "../(root)/timeline";
import Background from "./background";

export default async function page() {
  return (
    <>
      <div className="w-full">
        <Suspense
          fallback={
            <Skeleton className="w-full h-dvh absolute top-0 left-0 rounded-none" />
          }
        >
          <Background />
        </Suspense>
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
            <div className="w-full max-w-dvw h-20 px-6 pb-2 background-transition-to-b">
              <Timeline />
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
