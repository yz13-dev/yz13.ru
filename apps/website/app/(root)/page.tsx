import { AvailabilitySkeleton } from "@/components/availability";
import BlogPost, { BlogPostContainer } from "@/components/blog-post";
import { HeaderSkeleton } from "@/components/header";
import Project, { ProjectContainer } from "@/components/project";
import { ThemeImage } from "@/components/theme-image";
import { getBlogPosts } from "@/utils/blog/blog";
import { Project as ProjectType, projects } from "@yz13/registries";
import { filter } from "@yz13/registries/utils/filter";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@yz13/ui/accordion";
import { Button } from "@yz13/ui/button";
import { cn } from "@yz13/ui/cn";
import { ArrowRightIcon, SendIcon } from "@yz13/ui/icons";
import { Skeleton } from "@yz13/ui/skeleton";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Suspense } from "react";
const Availability = dynamic(() => import("@/components/availability"), {
  loading: () => <AvailabilitySkeleton type="full" className="h-10" />
});
const LogoStack = dynamic(() => import("./components/logo-stack"), {
  loading: () => <Skeleton className="size-32" />
});
const Footer = dynamic(() => import("@/components/footer"));
const GithubContributions = dynamic(() => import("@/components/github-contributions"), {
  loading: () => <Skeleton className="w-full h-[215px]" />
});
const Header = dynamic(() => import("@/components/header"), {
  loading: () => <HeaderSkeleton />
})

export default function Home() {
  const posts = getBlogPosts();
  const hasBlogPosts = posts.length > 0;

  const allProjects = filter<ProjectType>(projects, project => project.type === "project");

  return (
    <>
      <Suspense fallback={<HeaderSkeleton />}>
        <Header />
      </Suspense>
      <main
        className={cn(
          "container w-full mx-auto md:pt-32 pt-24 md:pb-[10%] pb-[7.5%] px-6",
          "h-fit",
          "flex flex-col items-center md:justify-start justify-between",
        )}
      >
        <div className="w-full h-fit flex items-center">
          <LogoStack orientation="horizontal" align="right" gap={40} />
        </div>
        <div className="w-full space-y-6">
          <div className="relative md:py-16 py-10 *:block space-y-8 max-w-4xl w-fit">
            <div className="w-fit hidden! md:py-10 py-0">
              <ThemeImage
                className="mx-auto w-fit"
                srcDark="/logo/dark-full.png"
                srcLight="/logo/light-full.png"
                width={256}
                height={40}
                alt="logo"
              />
            </div>
            <h1 className="md:text-6xl text-5xl text-balance font-semibold">
              Нужен разработчик?
            </h1>
            <p className="md:text-4xl text-2xl text-balance text-muted-foreground">
              Разработаю фронтенд для вашего проекта
            </p>
          </div>
        </div>
        <div className="w-full space-y-3">
          <Suspense
            fallback={<AvailabilitySkeleton type="full" className="h-10" />}
          >
            <Availability textType="full" className="h-10 text-base" />
          </Suspense>
          <div
            className={cn(
              "pt-4 *:text-lg [&>button>svg]:size-5!",
              "flex flex-row items-center justify-start gap-2",
              "*:w-fit *:h-12 *:px-8 w-full",
            )}
          >
            <Button variant="outline" size="lg" asChild>
              <Link href="https://t.me/yz13_dev" target="_blank">
                <SendIcon />
                <span>Чат</span>
              </Link>
            </Button>
            <Button variant="default" size="lg" disabled>
              <span>Запланировать видеозвонок</span>
              <ArrowRightIcon />
            </Button>
          </div>
        </div>
      </main>

      <div className="w-full container mx-auto px-6 py-6 space-y-6">
        <Suspense
          fallback={
            <GithubContributions
              username="yz13-dev"
              blockSize={24}
              blockRadius={6}
              loading
            />
          }
        >
          <GithubContributions
            username="yz13-dev"
            blockSize={24}
            blockRadius={6}
          />
        </Suspense>
      </div>

      <div className="w-full hidden! container mx-auto px-6 py-6 space-y-6">
        <div className="grid mx-auto xl:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4">
          <div className="flex items-center gap-3">
            <div className="rounded-md h-16 aspect-video bg-secondary" />
            <div className="flex flex-col gap-1">
              <span className="text-base font-medium line-clamp-2 leading-5">
                Один из проектов, которые закрепленны в списке проектов
              </span>
              <span className="text-xs text-muted-foreground uppercase">
                проект
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="rounded-md h-16 aspect-video bg-secondary" />
            <div className="flex flex-col gap-1">
              <span className="text-base font-medium line-clamp-2 leading-5">
                Один из записей в блоге, которые закрепленны в списке блога
              </span>
              <span className="text-xs text-muted-foreground uppercase">
                блог
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="rounded-md h-16 aspect-video bg-secondary" />
            <div className="flex flex-col gap-1">
              <span className="text-base font-medium line-clamp-2 leading-5">
                Один из проектов, которые закрепленны в списке проектов
              </span>
              <span className="text-xs text-muted-foreground uppercase">
                проект
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="rounded-md h-16 aspect-video bg-secondary" />
            <div className="flex flex-col gap-1">
              <span className="text-base font-medium line-clamp-2 leading-5">
                Один из записей в блоге, которые закрепленны в списке блога
              </span>
              <span className="text-xs text-muted-foreground uppercase">
                блог
              </span>
            </div>
          </div>
        </div>
      </div>


      <div className="py-12 px-6 container mx-auto">
        <h2 className="text-4xl font-medium">Проекты и работы</h2>
      </div>
      <div className="w-full divide-y border-y">
        {projects.map((project) => {
          return (
            <ProjectContainer key={project.id}>
              <Project project={project} />
            </ProjectContainer>
          );
        })}
      </div>
      {hasBlogPosts && (
        <div className="w-full pb-6">
          <section className="py-12 px-6 container mx-auto">
            <h2 className="text-4xl font-medium text-muted-foreground">Блог</h2>
            <p className="text-4xl font-medium">Мои идеи, результаты</p>
          </section>
          <div className="w-full divide-y border-y">
            {posts.map((post) => {
              return (
                <BlogPostContainer key={post._meta.fileName}>
                  <BlogPost post={post} />
                </BlogPostContainer>
              );
            })}
          </div>
        </div>
      )}
      {false && (
        <div className="w-full *:px-6 pb-6">
          <div className="py-12 container mx-auto">
            <h2 className="text-4xl font-medium">Ответы на вопросы</h2>
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
      )}
      <Footer />
    </>
  );
}
