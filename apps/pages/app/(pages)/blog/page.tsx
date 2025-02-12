import { Button } from "mono/components/button";
import { Input } from "mono/components/input";
import { Separator } from "mono/components/separator";
import { cn } from "yz13/cn";

const page = () => {
  return (
    <div
      className={cn(
        "w-full min-h-dvh flex md:!flex-row flex-col",
        "md:!divide-x divide-x-0 md:!divide-y-0 divide-y",
      )}
    >
      <section className="md:!w-1/2 w-full h-dvh flex flex-col justify-center items-center">
        <div className="w-full max-w-lg p-6 space-y-6">
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
      <section className="md:!w-1/2 w-full min-h-dvh">
        <div className="w-full max-w-2xl mt-12 lg:!px-12 px-6 space-y-6">
          <h2 className="text-4xl font-bold">Новая страница, "Блог"</h2>
          <p className="text-base text-secondary">
            Рад представить вам новую страницу блог, эта страница идеально
            подходит для создания блога, здесь также есть небольшая форма для
            подписки на рассылку.
          </p>
          <Separator />
          <time className="text-secondary block">
            13:00 Вторник, 11 февраля 2025{" "}
          </time>
        </div>
      </section>
    </div>
  );
};

export default page;
