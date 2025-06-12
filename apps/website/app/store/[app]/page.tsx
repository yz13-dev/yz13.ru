import { Button } from "@yz13/ui/components/button";
import { ArrowLeftIcon, BookmarkIcon, ShareIcon } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import StoreHeader, { StoreHeaderSkeleton } from "../header";

type PageProps = {
  params: Promise<{
    app: string;
  }>;
};
export default async function page({ params }: PageProps) {
  const { app } = await params;
  return (
    <>
      <Suspense fallback={<StoreHeaderSkeleton />}>
        <StoreHeader />
      </Suspense>
      <div className="w-full space-y-6 *:max-w-7xl *:mx-auto yz-future-container md:py-[2.5%] py-[5%]">
        <div className="space-y-10">
          <Button variant="ghost" asChild>
            <Link href="/store">
              <ArrowLeftIcon size={16} />
              <span>Вернуться</span>
            </Link>
          </Button>
          <div className="flex items-center gap-4">
            <div className="size-20 rounded-3xl border" />
            <div className="flex flex-col gap-4">
              <span className="text-5xl font-medium block">{app}</span>
              <div className="*:block space-y-1">
                <span className="text-base text-foreground">YZ13 LAB</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex flex-col">
              <span className="text-sm text-center text-foreground">123</span>
              <span className="text-sm text-center text-foreground">
                Посещений
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-center text-foreground">123</span>
              <span className="text-sm text-center text-foreground">321</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-center text-foreground">123</span>
              <span className="text-sm text-center text-foreground">321</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button className="px-6">Открыть</Button>
            <Button size="icon" variant="ghost">
              <ShareIcon size={16} />
            </Button>
            <Button size="icon" variant="ghost">
              <BookmarkIcon size={16} />
            </Button>
          </div>
          <div className="flex items-center gap-3 overflow-x-auto h-[204px] *:h-full">
            <div className="aspect-[1/2] rounded-xl border" />
            <div className="aspect-video rounded-xl border" />
            <div className="aspect-[1/2] rounded-xl border" />
            <div className="aspect-[1/2] rounded-xl border" />
          </div>
          <div className="w-full *:block space-y-4">
            <span className="text-xl font-medium">Описание</span>
            <span className="text-sm text-foreground">
              Чтобы контролировать безопасность, нужно знать, как разработчики
              собирают ваши данные и передают их третьим лицам. Методы
              обеспечения безопасности и конфиденциальности могут зависеть от
              того, как вы используете приложение, а также от вашего региона и
              возраста. Информация ниже предоставлена разработчиком и в будущем
              может измениться.
            </span>
          </div>
          <div className="w-full *:block space-y-2">
            <span className="text-base font-medium">Последнее обновление</span>
            <span className="text-sm text-foreground">23 мар. 2025 г.</span>
          </div>
          <div className="w-full flex items-start flex-wrap gap-2">
            <span className="text-sm text-foreground px-3 py-1 rounded-full border">
              App
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
