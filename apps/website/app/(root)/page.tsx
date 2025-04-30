import Availability from "@/components/availability";
import Footer from "@/components/footer/footer";
import { Logo } from "@/components/logo";
import { availableForWork, showCallToAction } from "@/const/flags";
import packageJson from "@/package.json";
import { Separator } from "mono/components/separator";
import { Skeleton } from "mono/components/skeleton";
import { Suspense } from "react";
import CallToAction, { CallToActionSkeleton } from "./call-to-action";
import OtherProjects, { OtherProjectsSkeleton } from "./other-projects";
import ServicesDetails from "./services-details";
import Stack from "./stack";

export default async function page() {
  return (
    <>
      <div className="max-w-6xl w-full mx-auto px-6 space-y-6 mt-[10%]">
        <div className="flex flex-row lg:items-center items-start gap-6 lg:justify-between justify-start">
          <div className="size-16 shrink-0 lg:hidden flex items-center justify-center">
            <Logo size={{ width: 64, height: 64 }} type="only-icon" />
          </div>
          <div className="flex flex-col gap-6">
            <div className="flex w-full flex-col gap-2">
              <h1 className="lg:text-5xl text-3xl lg:font-bold font-semibold">
                YZ13
              </h1>
              <span className="lg:text-lg text-sm text-muted-foreground">
                Фронтенд разработчик
              </span>
            </div>
            <Suspense fallback={<CallToActionSkeleton />}>
              {(await showCallToAction()) && (
                <CallToAction busy={await availableForWork()} />
              )}
            </Suspense>
          </div>
          <div className="h-60 w-1/3 shrink-0 lg:flex hidden items-center relative justify-center">
            <Logo
              size={{ width: 240, height: 240 }}
              type="only-icon"
              className="z-10"
            />
            <Logo
              size={{ width: 240, height: 240 }}
              type="only-icon"
              className="z-[-1] blur-3xl absolute animate-pulse"
            />
          </div>
        </div>
      </div>
      <div className="w-full gap-6 flex lg:flex-row flex-col max-w-6xl mx-auto p-6">
        <div className="lg:w-2/3 w-full space-y-8">
          <Suspense fallback={<Skeleton className="h-4 w-full rounded-md" />}>
            <Availability />
          </Suspense>
          <div className="w-full space-y-4">
            <span className="text-base block font-medium">Описание</span>
            <p className="text-base text-muted-foreground block">
              Фронтенд разработчик, специализируюсь на разработке сайтов,
              веб-приложений.
            </p>
          </div>
          <Separator />
          <div className="w-full space-y-4">
            <span className="text-base block font-medium">Услуги</span>
            <div className="rounded-xl w-full bg-background-secondary border divide-y *:p-4">
              <ServicesDetails />
            </div>
          </div>
          <Separator />
          <div className="w-full space-y-4">
            <span className="text-base block font-medium">Стэк</span>
            <Stack />
          </div>
          <Separator />
          <div className="w-full space-y-4">
            <span className="text-sm block font-medium">Последняя версия</span>
            <span className="text-sm text-muted-foreground block">
              {packageJson.version}
            </span>
          </div>
        </div>
        <div className="lg:w-1/3 w-full space-y-6">
          <span className="text-base block font-medium">Другие проекты</span>
          <ul className="space-y-6">
            <Suspense fallback={<OtherProjectsSkeleton />}>
              <OtherProjects />
            </Suspense>
          </ul>
        </div>
      </div>
      <div className="w-full gap-6 max-w-6xl mx-auto p-6 space-y-6">
        <Separator />
        <Footer />
      </div>
    </>
  );
}
