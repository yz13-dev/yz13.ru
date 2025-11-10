import Footer from "@/components/footer";
import Header from "@/components/header";
import Project, { ProjectContainer } from "@/components/project";
import { ThemeImage } from "@/components/theme-image";
import { projects } from "@yz13/registries";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@yz13/ui/accordion";
import { Button } from "@yz13/ui/button";
import { cn } from "@yz13/ui/cn";
import { ArrowRightIcon, SendIcon } from "@yz13/ui/icons";
import Link from "next/link";
import LogoStack from "./components/logo-stack";

export default function Home() {

  return (
    <>
      <Header />
      <main
        className={cn(
          "max-w-7xl w-full mx-auto md:pb-[10%] md:pt-[7.5%] py-[7.5%] px-6",
          "h-[calc(100dvh-88px)]",
          "flex flex-col items-center md:justify-start justify-between"
        )}
      >
        <div className="w-full h-fit md:py-6 pt-16 flex items-center justify-center">
          <LogoStack />
        </div>
        <div className="w-full space-y-6">
          <div className="relative py-10 *:block space-y-8 max-w-4xl w-fit mx-auto">
            <div className="w-fit mx-auto hidden! md:py-10 py-0">
              <ThemeImage
                className="mx-auto w-fit"
                srcDark="/logo/dark-full.png"
                srcLight="/logo/light-full.png"
                width={256}
                height={40}
                alt="logo"
              />
            </div>
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
          <Button variant="outline" size="lg" asChild>
            <Link href="https://t.me/yz13_dev" target="_blank">
              <SendIcon />
              <span>Чат</span>
            </Link>
          </Button>
          <Button variant="default" size="lg" disabled>
            <span>Запланировать видеозвонок</span><ArrowRightIcon />
          </Button>
        </div>
      </main>

      <div className="w-full hidden! container mx-auto px-6 py-6 space-y-6">
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
        {
          projects
            .map(project => {
              return (
                <ProjectContainer key={project.id}>
                  <Project project={project} />
                </ProjectContainer>
              )
            })
        }
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
              <AccordionContent className="text-lg">
                <span>123</span>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="2">
              <AccordionTrigger className="text-lg">
                <span>Почему стоит работать со мной?</span>
              </AccordionTrigger>
              <AccordionContent className="text-lg">
                <span>123</span>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <Accordion type="multiple">
            <AccordionItem value="1">
              <AccordionTrigger className="text-lg">
                <span>Почему стоит работать со мной?</span>
              </AccordionTrigger>
              <AccordionContent className="text-lg">
                <span>123</span>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="2">
              <AccordionTrigger className="text-lg">
                <span>Почему стоит работать со мной?</span>
              </AccordionTrigger>
              <AccordionContent className="text-lg">
                <span>123</span>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
      <Footer />
      <div className="py-4 px-6 container flex items-center justify-between mx-auto w-full">
        <span className="text-sm text-muted-foreground">
          YZ13 - фронтенд разработчик.
        </span>
        <span className="text-sm text-muted-foreground">
          ...
        </span>
      </div>
    </>
  )
}
