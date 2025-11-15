import type { Project } from "../projects";



type Filter = {
  [key in keyof Project]: Project[keyof Project];
}

export function filterProjects(projects?: Project[], filter?: Partial<Filter> | ((project: Project) => boolean)) {

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

export function filter<T>(data?: T[], filter?: Partial<T> | ((item: T) => boolean)) {

  if (!data) return [];
  if (!filter) return data;

  const filtered: T[] = [];

  for (const item of data) {
    let match = true;
    if (typeof filter === "function") {
      const run = filter(item);

      match = run;
    }
    if (typeof filter === "object") {
      for (const key in filter) {
        if (item[key] !== filter[key]) {
          match = false;
          break;
        }
      }
    }
    if (match) filtered.push(item);
  }
  return filtered;
}
