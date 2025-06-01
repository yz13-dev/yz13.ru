import Availability, { AvailabilitySkeleton } from "@/components/availability";
import { Logo } from "@/components/logo";
import Footer from "@/components/small-footer";
import User from "@/components/user";
import { availableForWork } from "@/const/flags";
import { wait } from "@/helpers/wait";
import { format } from "date-fns";
import { SendIcon } from "lucide-react";
import { Button } from "mono/components/button";
import { Skeleton } from "mono/components/skeleton";
import Link from "next/link";
import { Suspense } from "react";
import Background from "./components/background";
import CallToAction, {
  CallToActionSkeleton,
} from "./components/call-to-action";
import GitHubActivityMap from "./components/github-activity-map";
import OtherProjects, {
  OtherProjectsSkeleton,
} from "./components/other-projects";
import ServicesDetails from "./components/services-details";

export default async function page() {
  await wait(3000)
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
          <div className="flex items-center mt-6 gap-2">
            <Suspense fallback={<CallToActionSkeleton />}>
              <CallToAction busy={isAvailable} />
            </Suspense>
            <Button variant="ghost" asChild>
              <Link href={chat_url}>
                <SendIcon size={16} />
                Чат
              </Link>
            </Button>
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
      {!isAvailable && (
        <div className="w-full gap-6 max-w-6xl mx-auto px-6 py-12 space-y-12">
          <div className="space-y-3">
            <span className="text-3xl block font-semibold">Контакт</span>
            <span className="text-lg block text-muted-foreground">
              Если у вас есть вопросы или предложения, пишите нам на почту, или
              создайте созвон через форму ниже.
            </span>
          </div>
          <div className="flex w-full gap-6 lg:flex-row flex-col items-start">
            <div className="space-y-3">
              <span className="text-2xl font-semibold block">
                {format(new Date(), "EEEEEEE, d MMMM yyyy")}
              </span>
              <div className="w-fit h-fit rounded-3xl bg-background/40 border py-3 space-y-3 *:px-3">
                <div className="w-full grid grid-cols-7 *:text-muted-foreground *:w-full *:flex *:justify-center *:px-3 *:py-1 *:rounded-full gap-3 *:bg-secondary">
                  <span className="text-base font-medium">Mon</span>
                  <span className="text-base font-medium">Tue</span>
                  <span className="text-base font-medium">Wed</span>
                  <span className="text-base font-medium">Thu</span>
                  <span className="text-base font-medium">Fri</span>
                  <span className="text-base font-medium">Sat</span>
                  <span className="text-base font-medium">Sun</span>
                </div>
                <div className="gap-3 grid grid-cols-7">
                  {Array.from({ length: 30 }).map((_, i) => (
                    <div
                      key={i}
                      className="flex flex-col min-w-9 aspect-square bg-card rounded-xl items-center justify-end p-1 border"
                    >
                      <div className="text-xl text-muted-foreground font-medium">
                        {i + 1}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="space-y-3">
                <span className="text-base block font-medium">
                  Длительность
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-base px-3 py-1 rounded-full bg-secondary font-medium">
                    00:15
                  </span>
                  <span className="text-base px-3 py-1 rounded-full bg-secondary font-medium">
                    00:30
                  </span>
                </div>
              </div>
              <div className="space-y-3">
                <span className="text-base block font-medium">Время</span>
                <div className="flex items-start flex-wrap gap-2">
                  <span className="text-base px-3 py-1 rounded-full bg-secondary font-medium">
                    10:00
                  </span>
                  <span className="text-base px-3 py-1 rounded-full bg-secondary font-medium">
                    10:30
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="w-full gap-6 max-w-6xl mx-auto p-6 space-y-6">
        <Footer />
      </div>
    </>
  );
}
