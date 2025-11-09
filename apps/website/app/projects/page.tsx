import Footer from "@/components/footer";
import Header from "@/components/header";
import Project, { ProjectContainer } from "@/components/project";
import LogoStack from "../(root)/components/logo-stack";



export default function Projects() {
  return (
    <>
      <Header />

      <div className="w-full container px-6 mx-auto h-fit py-32 space-y-12">
        <LogoStack
          orientation="horizontal"
          align="right"
          gap={42}
        />
        <h1 className="text-6xl block font-medium">Проекты</h1>
      </div>

      <div className="w-full divide-y border-y *:[&>div]:px-6">
        <ProjectContainer>
          <Project orientation="vertical" />
        </ProjectContainer>
        <ProjectContainer>
          <Project />
        </ProjectContainer>
        <ProjectContainer>
          <Project />
        </ProjectContainer>
      </div>

      <Footer />

    </>
  )
}
