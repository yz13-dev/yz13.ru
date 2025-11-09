import { ThemeImage } from "@/components/theme-image";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@yz13/ui/accordion";
import { Button } from "@yz13/ui/button";
import { cn } from "@yz13/ui/cn";
import { ArchiveIcon, ArrowRightIcon, EllipsisIcon, SendIcon } from "@yz13/ui/icons";
import LogoStack from "./components/logo-stack";


export default function Home() {


  return (
    <>
      <main
        className={cn(
          "max-w-7xl w-full mx-auto h-fit md:py-[10%] py-[7.5%] px-6",
          "md:h-fit h-[calc(100dvh-102px)]",
          "flex flex-col items-center md:justify-start justify-between"
        )}
      >
        <div className="w-full h-fit md:py-6 pt-32 flex items-center justify-center">
          <LogoStack />
        </div>
        <div className="w-full space-y-6">
          <div className="relative py-10 *:block space-y-6 max-w-4xl w-fit mx-auto">
            <ThemeImage
              className="mx-auto"
              srcDark="/logo/dark-full.png"
              srcLight="/logo/light-full.png"
              width={256}
              height={40}
              alt="logo"
            />
            <h1 className="md:text-6xl text-5xl text-balance text-center font-semibold">
              YZ13 - Нужен разработчик?
            </h1>
            <p className="md:text-4xl text-2xl text-balance text-center text-muted-foreground">
              Разработаю фронтенд для вашего проекта
            </p>
          </div>
        </div>
        <div
          className={cn(
            "pt-4 *:text-lg [&>button>svg]:size-5!",
            "flex md:flex-row flex-col items-center justify-center gap-2",
            "md:*:w-fit *:w-full *:h-12 *:px-8 w-full"
          )}
        >
          <Button variant="outline" size="lg" disabled>
            <SendIcon />
            <span>Чат</span>
          </Button>
          <Button variant="default" size="lg" disabled>
            <span>Запланировать видеозвонок</span><ArrowRightIcon />
          </Button>
        </div>
      </main>

      <div className="w-full container mx-auto px-6 py-6 space-y-6">
        <div className="grid mx-auto xl:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4">
          <div className="flex items-center gap-3">
            <div className="rounded-md h-16 aspect-video bg-secondary" />
            <div className="flex flex-col gap-1">
              <span className="text-base font-medium line-clamp-2 leading-5">
                Один из проектов, которые закрепленны в списке проектов
              </span>
              <span className="text-xs text-muted-foreground uppercase">проект</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="rounded-md h-16 aspect-video bg-secondary" />
            <div className="flex flex-col gap-1">
              <span className="text-base font-medium line-clamp-2 leading-5">
                Один из записей в блоге, которые закрепленны в списке блога
              </span>
              <span className="text-xs text-muted-foreground uppercase">блог</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="rounded-md h-16 aspect-video bg-secondary" />
            <div className="flex flex-col gap-1">
              <span className="text-base font-medium line-clamp-2 leading-5">
                Один из проектов, которые закрепленны в списке проектов
              </span>
              <span className="text-xs text-muted-foreground uppercase">проект</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="rounded-md h-16 aspect-video bg-secondary" />
            <div className="flex flex-col gap-1">
              <span className="text-base font-medium line-clamp-2 leading-5">
                Один из записей в блоге, которые закрепленны в списке блога
              </span>
              <span className="text-xs text-muted-foreground uppercase">блог</span>
            </div>
          </div>
        </div>
      </div>
      <div
        className={cn(
          "hidden! size-full md:*:h-[800px] *:h-[400px] border mx-auto",
          "grid md:grid-cols-4 grid-cols-1 md:grid-rows-1 grid-rows-3",
          "md:[&>div]:first:rounded-l-4xl md:[&>div]:last:rounded-r-4xl",
          "[&>div]:first:rounded-l-none [&>div]:last:rounded-r-none",
          "md:divide-x divide-x-0",
          "md:divide-y-0 divide-y",
          "md:[&>div]:first:rounded-t-none md:[&>div]:last:rounded-b-none",
          "[&>div]:first:rounded-t-4xl [&>div]:last:rounded-b-4xl",
          "*:bg-transparent overflow-hidden",
        )}
      >
        <div className="size-full space-y-6">
          <div className="pt-6 px-6 flex items-center gap-3">
            <div className="size-12 rounded-md bg-foreground" />
            <span className="text-2xl font-medium">Project</span>
          </div>
          <div className="pb-6 px-6 w-full h-[calc(100%-96px)]">
            <div className="size-full overflow-hidden relative">
              <div className="h-full aspect-video rounded-lg bg-foreground" />
            </div>
          </div>
        </div>

        <div className="size-full space-y-6">
          <div className="pt-6 px-6 flex items-center gap-3">
            <div className="size-12 rounded-md bg-foreground" />
            <span className="text-2xl font-medium">Project</span>
          </div>
          <div className="pb-6 px-6 w-full h-[calc(100%-96px)]">
            <div className="size-full overflow-hidden relative">
              <div className="h-full aspect-video rounded-lg bg-foreground" />
            </div>
          </div>
        </div>

        <div className="size-full space-y-6">
          <div className="pt-6 px-6 flex items-center gap-3">
            <div className="size-12 rounded-md bg-foreground" />
            <span className="text-2xl font-medium">Project</span>
          </div>
          <div className="pb-6 px-6 w-full h-[calc(100%-96px)]">
            <div className="size-full gap-6 flex items-start justify-start overflow-hidden relative">
              <div className="h-full aspect-9/16 rounded-lg bg-foreground" />
              <div className="h-full aspect-video rounded-lg bg-foreground" />
            </div>
          </div>
        </div>

        <div className="size-full space-y-6">
          <div className="pt-6 px-6 flex items-center gap-3">
            <div className="size-12 rounded-md bg-foreground" />
            <span className="text-2xl font-medium">Project</span>
          </div>
          <div className="pb-6 px-6 w-full h-[calc(100%-96px)]">
            <div className="size-full overflow-hidden relative">
              <div className="h-full aspect-video rounded-lg bg-foreground" />
            </div>
          </div>
        </div>
      </div>

      <div className="py-12 px-6 container mx-auto">
        <h2 className="text-4xl font-medium">
          Работы
        </h2>
      </div>
      <div className="w-full divide-y border-y *:[&>div]:px-6">
        <section className="py-4 hover:bg-card transition-colors">
          <div className="container mx-auto gap-3 grid md:grid-cols-2 grid-cols-1">
            <div className="size-full flex flex-col justify-between">
              <div className="w-full">
                <div className="*:block space-y-2">
                  <h3 className="text-4xl font-medium text-muted-foreground">
                    Проект
                  </h3>
                  <p className="text-4xl font-medium text-foreground">
                    Описание проекта
                  </p>
                </div>
                <div className="w-full py-6 grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <div className="h-12 aspect-4/3 rounded-xl border bg-secondary" />
                    <div className="flex flex-col">
                      <span className="text-sm uppercase">dependency</span>
                      <span className="text-base font-medium">Nextjs</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-fit flex items-center gap-3">
                <Button variant="outline" size="lg">
                  <span>Открыть проект</span>
                  <ArrowRightIcon />
                </Button>
              </div>
            </div>
            <div className="size-full">
              <div className="w-full aspect-4/3 rounded-4xl bg-secondary border" />
            </div>
          </div>
        </section>
        <section className="py-4">
          <div className="container mx-auto gap-3 grid md:grid-cols-2 grid-cols-1">
            <div className="size-full flex flex-col justify-between">
              <div className="w-full">
                <div className="*:block space-y-2">
                  <h3 className="text-4xl font-medium text-muted-foreground">
                    Проект
                  </h3>
                  <p className="text-4xl font-medium text-foreground">
                    Описание проекта
                  </p>
                </div>
                <div className="w-full py-6 grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <div className="h-12 aspect-4/3 rounded-xl border bg-secondary" />
                    <div className="flex flex-col">
                      <span className="text-sm uppercase">dependency</span>
                      <span className="text-base font-medium">Nextjs</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-fit flex items-center gap-3">
                <Button variant="outline" size="lg">
                  <span>Открыть проект</span>
                  <ArrowRightIcon />
                </Button>
              </div>
            </div>
            <div className="size-full">
              <div className="w-full aspect-4/3 rounded-4xl bg-secondary border" />
            </div>
          </div>
        </section>
        <section className="py-4">
          <div className="container mx-auto gap-3 grid md:grid-cols-2 grid-cols-1">
            <div className="size-full flex flex-col justify-between">
              <div className="w-full">
                <div className="*:block space-y-2">
                  <h3 className="text-4xl font-medium text-muted-foreground">
                    Проект
                  </h3>
                  <p className="text-4xl font-medium text-foreground">
                    Описание проекта
                  </p>
                </div>
                <div className="w-full py-6 grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <div className="h-12 aspect-4/3 rounded-xl border bg-secondary" />
                    <div className="flex flex-col">
                      <span className="text-sm uppercase">dependency</span>
                      <span className="text-base font-medium">Nextjs</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-fit flex items-center gap-3">
                <Button variant="outline" size="lg">
                  <span>Открыть проект</span>
                  <ArrowRightIcon />
                </Button>
              </div>
            </div>
            <div className="size-full">
              <div className="w-full aspect-4/3 rounded-4xl bg-secondary border" />
            </div>
          </div>
        </section>
      </div>
      <div className="w-full *:px-6 pb-6">
        <div className="py-12 container mx-auto">
          <h2 className="text-4xl font-medium">
            Ответы на вопросы
          </h2>
        </div>
        <div className="grid container md:gap-6 gap-0 mx-auto md:grid-cols-2 grid-cols-1 md:divide-y-0 divide-y">
          <Accordion type="multiple">
            <AccordionItem value="1">
              <AccordionTrigger className="text-lg">
                <span>Почему стоит работать со мной?</span>
              </AccordionTrigger>
              <AccordionContent>
                <span>123</span>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="2">
              <AccordionTrigger className="text-lg">
                <span>Почему стоит работать со мной?</span>
              </AccordionTrigger>
              <AccordionContent>
                <span>123</span>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <Accordion type="multiple">
            <AccordionItem value="1">
              <AccordionTrigger className="text-lg">
                <span>Почему стоит работать со мной?</span>
              </AccordionTrigger>
              <AccordionContent>
                <span>123</span>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="2">
              <AccordionTrigger className="text-lg">
                <span>Почему стоит работать со мной?</span>
              </AccordionTrigger>
              <AccordionContent>
                <span>123</span>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
      <footer className="container py-12 mx-auto px-6 w-full">
        <div className="w-full flex md:flex-row gap-10 flex-col">
          <div className="max-w-sm flex flex-col gap-8">
            <ThemeImage
              srcDark="/logo/dark.png"
              srcLight="/logo/light.png"
              width={64}
              height={64}
              alt="logo"
            />
            <span className="text-2xl font-medium">
              Нужен разработчик?
              Разработаю фронтенд для вашего проекта.
            </span>
          </div>
          <div className="w-full grid md:grid-cols-3 grid-cols-2 gap-4">
            <div>
              <div className="py-2">
                <span className="text-base text-muted-foreground uppercase">yz13</span>
              </div>
              <ul className="*:py-1">
                <li><span className="text-lg">Главная</span></li>
                <li><span className="text-lg">Контакты</span></li>
              </ul>
            </div>
            <div>
              <div className="py-2">
                <span className="text-base text-muted-foreground uppercase">ресурсы</span>
              </div>
              <ul className="*:py-1">
                <li><span className="text-lg">...</span></li>
                <li><span className="text-lg">...</span></li>
              </ul>
            </div>
            <div>
              <div className="py-2">
                <span className="text-base text-muted-foreground uppercase">также в</span>
              </div>
              <ul className="*:py-1">
                <li><span className="text-lg">Telegram</span></li>
                <li><span className="text-lg">Github</span></li>
                <li><span className="text-lg">X</span></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
      <div className="py-4 px-6 container flex items-center justify-between mx-auto w-full">
        <span className="text-sm text-muted-foreground">
          YZ13 - фронтенд разработчик.
        </span>
        <span className="text-sm text-muted-foreground">
          ...
        </span>
      </div>
      <div className="w-full py-4 z-10 sticky bottom-0 px-6">
        <header
          className={cn(
            "flex bg-card border rounded-3xl items-center justify-between gap-4 max-w-2xl mx-auto",
            "*:py-4 h-[68px]"
          )}
        >
          <div className="pl-6 py-4">
            <div className="h-10 flex items-center">
              <ThemeImage
                className="max-h-10 w-fit"
                srcDark="/logo/dark.png"
                srcLight="/logo/light.png"
                width={40}
                height={40}
                alt="logo"
              />
            </div>
          </div>
          <nav className="pr-6 flex [&>button]:h-10 [&>button]:text-base items-center gap-3">
            <div className="md:flex hidden [&>button]:h-10 [&>button]:text-base items-center gap-1">
              <Button variant="outline"><ArchiveIcon /></Button>
            </div>
            <Button variant="default">Связаться</Button>
            <Button variant="outline"><EllipsisIcon /></Button>
          </nav>
        </header>
      </div>
    </>
  )
}
