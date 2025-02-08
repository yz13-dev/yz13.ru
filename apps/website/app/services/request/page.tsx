import AutoTextarea from "@/components/auto-textarea";
import { Logo } from "@/components/logo";
import {
  ArrowRightIcon,
  FileTextIcon,
  MenuIcon,
  ReceiptIcon,
} from "lucide-react";
import { Button } from "mono/components/button";
import { Input } from "mono/components/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "mono/components/select";
import { Separator } from "mono/components/separator";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Новый заказ",
  description:
    "Создайте новый заказ, здесь вы можете оформить новый заказ на выполнение работ.",
};

const page = async () => {
  return (
    <div className="w-full min-h-screen bg-background-back">
      <header className="w-full flex items-center justify-between p-6">
        <Link href="/">
          <Logo size={{ width: 96, height: 18 }} type="full" />
        </Link>
        <span className="text-sm text-secondary">Новый заказ</span>
      </header>
      <section className="lg:!w-[75%] w-[90%] lg:!ml-[25%] ml-[10%] bg-background rounded-tl-xl border">
        <div className="h-16 divide-x border-b flex items-center">
          <div className="h-full aspect-square flex items-center justify-center">
            <MenuIcon size={24} />
          </div>
          <div className="h-full flex items-center px-3">
            <span className="text-2xl text-foreground font-medium">
              Новый заказ
            </span>
          </div>
        </div>
        <div className="md:!px-12 px-6 py-6 h-fit w-full overflow-x-auto flex items-center gap-3">
          <button className="flex items-center shrink-0 gap-2 px-4 py-2 bg-background-back rounded-lg text-foreground">
            <FileTextIcon size={20} className="shrink-0" />
            <span className="md:!text-base text-sm font-medium shrink-0">
              Детали заказа
            </span>
          </button>
          <button className="flex items-center shrink-0 gap-2 px-4 py-2 bg-transparent rounded-lg text-foreground">
            <ReceiptIcon size={20} className="shrink-0" />
            <span className="md:!text-base text-sm font-medium shrink-0">
              Оформление заказа
            </span>
          </button>
        </div>
        <main className="md:!px-12 px-6 py-6 w-full max-w-2xl h-fit flex flex-col">
          <div className="w-full flex flex-col gap-6">
            <div className="flex gap-4 h-fit w-full">
              <div className="flex flex-col gap-4 h-full items-center">
                <div className="flex items-center gap-4 shrink-0 justify-center size-10 border rounded-full">
                  <span className="font-medium">1</span>
                </div>
                <Separator orientation="vertical" className="h-full" />
              </div>
              <div className="flex flex-col pt-0.5 gap-4 w-full">
                <span className="text-lg font-medium">
                  Укажите почту для ответа
                </span>
                <Input placeholder="Введите почту" />
              </div>
            </div>

            <div className="flex gap-4 h-fit w-full">
              <div className="flex flex-col gap-4 items-center h-full">
                <div className="flex items-center gap-4 shrink-0 justify-center size-10 border rounded-full">
                  <span className="font-medium">2</span>
                </div>
                <Separator orientation="vertical" className="h-full" />
              </div>
              <div className="flex flex-col pt-0.5 gap-4 w-full">
                <span className="text-lg font-medium">
                  Выберите тип работы и напишите тех. задание
                </span>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите тип работы" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pages">Страница(-ы)</SelectItem>
                    <SelectItem value="website">Сайт</SelectItem>
                    <SelectItem value="web-app">Веб-приложение</SelectItem>
                    <SelectItem value="other">Другое</SelectItem>
                  </SelectContent>
                </Select>
                <AutoTextarea
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="Введите тех. задание"
                />
              </div>
            </div>

            <div className="flex items-center gap-4 w-full">
              <Button className="w-1/2" variant="secondary" asChild>
                <Link href="/">Вернуться</Link>
              </Button>
              <Button className="w-1/2 gap-2">
                Продолжить
                <ArrowRightIcon size={16} />
              </Button>
            </div>
          </div>
        </main>
      </section>
    </div>
  );
};

export default page;
