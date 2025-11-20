import Availability, { AvailabilitySkeleton } from "@/components/availability";
import { HeaderSkeleton } from "@/components/header";
import { ThemeImage } from "@/components/theme-image";
import { Button } from "@yz13/ui/button";
import { cn } from "@yz13/ui/cn";
import { ArrowRightIcon, SendIcon } from "@yz13/ui/icons";
import { Skeleton } from "@yz13/ui/skeleton";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Suspense } from "react";
const LogoStack = dynamic(() => import("./components/logo-stack"), {
  loading: () => <Skeleton className="size-32" />
});
const Footer = dynamic(() => import("@/components/footer"));
const GithubContributions = dynamic(() => import("@/components/github-contributions"), {
  loading: () => <Skeleton className="w-full h-[215px]" />
});


export default function Loading() {
  return (
    <>
      <HeaderSkeleton />
      <main
        className={cn(
          "container w-full mx-auto md:pt-32 pt-24 md:pb-[10%] pb-[7.5%] px-6",
          "h-fit",
          "flex flex-col items-center md:justify-start justify-between",
        )}
      >
        <div className="w-full h-fit flex items-center">
          <LogoStack orientation="horizontal" align="right" gap={40} />
        </div>
        <div className="w-full space-y-6">
          <div className="relative md:py-16 py-10 *:block space-y-8 max-w-4xl w-fit">
            <div className="w-fit hidden! md:py-10 py-0">
              <ThemeImage
                className="mx-auto w-fit"
                srcDark="/logo/dark-full.png"
                srcLight="/logo/light-full.png"
                width={256}
                height={40}
                alt="logo"
              />
            </div>
            <h1 className="md:text-6xl text-5xl text-balance font-semibold">
              Нужен разработчик?
            </h1>
            <p className="md:text-4xl text-2xl text-balance text-muted-foreground">
              Разработаю фронтенд для вашего проекта
            </p>
          </div>
        </div>
        <div className="w-full space-y-3">
          <Suspense
            fallback={<AvailabilitySkeleton type="full" className="h-10" />}
          >
            <Availability textType="full" className="h-10 text-base" />
          </Suspense>
          <div
            className={cn(
              "pt-4 *:text-lg [&>button>svg]:size-5!",
              "flex flex-row items-center justify-start gap-2",
              "*:w-fit *:h-12 *:px-8 w-full",
            )}
          >
            <Button variant="outline" size="lg" asChild>
              <Link href="https://t.me/yz13_dev" target="_blank">
                <SendIcon />
                <span>Чат</span>
              </Link>
            </Button>
            <Button variant="default" size="lg" disabled>
              <span>Запланировать видеозвонок</span>
              <ArrowRightIcon />
            </Button>
          </div>
        </div>
      </main>
      <div className="w-full container mx-auto px-6 py-6 space-y-6">
        <Suspense
          fallback={
            <GithubContributions
              username="yz13-dev"
              blockSize={24}
              blockRadius={6}
              loading
            />
          }
        >
          <GithubContributions
            username="yz13-dev"
            blockSize={24}
            blockRadius={6}
          />
        </Suspense>
      </div>
      <Footer />

    </>
  )
}
