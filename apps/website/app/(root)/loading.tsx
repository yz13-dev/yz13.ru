import { AvailabilitySkeleton } from "@/components/availability";
import Footer from "@/components/footer/footer";
import { Logo } from "@/components/logo";
import packageJson from "@/package.json";
import { Skeleton } from "mono/components/skeleton";
import { CallToActionSkeleton } from "./components/call-to-action";
import { OtherProjectsSkeleton } from "./components/other-projects";
import Stack from "./components/stack";

export default function loading() {
  return (
    <>
      <div className="max-w-6xl w-full mx-auto py-12 px-6 space-y-6">
        <div className="size-24 relative border rounded-[25%] overflow-hidden shrink-0 flex items-center justify-center">
          <Logo size={{ width: 64, height: 64 }} type="only-icon" />
        </div>
        <AvailabilitySkeleton />
        <div className="flex md:w-2/3 w-full flex-col gap-6">
          <main className="w-full space-x-2 *:font-semibold *:inline *:md:text-4xl *:text-3xl max-w-2xl">
            <h1>YZ13</h1>
            <span>—</span>
            <p>
              Фронтенд разработчик, специализируюсь на разработке сайтов,
              веб-приложений.
            </p>
          </main>
        </div>
        <div className="flex items-center mt-6 gap-2">
          <CallToActionSkeleton />
        </div>
      </div>
      <div className="w-full gap-6 flex lg:flex-row flex-col max-w-6xl mx-auto p-6">
        <div className="lg:w-2/3 w-full space-y-8">
          <div className="w-full space-y-4">
            <span className="text-base block font-medium">Услуги</span>
            <div className="*:rounded-xl w-full *:border space-y-3 *:p-4">
              <Skeleton className="w-full rounded-xl h-28" />
              <Skeleton className="w-full rounded-xl h-28" />
              <Skeleton className="w-full rounded-xl h-28" />
              <Skeleton className="w-full rounded-xl h-28" />
            </div>
          </div>
          <div className="w-full space-y-4">
            <span className="text-base block font-medium">Стэк</span>
            <Stack />
          </div>
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
        <Footer />
      </div>
    </>
  );
}
