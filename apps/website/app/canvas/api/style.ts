export function getStyle(variable: string) {
  const doc = document.documentElement;
  return getComputedStyle(doc).getPropertyValue(variable);
}
