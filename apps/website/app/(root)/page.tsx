import Availability, { AvailabilitySkeleton } from "@/components/availability";
import { Logo } from "@/components/logo";
import Footer from "@/components/small-footer";
import User from "@/components/user";
import { availableForWork } from "@yz13/flags";
import { SendIcon } from "lucide-react";
import { Button } from "mono/components/button";
import { Skeleton } from "mono/components/skeleton";
import Link from "next/link";
import { Suspense } from "react";
import Background from "./components/background";
import CallToAction from "./components/call-to-action";
import GitHubActivityMap from "./components/github-activity-map";
import OtherProjects, {
  OtherProjectsSkeleton,
} from "./components/other-projects";
import ServicesDetails from "./components/services-details";
import TodayCalls from "./components/today-calls";

export default async function page() {
  const isAvailable = await availableForWork();
  const chat_url = "https://t.me/yz13_dev";
  return (
    <>
      <header className="flex items-center justify-end w-full mx-auto px-6 h-16">
        <Suspense fallback={<Skeleton className="rounded-full size-9" />}>
          <User />
        </Suspense>
      </header>
      <Suspense
        fallback={
          <Skeleton className="w-full h-dvh absolute top-0 left-0 rounded-none" />
        }
      >
        <Background className="h-dvh opacity-40" />
      </Suspense>
      <div className="w-full my-[10%] lg:gap-6 gap-12 flex lg:flex-row flex-col items-center max-w-6xl mx-auto p-6">
        <div className="lg:w-2/3 w-full space-y-8">
          <div className="size-24 relative border rounded-[25%] overflow-hidden shrink-0 flex items-center justify-center bg-background/40">
            <Logo size={{ width: 64, height: 64 }} type="only-icon" />
          </div>
          <Suspense fallback={<AvailabilitySkeleton />}>
            <Availability className="bg-background/40" />
          </Suspense>
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
        </div>
        <div className="lg:w-1/3 w-full h-full space-y-6">
          <div className="w-full h-fit my-auto space-y-3">
            <span className="block text-lg font-medium">Другие проекты</span>
            <ul className="space-y-6">
              <Suspense fallback={<OtherProjectsSkeleton />}>
                <OtherProjects />
              </Suspense>
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
        <GitHubActivityMap username="yz13-dev" />
      </div>
      <div className="w-full gap-6 max-w-6xl mx-auto px-6 py-12 space-y-12">
        <div className="space-y-3">
          <span className="text-3xl block font-semibold">Услуги</span>
          <span className="text-lg block text-muted-foreground">
            Список услуг по разработке, рад буду помочь вам с вашими проектами.
          </span>
        </div>
        <div className="w-full grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-x-3 gap-y-6">
          <ServicesDetails />
        </div>
      </div>
      <div className="w-full gap-6 max-w-6xl mx-auto p-6 space-y-6">
        <Footer />
      </div>
    </>
  );
}
