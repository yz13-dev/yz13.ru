import { AvailabilitySkeleton } from "@/components/availability";
import Footer from "@/components/footer/footer";
import { Logo } from "@/components/logo";
import { CallToActionSkeleton } from "./components/call-to-action";
import { OtherProjectsSkeleton } from "./components/other-projects";

export default function loading() {
  return (
    <div className="flex w-full lg:h-dvh h-fit items-center justify-center flex-col gap-12">
      <div className="w-full lg:gap-6 gap-12 flex lg:flex-row flex-col max-w-6xl mx-auto p-6">
        <div className="lg:w-2/3 w-full space-y-8">
          <div className="size-24 relative border rounded-[25%] overflow-hidden shrink-0 flex items-center justify-center">
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
          <div className="flex items-center mt-6 gap-2">
            <CallToActionSkeleton />
          </div>
        </div>
        <div className="lg:w-1/3 w-full h-full flex items-end space-y-6">
          <div className="w-full h-fit space-y-3">
            <span className="block text-lg font-medium">Другие проекты</span>
            <ul className="space-y-6">
              <OtherProjectsSkeleton />
            </ul>
          </div>
        </div>
      </div>
      <div className="w-full gap-6 max-w-6xl mx-auto p-6 space-y-6">
        <Footer />
      </div>
    </div>
  );
}
