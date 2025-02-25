import { Logo } from "@/components/logo";
import { isDev } from "@/const/env";
import { DownloadIcon } from "lucide-react";
import { Button } from "mono/components/button";
import Image from "next/image";
import Link from "next/link";
import editorThumbnail from "public/pages/code/code_editor.png";
import Dock from "../dock";
import { PageProps } from "../page-props";

const page = async ({ searchParams }: PageProps) => {
  const preview = searchParams.preview === "true";
  return (
    <>
      <header className="w-full h-16 border-b">
        <div className="container mx-auto w-full h-full px-6 flex items-center justify-between">
          <Link href="/">
            <Logo size={{ width: 96, height: 18 }} type="full" />
          </Link>
          <Button className="gap-2">
            <DownloadIcon size={16} />
            <span>Скачать</span>
          </Button>
        </div>
      </header>
      <section className="w-full">
        <div className="w-full max-w-7xl border-x mx-auto px-6 py-48 space-y-8">
          <div className="flex flex-col gap-4">
            <h1 className="text-4xl font-bold text-center">
              Ещё один редактор кода
            </h1>
            <p className="text-lg text-secondary text-center">
              Точнее страница для редактора кода
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-row gap-2 justify-center">
              <Button variant="default">Скачать</Button>
              <Button variant="secondary">Исходный код</Button>
            </div>
            <span className="text-secondary block text-center text-sm">
              Доступно на Windows, Linux, MacOS
            </span>
          </div>
        </div>
      </section>
      <div className="w-full flex flex-col gap-0 pattern-lines border-y">
        <div className="max-w-7xl mx-auto w-full h-full p-0 border-8 bg-background border-secondary/20">
          <div className="w-full grid sm:grid-cols-3 grid-cols-1 *:p-4">
            <div className="flex flex-col gap-0">
              <span className="text-base font-medium">Быстрый</span>
              <span className="text-sm text-secondary">
                Написано с нуля в Rust, чтобы эффективно использовать несколько
                ядер ЦП и графический процессор.
              </span>
            </div>
            <div className="flex flex-col gap-0">
              <span className="text-base font-medium">Умный</span>
              <span className="text-sm text-secondary">
                Интегрируйте предстоящие LLMS в свой рабочий процесс, чтобы
                генерировать, преобразовать и проанализировать код.
              </span>
            </div>
            <div className="flex flex-col gap-0">
              <span className="text-base font-medium">Коллаборативный</span>
              <span className="text-sm text-secondary">
                Общайтесь с товарищами по команде, пишите заметки вместе и
                поделитесь своим экраном и проектом. Все включено.
              </span>
            </div>
          </div>
          <Image
            src={editorThumbnail}
            placeholder="blur"
            alt="Code editor"
            fill
            className="w-full !static"
          />
        </div>
      </div>
      {!preview && isDev && <Dock />}
    </>
  );
};

export default page;
