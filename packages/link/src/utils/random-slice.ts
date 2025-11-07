



export const random = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


export const randomSlice = (length: number): [number, number] => {

  const start = random(0, length);
  const end = random(start, length);

  const diff = end - start;

  if (diff <= 2) {
    return randomSlice(length);
  }

  return [start, end];
}
