import { allProjects } from "@/.content-collections/generated";



export function getProject(id: string) {
  return allProjects.find(project => project._meta.path === id);
}

export function isPublished(id: string) {
  const project = getProject(id);
  return !!project?.published;
}
