import { Logo } from "@/components/logo";
import { Typewriter } from "@/components/text-writter";
import { ArrowRightIcon } from "lucide-react";
import { Button } from "mono/components/button";
import { Separator } from "mono/components/separator";
import { Metadata } from "next";
import Link from "next/link";
import config from "./page.config.json";
import RecentProjects from "./recent-projects";

export const metadata: Metadata = {
  title: config.name,
  description: config.description,
};

const page = async () => {
  return (
    <>
      <div className="w-full h-16">
        <header className="container mx-auto w-full h-full px-6 flex items-center justify-between">
          <Link href="/">
            <Logo size={{ width: 96, height: 18 }} type="full" />
          </Link>
          <Button className="rounded-xl gap-2">
            Заказать работу
            <ArrowRightIcon size={16} />
          </Button>
        </header>
      </div>
      <div className="container mx-auto w-full py-12 px-6">
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
        <div className="w-full flex aspect-video border divide-x overflow-hidden rounded-xl bg-background-back">
          <div className="w-1/4 h-full bg-background shadow-2xl">
            <div className="w-full gap-6 shrink-0 aspect-video flex justify-center items-center">
              <div className="size-16 rounded-xl border" />
              <Separator orientation="vertical" className="h-16" />
              <span className="text-4xl font-medium">APP</span>
            </div>
            <div className="w-full h-full pl-6 py-6">
              <div className="aspect-video h-full border rounded-xl"></div>
            </div>
          </div>
          <div className="w-1/4 h-full bg-background shadow-2xl">
            <div className="w-full gap-6 shrink-0 aspect-video flex justify-center items-center">
              <div className="size-16 rounded-xl border" />
              <Separator orientation="vertical" className="h-16" />
              <span className="text-4xl font-medium">APP</span>
            </div>
            <div className="w-full h-full pl-6 py-6">
              <div className="aspect-[9/16] h-full border rounded-xl"></div>
            </div>
          </div>
          <div className="w-1/4 h-full bg-background shadow-2xl">
            <div className="w-full gap-6 shrink-0 aspect-video flex justify-center items-center">
              <div className="size-16 rounded-xl border" />
              <Separator orientation="vertical" className="h-16" />
              <span className="text-4xl font-medium">APP</span>
            </div>
            <div className="w-full h-full pl-6 py-6">
              <div className="aspect-video h-full border rounded-xl"></div>
            </div>
          </div>
          <div className="w-1/4 h-full bg-background shadow-2xl">
            <div className="w-full gap-6 shrink-0 aspect-video flex justify-center items-center">
              <div className="size-16 rounded-xl border" />
              <Separator orientation="vertical" className="h-16" />
              <span className="text-4xl font-medium">APP</span>
            </div>
            <div className="w-full h-full pl-6 py-6">
              <div className="aspect-[9/16] h-full border rounded-xl"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="border-y">
        <div className="container mx-auto w-full p-6">
          <h2 className="text-4xl font-medium">Последние проекты</h2>
        </div>
      </div>
      <div className="divide-y">
        <RecentProjects />
      </div>
    </>
  );
};

export default page;
