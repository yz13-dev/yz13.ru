import { AvailabilitySkeleton } from "@/components/availability";
import Footer from "@/components/footer/footer";
import { Logo } from "@/components/logo";
import { Skeleton } from "mono/components/skeleton";
import { CallToActionSkeleton } from "./components/call-to-action";
import { CalendarSkeleton } from "./components/github-activity-map";
import { OtherProjectsSkeleton } from "./components/other-projects";

export default function loading() {
  return (
    <>
      <header className="flex items-center justify-end w-full mx-auto px-6 h-16">
        <Skeleton className="rounded-full size-9" />
      </header>
      <div className="w-full my-[10%] lg:gap-6 gap-12 flex lg:flex-row flex-col items-center max-w-6xl mx-auto p-6">
        <div className="lg:w-2/3 w-full space-y-8">
          <div className="size-24 relative border rounded-[25%] overflow-hidden shrink-0 flex items-center justify-center bg-background/40">
            <Logo size={{ width: 64, height: 64 }} type="only-icon" />
          </div>
          <AvailabilitySkeleton />
          <div className="flex w-full flex-col gap-6">
            <main className="w-full space-x-2 *:font-semibold *:inline *:md:text-4xl *:text-3xl">
              <h1>YZ13</h1>
              <span>—</span>
              <p>
                Фронтенд разработчик, специализируюсь на разработке сайтов,
                веб-приложений.
              </p>
            </main>
          </div>
          <div className="mt-6">
            <div className="flex flex-col gap-3">
              <Skeleton className="w-48 h-7 rounded-full" />
              <div className="flex items-center gap-4">
                <CallToActionSkeleton />
              </div>
            </div>
          </div>
        </div>
        <div className="lg:w-1/3 w-full h-full space-y-6">
          <div className="w-full h-fit my-auto space-y-3">
            <span className="block text-lg font-medium">Другие проекты</span>
            <ul className="space-y-6">
              <OtherProjectsSkeleton />
            </ul>
          </div>
        </div>
      </div>
      <div className="w-full gap-6 max-w-6xl mx-auto px-6 py-12 space-y-12">
        <div className="space-y-3">
          <span className="text-3xl block font-semibold">Активность</span>
          <span className="text-lg block text-muted-foreground">
            Календарь активности GitHub.
          </span>
        </div>
        <CalendarSkeleton loading />
      </div>
      <div className="w-full gap-6 max-w-6xl mx-auto p-6 space-y-6">
        <Footer />
      </div>
    </>
  );
}
