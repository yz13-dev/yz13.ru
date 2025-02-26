export const groupByFirstLetter = <T extends Record<string, any>>(
  key: keyof T,
  list: T[],
) => {
  const result: Record<string, typeof list> = {};
  list.forEach((item) => {
    const firstLetter = String(item[key]).charAt(0).toUpperCase();
    if (!result[firstLetter]) {
      result[firstLetter] = [];
    }
    result[firstLetter].push(item);
  });
  return result;
};
