import Dock from "@/components/dock/dock";
import { Logo } from "@/components/logo";
import PageDockFiller from "@/components/page-dock-filler";
import { Skeleton } from "mono/components/skeleton";
import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import Availability from "../(root)/availability";
import TechList from "./tech-list";

export const metadata: Metadata = {
  title: "Немного о себе",
  description:
    "Если хотите узнать больше о разработчике YZ13, то посетите эту страницу.",
};

const page = () => {
  return (
    <>
      <div className="max-w-xl mx-auto px-6 py-12 flex flex-col gap-4 items-center">
        <header className="size-20 rounded-full border-2 flex items-center justify-center">
          <Link href="/">
            <Logo size={{ width: 48, height: 48 }} type="only-icon" />
          </Link>
        </header>
        <h1 className="text-3xl my-4 text-center inline-flex flex-col gap-1 font-medium">
          <span>Привет!</span>
          <span>Я YZ13, фронтенд-разработчик</span>
        </h1>
        <p className="text-secondary text-center text-xl font-medium">
          Специализируюсь на фронтенде и веб-разработке. Увлекаюсь разработкой
          интерфейсов для сайтов и приложений.
        </p>
        <TechList className="my-6" />
        <div className="w-full">
          <Suspense fallback={<Skeleton className="h-4 w-full rounded-md" />}>
            <Availability />
          </Suspense>
        </div>
      </div>
      <PageDockFiller />
      <Dock />
    </>
  );
};

export default page;
