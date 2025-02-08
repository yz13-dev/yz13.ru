"use client";
import { getGroups, getStage, Release, ReleaseStage } from "@/const/releases";
import { useEffect, useMemo } from "react";
import DraggableCard from "./draggable-card";
import ProjectCard from "./project-card";
import useProjectsStore, { setProjects } from "./projects.store";
import StageColumn from "./stage-column";

type ProjectsListProps = {
  defaultProjects?: Release[];
  isActive?: boolean;
};

const ProjectsList = ({
  isActive = false,
  defaultProjects = [],
}: ProjectsListProps) => {
  const projects = useProjectsStore((state) => state.projects);
  const { groups, keys } = useMemo(() => {
    const groups = getGroups(projects);
    const groupKeys = Object.keys(groups);
    return { groups, keys: groupKeys };
  }, [projects]);
  // console.log(projects, groups, keys);
  useEffect(() => {
    setProjects(defaultProjects);
  }, []);
  return (
    <div className="w-full flex gap-4 p-6 min-h-[calc(100dvh-3.5rem)] overflow-auto">
      {keys.map((group, index) => {
        const groupData = groups[group as ReleaseStage];
        const groupName = getStage[group as ReleaseStage];
        const count = groupData.length;
        return (
          <StageColumn
            active={isActive}
            key={`${index}/${groupName}`}
            stage={group as ReleaseStage}
            count={count}
          >
            {groupData.map((item, i) => {
              if (isActive)
                return (
                  <DraggableCard
                    key={`${index}/${i}/${groupName}`}
                    release={item}
                  />
                );
              return (
                <li key={`${index}/${i}/${groupName}`} className="list-none">
                  <ProjectCard release={item} />
                </li>
              );
            })}
          </StageColumn>
        );
      })}
    </div>
  );
};

export default ProjectsList;
