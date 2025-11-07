import { allPosts } from "@/.content-collections/generated";
import { ThemeImage } from "@/components/theme-image";
import { projects } from "@/const/projects";
import { works } from "@/const/works";
import { Button } from "@yz13/ui/button";
import { cn } from "@yz13/ui/cn";
import { ArrowLeftIcon, ArrowRightIcon, ExternalLinkIcon, LinkIcon, MapPinIcon, SearchIcon } from "@yz13/ui/icons";
import { InputGroupButton } from "@yz13/ui/input-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@yz13/ui/tabs";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import ImagePreview from "./components/image-preview";
import ImagesGrid from "./components/images-grid";


export default function Works() {

  const posts = allPosts;
  console.log("posts", posts)

  return (
    <>
      <ImagePreview />
      <div className="w-full lg:px-[7.5%] px-0 flex">
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
          <div className="w-full max-h-[400px] border-y">
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
          <Tabs defaultValue="works">
            <div className="w-full px-6">
              <TabsList>
                <TabsTrigger value="works">Работы ({works.length})</TabsTrigger>
                <TabsTrigger value="projects">Проекты ({projects.length})</TabsTrigger>
              </TabsList>
            </div>
            <div className="w-full border-t divide-y">
              <TabsContent value="works">
                {
                  works
                    .map((work, index) => {

                      return (
                        <div key={work.id} className="w-full py-3 px-6 flex gap-3">
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
                              <ReactMarkdown>{work.content.trimStart().trimEnd()}</ReactMarkdown>
                            </div>
                            <ImagesGrid
                              paths={work.assets}
                            />
                          </div>
                        </div>
                      )
                    })
                }
              </TabsContent>
              <TabsContent value="projects">
                {
                  projects
                    .map((work, index) => {

                      return (
                        <div key={work.id} className="w-full py-3 px-6 flex gap-3">
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
                            {
                              work.url &&
                              <Link href={work.url} className="inline-flex gap-1 items-center hover:underline" target="_blank">
                                {new URL(work.url).hostname}<ExternalLinkIcon size={14} />
                              </Link>
                            }
                            <div className="markdown">
                              <ReactMarkdown>{work.content.trimStart().trimEnd()}</ReactMarkdown>
                            </div>
                            <ImagesGrid
                              paths={work.assets}
                            />
                          </div>
                        </div>
                      )
                    })
                }
              </TabsContent>
            </div>
          </Tabs>
        </div>
        <div className="w-1/3 p-6 lg:block hidden">
          <div className="w-full h-fit border rounded-xl bg-card">
            <div className="w-full p-3">
              <span className="text-lg font-medium">Блог</span>
            </div>
            <div className="w-full h-60 flex items-center justify-center">
              <span className="text-sm text-muted-foreground">Скоро...</span>
            </div>
            {/*<ul className="divide-y"></ul>*/}
          </div>
        </div>
      </div>
    </>
  )
}
