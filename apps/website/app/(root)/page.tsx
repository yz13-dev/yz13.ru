import Availability, { AvailabilitySkeleton } from "@/components/availability";
import Calendar from "@/components/calendar";
import { Logo } from "@/components/logo";
import Footer from "@/components/small-footer";
import { availableForWork } from "@yz13/flags";
import { SendIcon } from "lucide-react";
import { Button } from "mono/components/button";
import Link from "next/link";
import { Suspense } from "react";
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
      <div
        className="w-full max-w-6xl px-6 flex flex-row gap-4 mx-auto mt-[10%]"
      >
        <div className="lg:max-w-sm md:max-w-2xs shrink-0 lg:block md:block hidden space-y-2 w-full h-fit">
          <Calendar
            hideCaption
            disableNavigation
          />
        </div>
        <div className="space-y-12 w-full lg:w-[calc(100%-var(--container-sm))] md:w-[calc(100%-var(--container-2xs))] max-w-full">
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
              <Availability className="bg-background/40" />
            </Suspense>
            <div className="p-3 rounded-lg border">
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
