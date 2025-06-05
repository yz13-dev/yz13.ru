import { isDev } from "yz13/env";


export function getBookingLink(uid: string) {
  const domain = isDev ? "localhost:3001" : "calendar.yz13.ru";
  const link = `https://${domain}/booking/${uid}`;
  return link
}
