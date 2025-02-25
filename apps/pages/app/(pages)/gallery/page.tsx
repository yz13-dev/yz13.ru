import { Logo } from "@/components/logo";
import { isDev } from "@/const/env";
import { ArrowUpIcon, HeartIcon } from "lucide-react";
import { Button } from "mono/components/button";
import { Separator } from "mono/components/separator";
import Link from "next/link";
import Dock from "../dock";
import { pageMetadata } from "../dynamic-metadata";
import { PageProps } from "../page-props";

export const metadata = pageMetadata("gallery");

const page = async ({ searchParams }: PageProps) => {
  const preview = searchParams.preview === "true";
  return (
    <>
      <div className="flex flex-row w-full">
        <aside className="w-80 h-dvh border-r sticky top-0 flex flex-col gap-6 p-6">
          <Link href="/">
            <Logo size={{ width: 110, height: 24 }} type="full" />
          </Link>
          <span className="text-secondary text-prettys text-sm">
            Галлерея контента, распологайтесь и не стесняйтесь отправлять свои
            работы, возможно именно ваша попадет в галлерею.
          </span>
          <Button variant="default" className="w-full h-10 mt-auto gap-2">
            <ArrowUpIcon size={16} />
            Отправить работу
          </Button>
        </aside>
        <div className="w-[calc(100dvw-80px)] min-h-dvh">
          <nav className="flex flex-row gap-2 px-6 py-3 bg-background border-b sticky top-0">
            <Button variant="outline" size="icon">
              <HeartIcon size={16} />
            </Button>
            <Separator orientation="vertical" className="h-9" />
            <Button variant="default">Все</Button>
            <Button variant="ghost">Картинки</Button>
            <Button variant="ghost">Видео</Button>
          </nav>
          <div className="w-full p-6 grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 *:aspect-[4/2.5] *:bg-secondary/5">
            <div className="w-full border rounded-xl overflow-hidden" />
            <div className="w-full border rounded-xl overflow-hidden" />
            <div className="w-full border rounded-xl overflow-hidden" />
            <div className="w-full border rounded-xl overflow-hidden" />

            <div className="w-full border rounded-xl overflow-hidden" />
            <div className="w-full border rounded-xl overflow-hidden" />
            <div className="w-full border rounded-xl overflow-hidden" />
            <div className="w-full border rounded-xl overflow-hidden" />

            <div className="w-full border rounded-xl overflow-hidden" />
            <div className="w-full border rounded-xl overflow-hidden" />
            <div className="w-full border rounded-xl overflow-hidden" />
            <div className="w-full border rounded-xl overflow-hidden" />

            <div className="w-full border rounded-xl overflow-hidden" />
            <div className="w-full border rounded-xl overflow-hidden" />
            <div className="w-full border rounded-xl overflow-hidden" />
            <div className="w-full border rounded-xl overflow-hidden" />

            <div className="w-full border rounded-xl overflow-hidden" />
            <div className="w-full border rounded-xl overflow-hidden" />
            <div className="w-full border rounded-xl overflow-hidden" />
            <div className="w-full border rounded-xl overflow-hidden" />
          </div>
        </div>
      </div>
      {!preview && isDev && <Dock />}
    </>
  );
};

export default page;
