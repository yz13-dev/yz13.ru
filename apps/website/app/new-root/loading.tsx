import Header from "@/components/header";
import { Logo } from "@/components/logo";
import Nav from "@/components/nav/nav";
import { Skeleton } from "mono/components/skeleton";
import Image from "next/image";
import Link from "next/link";

export default function Loading() {
  return (
    <>
      <div className="w-full">
        <div className="w-full h-dvh absolute top-0 left-0">
          <div className="w-full h-full relative">
            <Image
              className="object-cover w-full h-full invert dark:invert-0"
              src="/background/variant-1.gif"
              fill
              alt="background"
            />
            <div className="w-full h-full absolute top-0 left-0 backdrop-grayscale backdrop-blur-xl" />
          </div>
        </div>
        <Header className="border-none">
          <Nav side="left">
            <Link href="/">
              <Logo size={{ width: 110, height: 20 }} type="full" />
            </Link>
          </Nav>
          <div className="flex items-center gap-2">
            <Skeleton className="size-9" />
            <Skeleton className="h-9 w-[75px]" />
          </div>
        </Header>
        <main className="w-full relative h-[calc(100dvh-56px)]">
          <div className="absolute bottom-0 left-0 space-y-10">
            <div className="w-full *:max-w-4xl space-y-6 md:px-[2.5%] px-[5%] *:block *:lg:text-5xl *:text-4xl">
              <h1 className="text-foreground font-semibold">
                YZ13 - Фронтенд разработчик
              </h1>
              <p className="text-secondary font-medium text-balance">
                Специализируюсь на разработке сайтов, веб-приложений. Увлекаюсь
                разработкой интерфейсов для сайтов и приложений.
              </p>
            </div>
            <div className="w-full max-w-dvw md:px-[2.5%] px-[5%] h-fit">
              <Skeleton className="h-4 w-full rounded-md" />
            </div>
            <Skeleton className="w-dvw rounded-none h-20" />
          </div>
        </main>
      </div>
    </>
  );
}
