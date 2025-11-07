import { ThemeImage } from "@/components/theme-image";
import { Button } from "@yz13/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@yz13/ui/carousel";
import { cn } from "@yz13/ui/cn";
import { ArrowLeftIcon, ArrowRightIcon, LinkIcon, MapPinIcon, SearchIcon } from "@yz13/ui/icons";
import { InputGroupButton } from "@yz13/ui/input-group";
import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";


export default function Works() {
  return (
    <>
      <div className="w-full px-[7.5%] flex">
        <div className="lg:w-2/3 w-full border bg-card min-h-dvh">
          <header className="w-full flex items-center justify-between px-6 py-2 h-10">
            <div className="flex items-center gap-2">
              <InputGroupButton asChild>
                <Link href="/">
                  <ArrowLeftIcon /><span>Назад</span>
                </Link>
              </InputGroupButton>
            </div>
            <div className="flex items-center gap-2">
              <InputGroupButton disabled variant="outline"><SearchIcon /><span>Поиск</span></InputGroupButton>
            </div>
          </header>
          <div className="w-full border-y">
            <ThemeImage
              className="w-full"
              srcDark="/banner/dark.png"
              srcLight="/banner/light.png"
              width={1000}
              height={500}
              alt="banner"
            />
          </div>
          <div className="w-full px-6 py-3">
            <div className="w-full relative flex justify-between items-center">
              <div className="w-32 h-9 relative">
                <div className={cn(
                  "absolute flex items-center justify-center rounded-full border bg-card",
                  "size-32 bottom-0"
                )}>
                  <ThemeImage
                    className="w-2/3"
                    srcDark="/logo/dark.png"
                    srcLight="/logo/light.png"
                    width={256}
                    height={256}
                    alt="logo"
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" disabled><span>Чат</span></Button>
                <Button variant="default" disabled><span>Запланировать видеозвонок</span><ArrowRightIcon /></Button>
              </div>
            </div>
          </div>
          <div className="w-full p-6">
            <div className="*:block">
              <h1 className="text-2xl font-medium">YZ13</h1>
              <span className="text-sm text-muted-foreground">@yz13_dev</span>
            </div>
            <div className="py-2">
              <p>Нужен разработчик? Разработаю фронтенд для вашего проекта</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center text-muted-foreground gap-1">
                <MapPinIcon size={16} />
                <span className="text-sm">Россия (Russia)</span>
              </div>
              <div className="flex items-center text-muted-foreground gap-1">
                <LinkIcon size={16} />
                <Link
                  href="https://yz13.ru"
                  className="text-sm text-foreground hover:underline"
                >
                  yz13.ru
                </Link>
              </div>
            </div>
          </div>
          <div className="w-full border-t divide-y">
            <div className="w-full py-3 px-6 flex gap-3">
              <div className="flex aspect-square shrink-0 size-12 items-center justify-center rounded-full border bg-card">
                <ThemeImage
                  className="w-2/3"
                  srcDark="/logo/dark.png"
                  srcLight="/logo/light.png"
                  width={256}
                  height={256}
                  alt="logo"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-1">
                  <span className="text-base font-medium">YZ13</span>
                  <span className="text-base font-medium text-muted-foreground">@yz13_dev</span>
                </div>
                <div className="markdown">
                  <ReactMarkdown>{
                    (`
Reservia

Проект был построен на базе Next.js, а также использовал TailwindCSS для создания компонентов и стилей. Но позднее было решено перейти на Vite + ReactRouter.
                    `).trimStart().trimEnd()
                  }
                  </ReactMarkdown>
                </div>
                <div className="w-full">

                  <Carousel className="w-full">
                    <CarouselContent>
                      {
                        [
                          "/works/reservia/home.png",
                          "/works/reservia/map-creating.png",
                          "/works/reservia/timeline.png",
                        ].map((src, index) => {
                          return (
                            <CarouselItem className="w-full" key={`${index}/${src}`}>
                              <Image
                                className="!static !block rounded-xl w-full h-fit object-contain"
                                fill
                                src={src}
                                alt="carousel"
                              />
                            </CarouselItem>
                          )
                        })
                      }
                    </CarouselContent>
                    <CarouselPrevious className="left-3" />
                    <CarouselNext className="right-3" />
                  </Carousel>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-1/3 p-6 hidden">
          <div className="w-full h-60 border rounded-xl bg-card">
            <div className="w-full p-3">
              <span className="text-lg font-medium">Проекты</span>
            </div>
            <ul className="divide-y">
              <li className="p-3">
                <div className="w-full flex items-center gap-2">
                  <div className="size-10 rounded-full border flex items-center justify-center">
                    <Image src="https://cdn.simpleicons.org/telegram/000000/ffffff" unoptimized alt="telegram" width={40} height={40} />
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}
