import { Typewriter } from "@/components/text-writter";
import { isDev } from "@/const/env";
import { Separator } from "mono/components/separator";
import Image from "next/image";
import Dock from "../dock";
import { pageMetadata } from "../dynamic-metadata";
import { PageProps } from "../page-props";
import RecentBlog from "./recent-blog";
import RecentProjects from "./recent-projects";

export const metadata = pageMetadata("promo");

const page = async ({ searchParams }: PageProps) => {
  const preview = searchParams.preview === "true";
  return (
    <>
      <div className="container mx-auto w-full py-12 lg:!mt-24 mt-12 px-6">
        <Typewriter
          text={[
            "Фронтенд разработчик.",
            "Страницы, сайты, веб-приложения.",
            "YZ13",
          ]}
          speed={100}
          loop={true}
          className="text-7xl font-medium block"
        />
      </div>
      {false && (
        <div className="container flex items-center gap-4 mx-auto w-full p-6">
          <div className="w-1/6 h-24 rounded-xl bg-background-back" />
          <div className="w-1/6 h-24 rounded-xl bg-background-back" />
          <div className="w-1/6 h-24 rounded-xl bg-background-back" />
          <div className="w-1/6 h-24 rounded-xl bg-background-back" />
          <div className="w-1/6 h-24 rounded-xl bg-background-back" />
          <div className="w-1/6 h-24 rounded-xl bg-background-back" />
        </div>
      )}
      <div className="container mx-auto w-full p-6">
        <div className="w-full flex aspect-video border divide-x overflow-hidden rounded-3xl bg-background-back">
          <div className="w-1/4 h-full overflow-hidden bg-background shadow-2xl hover:bg-background-back transition-colors">
            <div className="w-full gap-6 shrink-0 aspect-video flex justify-center items-center">
              <div className="size-16 rounded-2xl bg-background border" />
              <Separator orientation="vertical" className="h-16" />
              <span className="text-4xl font-medium">Reservia</span>
            </div>
            <div className="w-full h-full pl-6 py-6">
              <div className="aspect-video h-full border rounded-xl">
                <Image
                  src="/pages/promo/reservia/map-editor-page.png"
                  className="!static rounded-xl object-cover light-mode-image"
                  fill
                  alt="Reservia"
                />
                <Image
                  src="/pages/promo/reservia/map-editor-page-dark.png"
                  className="!static rounded-xl object-cover dark-mode-image"
                  fill
                  alt="Reservia"
                />
              </div>
            </div>
          </div>
          <div className="w-1/4 h-full overflow-hidden bg-background shadow-2xl hover:bg-background-back transition-colors">
            <div className="w-full gap-6 shrink-0 aspect-video flex justify-center items-center">
              <div className="size-16 rounded-2xl bg-background border" />
              <Separator orientation="vertical" className="h-16" />
              <span className="text-4xl font-medium">YZ13</span>
            </div>
            <div className="w-full h-full pl-6 py-6">
              <div className="w-[125%] border rounded-xl">
                <Image
                  src="/pages/promo/yz13/yz13-page.png"
                  className="!static rounded-xl object-cover light-mode-image"
                  fill
                  alt="Reservia"
                />
                <Image
                  src="/pages/promo/yz13/yz13-page-dark.png"
                  className="!static rounded-xl object-cover dark-mode-image"
                  fill
                  alt="Reservia"
                />
              </div>
            </div>
          </div>
          <div className="w-1/4 h-full overflow-hidden bg-background shadow-2xl hover:bg-background-back transition-colors">
            <div className="w-full gap-6 shrink-0 aspect-video flex justify-center items-center">
              <div className="size-16 rounded-2xl bg-background border" />
              <Separator orientation="vertical" className="h-16" />
              <span className="text-4xl font-medium">Maps</span>
            </div>
            <div className="w-full h-full pl-6 py-6">
              <div className="aspect-video h-full border rounded-xl">
                <Image
                  src="/pages/promo/maps/map-project.png"
                  className="!static rounded-xl object-cover light-mode-image"
                  fill
                  alt="Reservia"
                />
                <Image
                  src="/pages/promo/maps/map-project-dark.png"
                  className="!static rounded-xl object-cover dark-mode-image"
                  fill
                  alt="Reservia"
                />
              </div>
            </div>
          </div>
          <div className="w-1/4 h-full overflow-hidden bg-background shadow-2xl hover:bg-background-back transition-colors">
            <div className="w-full gap-6 shrink-0 aspect-video flex justify-center items-center">
              <div className="size-16 rounded-2xl bg-background border" />
              <Separator orientation="vertical" className="h-16" />
              <span className="text-4xl font-medium">Drafts</span>
            </div>
            <div className="w-full h-full pl-6 py-6">
              <div className="aspect-video h-full border rounded-xl">
                <Image
                  src="/pages/promo/drafts/drafts-project.png"
                  className="!static rounded-xl object-cover light-mode-image"
                  fill
                  alt="Reservia"
                />
                <Image
                  src="/pages/promo/drafts/drafts-project-dark.png"
                  className="!static rounded-xl object-cover dark-mode-image"
                  fill
                  alt="Reservia"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="border-y">
        <div className="container mx-auto w-full px-6 pb-6 pt-12">
          <h2 className="text-4xl font-medium">Последние проекты</h2>
        </div>
      </div>
      <div className="divide-y">
        <RecentProjects />
      </div>
      <div className="border-y">
        <div className="container mx-auto w-full px-6 pb-6 pt-12">
          <h2 className="text-4xl font-medium">Блог</h2>
          <p className="text-4xl font-medium text-secondary">
            Собственный журнал
          </p>
        </div>
      </div>
      <div className="divide-y">
        <RecentBlog />
      </div>
      {!preview && isDev && <Dock />}
    </>
  );
};

export default page;
