import Availability, { AvailabilitySkeleton } from "@/components/availability";
import { Logo } from "@/components/logo";
import Footer from "@/components/small-footer";
import { availableForWork } from "@/const/flags";
import packageJson from "@/package.json";
import { SendIcon } from "lucide-react";
import { Button } from "mono/components/button";
import Link from "next/link";
import { Suspense } from "react";
import CallToAction, {
  CallToActionSkeleton,
} from "./components/call-to-action";
import OtherProjects, {
  OtherProjectsSkeleton,
} from "./components/other-projects";
import ServicesDetails from "./components/services-details";
import Stack from "./components/stack";

export default async function page() {
  const isAvailable = await availableForWork();
  const chat_url = "https://t.me/yz13_dev";
  return (
    <>
      <div className="max-w-6xl w-full mx-auto py-12 px-6 space-y-6">
        <div className="size-24 relative border rounded-[25%] overflow-hidden shrink-0 flex items-center justify-center">
          <Logo size={{ width: 64, height: 64 }} type="only-icon" />
        </div>
        <Suspense fallback={<AvailabilitySkeleton />}>
          <Availability />
        </Suspense>
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
      <div className="w-full gap-6 flex lg:flex-row flex-col max-w-6xl mx-auto p-6">
        <div className="lg:w-2/3 w-full space-y-8">
          <div className="w-full space-y-4">
            <span className="block text-lg font-medium">Услуги</span>
            <div className="*:rounded-xl w-full *:border space-y-3 *:p-4">
              <ServicesDetails />
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
          <div className="w-full space-y-3">
            <span className="text-base block font-medium">Другие проекты</span>
            <ul className="space-y-6">
              <Suspense fallback={<OtherProjectsSkeleton />}>
                <OtherProjects />
              </Suspense>
            </ul>
          </div>
        </div>
      </div>
      <div className="w-full gap-6 max-w-6xl mx-auto p-6 space-y-6">
        <Footer />
      </div>
    </>
  );
}
