import type { Project } from "../projects";



type Filter = {
  [key in keyof Project]: Project[keyof Project];
}

export function filterProjects(projects?: Project[], filter?: Partial<Filter>) {

  if (!projects) return [];
  if (!filter) return projects;

  const filtered: Project[] = [];

  for (const project of projects) {
    let match = true;
    for (const key in filter) {

      const filterKey = key as keyof Filter;

      if (project[filterKey] !== filter[filterKey]) {
        match = false;
        break;
      }
    }
    if (match) filtered.push(project);
  }

  return filtered;

}
