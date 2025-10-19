import type { Pin } from "@/app/hooks/use-grid";

export const sortToColumns = (list: Pin[], cols: number, columnWidth: number = 300): Pin[][] => {
  const pins = list ?? [];
  if (!cols || cols <= 0) return [pins];
  if (cols === 1) return [pins];

  const columns: Pin[][] = Array.from({ length: cols }, () => []);
  const columnHeights: number[] = Array(cols).fill(0);

  // Функция для вычисления высоты пина с учетом соотношения сторон
  const getScaledHeight = (pin: Pin): number => {
    const aspectRatio = (pin.height ?? 0) / (pin.width ?? 0);
    return columnWidth * aspectRatio;
  };

  // Распределяем пины по колонкам, выбирая всегда самую короткую колонку
  pins.forEach((pin) => {
    const scaledHeight = getScaledHeight(pin);

    // Находим индекс колонки с минимальной высотой
    const minHeightIndex = columnHeights.indexOf(Math.min(...columnHeights));

    if (minHeightIndex === -1) return;
    // Добавляем пин в самую короткую колонку
    columns[minHeightIndex].push(pin);
    columnHeights[minHeightIndex] += scaledHeight;
  });

  return columns;
};
