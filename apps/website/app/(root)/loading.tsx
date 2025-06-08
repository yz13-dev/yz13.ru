import { AvailabilitySkeleton } from "@/components/availability";
import Calendar from "@/components/calendar";
import Footer from "@/components/footer/footer";
import { Logo } from "@/components/logo";
import { Skeleton } from "mono/components/skeleton";
import { CallToActionSkeleton } from "./components/call-to-action";
import { CalendarSkeleton } from "./components/github-activity-map";
import { OtherProjectsSkeleton } from "./components/other-projects";

export default function loading() {
  return (
    <>
      <div
        className="w-full max-w-6xl px-6 flex flex-row gap-4 mx-auto mt-[10%]"
      >
        <div className="max-w-sm shrink-0 md:block hidden space-y-2 w-full h-fit">
          <Calendar
            hideCaption
            disableNavigation
          />
        </div>
        <div className="space-y-12 w-full md:w-[calc(100%-var(--container-sm))]">
          <div className="space-y-6">
            <main className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="size-10 relative border rounded-[25%] overflow-hidden shrink-0 flex items-center justify-center bg-background/40">
                  <Logo size={{ width: 28, height: 28 }} type="only-icon" />
                </div>
                <h1 className="text-4xl font-bold">YZ13</h1>
              </div>
              <p className="text-2xl block text-muted-foreground font-medium">
                Фронтенд разработчик, специализируюсь на разработке сайтов, веб-приложений.
              </p>
            </main>
            <div className="flex flex-col gap-3">
              <CallToActionSkeleton />
            </div>
          </div>
          <div className="space-y-3">
            <AvailabilitySkeleton />
            <div className="p-3 rounded-lg border">
              <CalendarSkeleton loading />
            </div>
          </div>
          <section className="space-y-4">
            <h3 className="text-2xl block font-medium">Проекты</h3>
            <ul className="gap-6 grid md:grid-cols-2 grid-cols-1 w-full">
              <OtherProjectsSkeleton />
            </ul>
          </section>
          <section className="space-y-4">
            <h3 className="text-2xl block font-medium">Услуги</h3>
            <div className="w-full grid md:grid-cols-2 grid-cols-1 gap-3 *:py-3 *:px-4 *:rounded-lg *:border">
              <Skeleton className="w-full aspect-video" />
              <Skeleton className="w-full aspect-video" />
              <Skeleton className="w-full aspect-video" />
            </div>
          </section>
          <Footer className="mt-12 mb-6" />
        </div>
      </div>
    </>
  );
}
