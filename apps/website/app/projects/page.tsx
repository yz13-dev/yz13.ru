import Footer from "@/components/footer";
import Header from "@/components/header";
import Project, { ProjectContainer } from "@/components/project";
import { projects } from "@yz13/registries";
import { Button } from "@yz13/ui/button";
import { FilterIcon } from "@yz13/ui/icons";
import LogoStack from "../(root)/components/logo-stack";



export default function Projects() {
  return (
    <>
      <Header />

      <div className="w-full container px-6 mx-auto h-fit md:pt-32 pt-24 md:pb-16 pb-12 space-y-12">
        <LogoStack
          orientation="horizontal"
          align="right"
          gap={42}
        />
      </div>
      <div className="w-full container px-6 mx-auto h-fit py-6 space-y-12">
        <h1 className="text-6xl block font-medium">Проекты</h1>
        {
          false &&
          <div className="pt-6 flex items-center gap-2">
            <Button variant="secondary"><FilterIcon /><span>Фильтры</span></Button>
          </div>
        }
      </div>

      <div className="w-full divide-y border-y *:[&>div]:px-6">
        {
          projects.length === 0 &&
          <div className="w-full container mx-auto px-6 py-6 space-y-6">
            <div className="text-center">
              <span className="text-muted-foreground">
                Нет проектов
              </span>
            </div>
          </div>
        }
        {
          projects
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
