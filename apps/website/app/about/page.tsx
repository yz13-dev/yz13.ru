import Dock from "@/components/dock/dock";
import { Logo } from "@/components/logo";
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
      <div className="border-x">
        <div className="px-6 border-t">
          <header className="w-full max-w-xl border-x mx-auto p-4 h-20 flex items-center gap-4">
            <Link
              href="/"
              className="size-12 rounded-xl border flex items-center justify-center"
            >
              <Logo size={{ width: 32, height: 32 }} type="only-icon" />
            </Link>
            <TechList />
          </header>
        </div>
        <main className="w-full border-y px-6">
          <div className="max-w-xl h-full border-x mx-auto p-6 space-y-6">
            <h1 className="text-3xl inline-flex flex-col gap-1 font-medium">
              <span>Привет!</span>
              <span>Я YZ13, фронтенд-разработчик</span>
            </h1>
            <p className="text-secondary text-xl font-medium">
              Специализируюсь на разработке сайтов, веб-приложений. Увлекаюсь
              разработкой интерфейсов для сайтов и приложений. Стараюсь
              расширить круг компетенций.
            </p>
            <div className="w-full">
              <Suspense
                fallback={<Skeleton className="h-4 w-full rounded-md" />}
              >
                <Availability />
              </Suspense>
            </div>
          </div>
        </main>
      </div>
      <footer className="border-b px-6">
        <div className="max-w-xl border-x w-full mx-auto p-6">
          <Dock className="static" />
        </div>
      </footer>
    </>
  );
};

export default page;
