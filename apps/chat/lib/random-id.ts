export default function randomId(length = 15) {
  let letters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";
  let id = "";
  for (let i = 0; i < length; i++) {
    id += letters.charAt(Math.floor(Math.random() * letters.length));
  }
  return id;
}

export function randomNumberId(length: number = 15): number {
  return Math.floor(Math.random() * Math.pow(10, length));
}
