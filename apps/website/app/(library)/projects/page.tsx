import Footer from "@/components/footer";
import Header from "@/components/header";
import Project, { ProjectContainer } from "@/components/project";
import { ThemeImage } from "@/components/theme-image";
import { Project as ProjectType, projects } from "@yz13/registries";
import { filter } from "@yz13/registries/utils/filter";
import { getStack } from "@yz13/registries/utils/stack";
import { ArrowDownAZIcon, ArrowDownNarrowWideIcon, ArrowDownWideNarrowIcon, ArrowDownZAIcon, XIcon } from "@yz13/ui/icons";
import { Skeleton } from "@yz13/ui/skeleton";
import { parse } from "date-fns";
import Image from "next/image";
import Filters, { FilterItem } from "../components/filters";
import SearchInput from "../components/search-input";

type Props = {
  searchParams: Promise<{
    q: string;
    stack: string;
    sortBy: string;
    order: string;
  }>;
}

export default async function Projects({ searchParams }: Props) {

  const { q, stack, sortBy, order } = await searchParams;

  const onlyProjects = filter<ProjectType>(projects, (project) => project.type === "project");

  const filtered = filter<ProjectType>(onlyProjects, (project) => {
    if (stack && q) {
      const isInName = project.name.toLowerCase().includes(q.toLowerCase())
      const isInDescription = (project.description || "")?.toLowerCase().includes(q.toLowerCase())

      const isInStack = project.stack.some(item => item.id === stack);

      return (isInName || isInDescription) && isInStack;
    }
    if (stack) return project.stack.some(item => item.id === stack);
    if (q) {
      const isInName = project.name.toLowerCase().includes(q.toLowerCase())
      const isInDescription = (project.description || "")?.toLowerCase().includes(q.toLowerCase())
      return isInName || isInDescription;
    }
    else return true;
  })
    .sort((a, b) => {
      if (!sortBy) return 0;
      if (sortBy === "date") {
        const ADate = parse(a.date, "yyyy-MM-dd", new Date());
        const BDate = parse(b.date, "yyyy-MM-dd", new Date());
        if (order === "asc") return ADate.getTime() - BDate.getTime()
        if (order === "desc") return BDate.getTime() - ADate.getTime()
        return 0;
      }
      if (sortBy === "name") {
        if (order === "asc") return a.name.localeCompare(b.name);
        if (order === "desc") return b.name.localeCompare(a.name);
        return 0;
      }
      return 0;
    })

  return (
    <>
      <Header />

      <div className="w-full container px-6 mx-auto h-fit md:pt-32 pt-24 md:pb-16 pb-12 gap-12 grid lg:grid-cols-7 md:grid-cols-5 sm:grid-cols-3 grid-cols-2">
        {
          onlyProjects
            .map((item, index) => {
              const logo = item.logo;
              if (!logo) return null;
              if (logo.url) return (
                <div
                  key={`stack/${index}`}
                  className="size-32 outline-6 border outline-border/40 transition-colors rounded-3xl bg-card flex items-center justify-center"
                >
                  <Image
                    className="relative"
                    src={logo.url || "/logo/dark.png"}
                    width={96}
                    height={96}
                    alt="logo"
                  />
                </div>
              )
              return (
                <div
                  key={`stack/${index}`}
                  className="size-32 outline-6 border outline-border/40 transition-colors rounded-3xl bg-card flex items-center justify-center"
                >
                  <ThemeImage
                    className="relative"
                    srcDark={logo.theme?.dark || "/logo/dark.png"}
                    srcLight={logo.theme?.light || "/logo/light.png"}
                    width={96}
                    height={96}
                    alt="logo"
                  />
                </div>
              )
            })
        }
        <Skeleton className="size-32 outline-6 border outline-border/40 transition-colors rounded-3xl bg-card flex items-center justify-center">
          <Skeleton className="size-24 rounded-xl" />
        </Skeleton>
      </div>
      <div className="w-full container px-6 mx-auto h-fit py-6 space-y-12">
        <div className="*:block max-w-4xl space-y-4">
          <h1 className="text-6xl block font-medium">Проекты</h1>
          <p className="text-4xl text-muted-foreground">Личные проекты, разработанные в прошлом или находящиеся в разработке</p>
        </div>
        <div className="pt-6 flex items-center gap-2">
          <SearchInput />
          <Filters />
        </div>
        <div className="flex items-center gap-2">
          {
            q &&
            <FilterItem filterKey="q">
              Поиск:{" "}
              <span>{q}</span>
              <XIcon className="group-hover:size-4 size-0 transition-all" />
            </FilterItem>
          }

          {
            stack &&
            <FilterItem filterKey="stack">
              Стэк:{" "}
              {getStack(stack)?.name}
              <XIcon className="group-hover:size-4 size-0 transition-all" />
            </FilterItem>
          }

          {
            sortBy &&
            <FilterItem filterKey="sortBy">
              {
                sortBy === "date" && order
                  ?
                  order === "asc"
                    ? <ArrowDownNarrowWideIcon />
                    : <ArrowDownWideNarrowIcon />
                  : null
              }
              {
                sortBy === "name" && order
                  ?
                  order === "asc"
                    ? <ArrowDownAZIcon />
                    : <ArrowDownZAIcon />
                  : null
              }
              {sortBy === "date" && "Дате создания"}
              {sortBy === "name" && "Названию"}
              <XIcon className="group-hover:size-4 size-0 transition-all" />
            </FilterItem>
          }

        </div>
      </div>

      <div className="w-full divide-y border-y *:[&>div]:px-6">
        {
          filtered.length === 0 &&
          <div className="w-full container mx-auto px-6 py-6 space-y-6">
            <div className="text-center">
              <span className="text-muted-foreground">
                Нет проектов
              </span>
            </div>
          </div>
        }
        {
          filtered
            .map((project, index) => {
              const isFirst = index === 0;
              return (
                <ProjectContainer key={project.id}>
                  <Project project={project} orientation={isFirst ? "vertical" : "horizontal"} />
                </ProjectContainer>
              )
            })
        }
      </div>

      <Footer />

    </>
  )
}
