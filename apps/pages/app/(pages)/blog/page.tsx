import { isDev } from "@/const/env";
import { Button } from "mono/components/button";
import { Input } from "mono/components/input";
import { Separator } from "mono/components/separator";
import { cn } from "yz13/cn";
import Dock from "../dock";
import { pageMetadata } from "../dynamic-metadata";
import { PageProps } from "../page-props";

export const metadata = pageMetadata("blog");

const page = async ({ searchParams }: PageProps) => {
  const preview = searchParams.preview === "true";
  return (
    <>
      <div
        className={cn(
          "w-full min-h-dvh flex md:!flex-row flex-col",
          "md:!divide-x divide-x-0 md:!divide-y-0 divide-y",
        )}
      >
        <section className="md:!w-1/2 w-full h-dvh flex flex-col justify-center items-center pattern-dots">
          <div className="w-full max-w-lg p-6 bg-background rounded-2xl border space-y-6">
            <div className="flex flex-col gap-2">
              <h1 className="text-4xl font-bold">Блог</h1>
              <p className="text-base text-secondary">
                Подпишитесь на нашу рассылку и получайте новости о проекте.
              </p>
            </div>
            <div className="flex flex-ros gap-2">
              <Input placeholder="example@domain.com" />
              <Button variant="secondary">Подписаться</Button>
            </div>
          </div>
        </section>
        <div className="md:!w-1/2 w-full min-h-dvh">
          <section className="w-full max-w-2xl mt-12 lg:!px-12 px-6 space-y-6">
            <h2 className="text-4xl font-bold">Новая страница, "Блог"</h2>
            <p className="text-base text-secondary">
              Рад представить вам новую страницу блог, эта страница идеально
              подходит для создания блога, здесь также есть небольшая форма для
              подписки на рассылку.
            </p>
            <div className="w-full aspect-[4/2.5] rounded-2xl border" />
            <Separator />
            <time className="text-secondary block">
              13:00 Вторник, 11 февраля 2025{" "}
            </time>
          </section>
        </div>
      </div>
      {!preview && isDev && <Dock />}
    </>
  );
};

export default page;
