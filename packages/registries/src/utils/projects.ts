import { Project, projects } from "../projects";



export function getProject(id: string) {

  const subProjects = projects.reduce((acc: Project[], project) => {
    if (project.subProjects) {
      return [...acc, ...project.subProjects];
    }
    return acc;
  }, [] as Project[]);

  const subProject = subProjects.find(project => project.id === id);
  const project = projects.find(project => project.id === id);
  return project || subProject;
}

export function getProjectsByIds(ids: string[]) {
  return projects.filter(project => ids.includes(project.id));
}
