import { isDev } from "@/app/login/get-url";
import Footer from "@/app/old/footer";
import AutoTextarea from "@/components/auto-textarea";
import Dock from "@/components/dock/dock";
import Header from "@/components/header";
import { Logo } from "@/components/logo";
import Nav from "@/components/nav";
import PageDockFiller from "@/components/page-dock-filler";
import { PagesLogo } from "@/components/pages-logo";
import User from "@/components/user";
import { showPagesPromo } from "@/const/flags";
import { ArrowRightIcon, MenuIcon } from "lucide-react";
import { Button } from "mono/components/button";
import { Input } from "mono/components/input";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Новый заказ",
  description:
    "Создайте новый заказ, здесь вы можете оформить новый заказ на выполнение работ.",
};

const page = async () => {
  return (
    <>
      <Header className="sticky top-0">
        <Link href="/" className="shrink-0">
          <Logo size={{ width: 110, height: 20 }} type="full" />
        </Link>
        <Nav>
          {(await showPagesPromo()) && (
            <div className="size-9 flex justify-center group relative items-center transition-colors">
              <PagesLogo
                size={{ width: 16, height: 16 }}
                type="only-icon"
                className="opacity-50 group-hover:opacity-100 transition-opacity"
              />
              <Link
                href="https://pages.yz13.ru"
                className="w-full h-full absolute inset-0"
              />
            </div>
          )}
          {isDev && <User />}
        </Nav>
      </Header>
      <div className="w-full divide-y border-b">
        <div className="w-full">
          <div className="grid-template max-w-screen-xl w-full mx-auto divide-x border-x">
            <div className="w-full h-full pattern-lines" />
            <div className="h-16 divide-x flex items-center">
              <div className="h-full aspect-square flex items-center justify-center">
                <MenuIcon size={24} />
              </div>
              <div className="h-full flex items-center px-3">
                <span className="text-2xl text-foreground font-medium">
                  Новый заказ
                </span>
              </div>
            </div>
            <div className="w-full h-full pattern-lines" />
          </div>
        </div>

        <div className="w-full">
          <div className="grid-template max-w-screen-xl w-full mx-auto divide-x border-x">
            <div className="w-full h-full pattern-lines" />
            <div className="w-full grid md:!grid-cols-2 grid-cols-1 md:!grid-rows-1 grid-rows-2 h-fit">
              <div className="md:!px-12 px-6 py-6 w-full h-full flex flex-col">
                <div className="w-full flex flex-col gap-6 max-w-2xl">
                  <div className="flex flex-col pt-0.5 gap-4 w-full">
                    <span className="text-lg font-medium">
                      Укажите почту для ответа
                    </span>
                    <Input placeholder="Введите почту" />
                  </div>

                  <div className="flex flex-col pt-0.5 gap-4 w-full">
                    <span className="text-lg font-medium">
                      Что нужно сделать?
                    </span>
                    <AutoTextarea
                      className="w-full px-3 py-2 border rounded-lg"
                      placeholder="Введите тех. задание"
                    />
                  </div>
                </div>
              </div>
              <div className="md:!px-12 px-6 py-6 w-full h-full gap-3 flex flex-col">
                <div className="w-full h-fit gap-3 flex flex-col">
                  <span className="text-sm text-secondary font-medium">
                    Проект
                  </span>
                  <div className="w-full p-2 rounded-lg border">
                    <span className="text-lg font-medium">Страницы</span>
                  </div>
                  <div className="w-full p-2 rounded-lg border">
                    <span className="text-lg font-medium">Сайт</span>
                  </div>
                  <div className="w-full p-2 rounded-lg border">
                    <span className="text-lg font-medium">Веб приложение</span>
                  </div>
                  <div className="w-full p-2 rounded-lg border">
                    <span className="text-lg font-medium">MVP</span>
                  </div>
                </div>
                <div className="w-full h-fit gap-3 flex flex-col">
                  <span className="text-sm text-secondary font-medium">
                    Дополнительные опции
                  </span>
                  <div className="w-full p-2 rounded-lg border">
                    <span className="text-lg font-medium">Страницы</span>
                  </div>
                  <div className="w-full p-2 rounded-lg border">
                    <span className="text-lg font-medium">Сайт</span>
                  </div>
                  <div className="w-full p-2 rounded-lg border">
                    <span className="text-lg font-medium">Веб приложение</span>
                  </div>
                  <div className="w-full p-2 rounded-lg border">
                    <span className="text-lg font-medium">MVP</span>
                  </div>
                </div>
                <Button className="w-full gap-2 h-11">
                  Продолжить
                  <ArrowRightIcon size={16} />
                </Button>
                <span className="text-xs text-secondary">
                  Нажимая на кнопку «Продолжить», вы соглашаетесь с{" "}
                  <Link href="/terms">
                    <span className="underline">условиями</span>
                  </Link>{" "}
                  и{" "}
                  <Link href="/privacy">
                    <span className="underline">политикой</span>
                  </Link>{" "}
                  приложения.
                </span>
              </div>
            </div>
            <div className="w-full h-full pattern-lines" />
          </div>
        </div>
        <div className="w-full">
          <div className="max-w-screen-xl w-full mx-auto border-x">
            <div className="h-fit p-6 space-y-6">
              <Footer />
            </div>
          </div>
        </div>
      </div>
      <PageDockFiller className="pattern-lines max-w-screen-xl w-full mx-auto border-x" />
      <Dock />
    </>
  );
};

export default page;
