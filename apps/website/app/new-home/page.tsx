import { Logo } from "@/components/logo";
import { Typewriter } from "@/components/text-writter";
import { Button } from "mono/components/button";
import Link from "next/link";

const page = async () => {
  return (
    <>
      <div className="w-full h-16">
        <header className="container mx-auto w-full h-full px-6 flex items-center justify-between">
          <Link href="/">
            <Logo size={{ width: 96, height: 18 }} type="full" />
          </Link>
          <Button className="rounded-xl">Заказать работу</Button>
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
      <div className="container flex items-center gap-4 mx-auto w-full p-6">
        <div className="w-1/6 h-24 rounded-xl bg-background-back" />
        <div className="w-1/6 h-24 rounded-xl bg-background-back" />
        <div className="w-1/6 h-24 rounded-xl bg-background-back" />
        <div className="w-1/6 h-24 rounded-xl bg-background-back" />
        <div className="w-1/6 h-24 rounded-xl bg-background-back" />
        <div className="w-1/6 h-24 rounded-xl bg-background-back" />
      </div>
      <div className="container mx-auto w-full p-6">
        <div className="w-full flex aspect-video border divide-x overflow-hidden rounded-xl bg-background-back">
          <div className="w-1/4 h-full bg-background/60" />
          <div className="w-1/4 h-full bg-background/60 shadow-2xl" />
          <div className="w-1/4 h-full bg-background/60 shadow-2xl" />
          <div className="w-1/4 h-full bg-background/60 shadow-2xl" />
        </div>
      </div>
      <div className="container mx-auto w-full p-6">
        <h2 className="text-4xl font-medium">Последние проекты</h2>
      </div>
      <div className="hover:bg-background-back transition-colors">
        <div className="container mx-auto w-full px-6 py-12 flex lg:!flex-row flex-col gap-4">
          <div className="lg:!w-1/2 w-full flex flex-col gap-2">
            <p className="text-4xl font-medium text-secondary">Reservia</p>
            <span className="text-4xl font-medium text-foreground">
              Приложение для резервирования столов в ресторанах и кафе.
            </span>
          </div>
          <div className="lg:!w-1/2 w-full flex flex-col gap-2">
            <div className="w-full aspect-[4/3] border rounded-3xl" />
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
