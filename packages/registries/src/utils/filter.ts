
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
