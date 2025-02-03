import { getProjects } from "@/actions/projects/projects";
import Dock from "@/components/dock/dock";
import { Logo } from "@/components/logo";
import PageDockFiller from "@/components/page-dock-filler";
import { getGroups, getStage, ReleaseStage } from "@/const/releases";
import { auth } from "@/lib/auth";
import "dayjs/locale/ru";
import Link from "next/link";
import NewProjectModal from "./new-project-modal";
import ProjectCard from "./project-card";
import StageColumn from "./stage-column";

const page = async () => {
  const user = await auth();
  const isAdmin = user?.user_metadata?.role === "admin";
  const releases = await getProjects();
  const groups = getGroups(releases);
  const groupKeys = Object.keys(groups);
  const showNewProjectModal = user && isAdmin;
  return (
    <>
      <header className="w-full h-14 flex items-center justify-between px-6 border-b">
        <Link href="/">
          <Logo size={{ width: 96, height: 18 }} type="full" />
        </Link>
        {showNewProjectModal && <NewProjectModal />}
      </header>
      <div className="w-full flex gap-4 p-6 min-h-[calc(100dvh-3.5rem)] overflow-auto">
        {groupKeys.map((group, index) => {
          const groupData = groups[group as ReleaseStage];
          const groupName = getStage[group as ReleaseStage];
          const count = groupData.length;
          return (
            <StageColumn
              key={`${index}/${groupName}`}
              stage={group as ReleaseStage}
              count={count}
            >
              {groupData.map((item, i) => {
                return (
                  <ProjectCard
                    key={`${index}/${i}/${groupName}`}
                    release={item}
                  />
                );
              })}
            </StageColumn>
          );
        })}
      </div>
      <PageDockFiller />
      <Dock />
    </>
  );
};

export default page;
