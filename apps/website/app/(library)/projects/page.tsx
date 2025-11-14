import Footer from "@/components/footer";
import Header from "@/components/header";
import Project, { ProjectContainer } from "@/components/project";
import { ThemeImage } from "@/components/theme-image";
import { projects } from "@yz13/registries";
import { filterProjects } from "@yz13/registries/utils/filter";
import { Button } from "@yz13/ui/button";
import { FilterIcon } from "@yz13/ui/icons";
import { Skeleton } from "@yz13/ui/skeleton";
import Image from "next/image";

export default function Projects() {

  const onlyProjects = filterProjects(projects, { type: "project" });

  return (
    <>
      <Header />

      <div className="w-full container px-6 mx-auto h-fit md:pt-32 pt-24 md:pb-16 pb-12 gap-12 grid grid-cols-7">
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
        {
          false &&
          <div className="pt-6 flex items-center gap-2">
            <Button variant="secondary"><FilterIcon /><span>Фильтры</span></Button>
          </div>
        }
      </div>

      <div className="w-full divide-y border-y *:[&>div]:px-6">
        {
          onlyProjects.length === 0 &&
          <div className="w-full container mx-auto px-6 py-6 space-y-6">
            <div className="text-center">
              <span className="text-muted-foreground">
                Нет проектов
              </span>
            </div>
          </div>
        }
        {
          onlyProjects
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
