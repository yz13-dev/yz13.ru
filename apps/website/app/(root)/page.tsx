import Availability, { AvailabilitySkeleton } from "@/components/availability";
import Calendar from "@/components/calendar";
import { Logo } from "@/components/logo";
import Footer from "@/components/small-footer";
import { availableForWork } from "@yz13/flags";
import { cn } from "@yz13/ui/cn";
import { Button } from "@yz13/ui/components/button";
import { SendIcon } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import Background from "./components/background";
import CallToAction from "./components/call-to-action";
import GitHubActivityMap from "./components/github-activity-map";
import OtherProjects, { OtherProjectsSkeleton } from "./components/other-projects";
import ServicesDetails from "./components/services-details";
import TodayCalls from "./components/today-calls";

export default async function page() {
  const isAvailable = await availableForWork();
  const chat_url = "https://t.me/yz13_dev";
  return (
    <>
      <Background />
      <div
        className={cn(
          "w-full px-6 flex flex-row gap-4 mx-auto mt-[10%]",
          isAvailable ? "max-w-6xl" : "max-w-4xl"
        )}
      >
        {
          isAvailable &&
          <div className="lg:max-w-sm md:max-w-2xs shrink-0 lg:block md:block hidden space-y-2 w-full h-fit">
            <Calendar
              hideCaption
              disableNavigation
            />
          </div>
        }
        <div className={cn(
          "space-y-12 w-full max-w-full",
          isAvailable ? "lg:w-[calc(100%-var(--container-sm))] md:w-[calc(100%-var(--container-2xs))]" : "w-full"
        )}>
          <div className="space-y-6 mb-24">
            <main className="space-x-2 lg:text-4xl text-2xl space-y-6">
              <div className="size-16 relative border rounded-[25%] overflow-hidden shrink-0 flex items-center justify-center bg-background/40">
                <Logo size={{ width: 48, height: 48 }} type="only-icon" />
              </div>
              <h1 className="inline font-bold">YZ13</h1>
              <span className="text-muted-foreground font-medium">-</span>
              <p className="inline text-muted-foreground font-medium">
                Фронтенд разработчик, специализируюсь на разработке сайтов, веб-приложений.
              </p>
            </main>
            <div className="flex flex-col gap-3">
              <TodayCalls />
              <div className="flex items-center gap-4">
                <CallToAction available={isAvailable} />
                <Button variant="ghost" asChild>
                  <Link href={chat_url}>
                    <SendIcon size={16} />
                    Чат
                  </Link>
                </Button>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <Suspense fallback={<AvailabilitySkeleton />}>
              <Availability className="bg-background/40 backdrop-blur-md" />
            </Suspense>
            <div className="p-3 rounded-lg border bg-background/40 backdrop-blur-md">
              <GitHubActivityMap username="yz13-dev" />
            </div>
          </div>
          <section className="space-y-4">
            <h3 className="text-2xl block font-medium">Проекты</h3>
            <ul className="gap-6 grid md:grid-cols-2 grid-cols-1 w-full">
              <Suspense fallback={<OtherProjectsSkeleton />}>
                <OtherProjects />
              </Suspense>
            </ul>
          </section>
          <section className="space-y-4">
            <h3 className="text-2xl block font-medium">Услуги</h3>
            <div className="w-full grid md:grid-cols-2 grid-cols-1 gap-3 *:py-3 *:px-4 *:rounded-lg *:border">
              <ServicesDetails />
            </div>
          </section>
          <Footer className="mt-12 mb-6" />
        </div>
      </div>
    </>
  );
}
