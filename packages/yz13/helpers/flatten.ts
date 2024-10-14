export const flatten = (arr: any[][]) => {
  return arr.reduce((a, b) => [...a, ...b]);
};
