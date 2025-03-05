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
          "w-full min-h-dvh flex lg:!flex-row flex-col",
          "lg:!divide-x divide-x-0 lg:!divide-y-0 divide-y",
        )}
      >
        <section
          className={cn(
            "lg:!w-1/2 w-full lg:!h-dvh h-fit flex flex-col justify-center items-center",
            "bg-gradient-to-l from-background-secondary to-background p-6 lg:!sticky static top-0",
          )}
        >
          <div className="w-full max-w-lg p-6 bg-background rounded-2xl border space-y-6">
            <div className="flex flex-col gap-2">
              <h1 className="text-4xl font-semibold">Блог</h1>
              <p className="text-base text-secondary">
                Подпишитесь на нашу рассылку и получайте новости о проекте.
              </p>
            </div>
            <div className="flex flex-row gap-2">
              <Input placeholder="example@domain.com" />
              <Button variant="secondary">Подписаться</Button>
            </div>
          </div>
        </section>
        <div className="lg:!w-1/2 w-full lg:!min-h-dvh min-h-fit">
          <section className="w-full h-fit max-w-2xl mt-12 pb-12 space-y-24">
            <div className="w-full lg:!px-12 px-6 space-y-5 relative">
              <div className="flex items-center gap-2 absolute -left-[90px] top-6">
                <span className="text-xs text-secondary">12.09.2025</span>
                <Separator className="w-4" />
              </div>
              <div className="w-full aspect-video rounded-2xl border" />
              <div className="w-full space-y-3">
                <h2 className="text-lg font-semibold">
                  Новая страница, "Блог"
                </h2>
                <p className="text-sm text-secondary">
                  Рад представить вам новую страницу блог, эта страница идеально
                  подходит для создания блога, здесь также есть небольшая форма
                  для подписки на рассылку.
                </p>
              </div>
            </div>
            <div className="w-full lg:!px-12 px-6 space-y-5 relative">
              <div className="flex items-center gap-2 absolute -left-[90px] top-6">
                <span className="text-xs text-secondary">09.09.2025</span>
                <Separator className="w-4" />
              </div>
              <div className="w-full aspect-video rounded-2xl border" />
              <div className="w-full space-y-3">
                <h2 className="text-lg font-semibold">Анонс блога</h2>
                <p className="text-sm text-secondary">
                  Скоро появится новая страница блога, в ней вы сможете
                  подписаться на рассылку и получать новости о проекте.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
      {!preview && isDev && <Dock />}
    </>
  );
};

export default page;
