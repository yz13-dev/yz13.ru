import { allProjects } from "@/.content-collections/generated";



export function getProject(id: string) {
  return allProjects.find(project => project._meta.path === id);
}

export function getProjectsByIds(ids: string[]) {
  return allProjects.filter(project => ids.includes(project._meta.path));
}

export function isPublished(id?: string) {
  if (!id) return false;
  const project = getProject(id);
  return !!project?.published;
}
