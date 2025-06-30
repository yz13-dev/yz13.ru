export const parseObjTags = (tags: string[]): string[] => {
  const other = tags
    .filter((tag) => tag !== null)
    .filter((tag) => !tag.startsWith("{") && !tag.endsWith("}"));
  const obj = tags
    .filter((tag) => tag !== null)
    .filter((tag) => tag.startsWith("{") && tag.endsWith("}"))
    .map((tag) => JSON.parse(tag))
    .map((tag) => tag._);
  const union = [...new Set(obj.concat(other))];
  return union;
};
