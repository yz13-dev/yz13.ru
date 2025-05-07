import Footer from "@/components/footer/footer";
import { Logo } from "@/components/logo";
import packageJson from "@/package.json";
import { Separator } from "mono/components/separator";
import { Skeleton } from "mono/components/skeleton";
import { CallToActionSkeleton } from "./call-to-action";
import { OtherProjectsSkeleton } from "./other-projects";
import { GallerySkeleton } from "./screenshots-gallery";
import Stack from "./stack";

export default function loading() {
  return (
    <>
      <header className="max-w-6xl w-full mx-auto h-[68px]" />
      <div className="max-w-6xl w-full mx-auto px-6 space-y-6 mt-[10%]">
        <div className="flex flex-row lg:items-center items-start gap-6 lg:justify-between justify-start">
          <div className="size-16 shrink-0 lg:hidden flex items-center justify-center">
            <Logo size={{ width: 64, height: 64 }} type="only-icon" />
          </div>
          <div className="flex w-full flex-col gap-6">
            <main className="flex w-full flex-col gap-2">
              <h1 className="lg:text-5xl text-3xl lg:font-bold font-semibold">
                YZ13
              </h1>
              <p className="lg:text-lg max-w-md text-sm text-muted-foreground">
                Фронтенд разработчик, специализируюсь на разработке сайтов,
                веб-приложений.
              </p>
            </main>
            <div className="flex items-center gap-2">
              <Skeleton className="size-[22px] rounded-full" />
              <Skeleton className="h-[22px] w-28 rounded-full" />
            </div>
            <CallToActionSkeleton />
          </div>
          <div className="h-60 w-1/3 shrink-0 lg:flex hidden items-center justify-center">
            <Logo size={{ width: 240, height: 240 }} type="only-icon" />
          </div>
        </div>
      </div>
      <div className="w-full gap-6 flex lg:flex-row flex-col max-w-6xl mx-auto p-6 space-y-6">
        <div className="lg:w-2/3 w-full space-y-8">
          <Skeleton className="h-4 w-full rounded-md" />
          <GallerySkeleton className="h-80 w-full" />
          <div className="w-full space-y-4">
            <span className="text-base block font-medium">Описание</span>
            <span className="text-base text-muted-foreground block">
              Занимаюсь разработкой сайтов в основное время, пробую себя в бэке
              и дизайне в свободное время.
            </span>
          </div>
          {/* <Separator />
          <div className="w-full space-y-6">
            <div className="space-y-1 *:block">
              <span className="text-base block font-medium">График</span>
              <span className="text-sm block text-muted-foreground">
                Время когда я буду доступен для созвонов и сообщений
              </span>
            </div>
            <SectionSkeleton />
          </div> */}
          <Separator />
          <div className="w-full space-y-4">
            <span className="text-base block font-medium">Услуги</span>
            <div className="rounded-xl w-full bg-background-secondary border divide-y *:p-4">
              <Skeleton className="w-full rounded-xl h-96" />
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
            <OtherProjectsSkeleton />
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
