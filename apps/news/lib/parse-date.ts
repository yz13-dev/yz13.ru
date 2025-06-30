import { formatISO, parse } from "date-fns";



export function convertToISO(date: string, keepOffset = false) {
  const parsedDate = parse(
    date,
    "EEE, dd MMM yyyy HH:mm:ss xx",
    new Date()
  );

  if (keepOffset) {
    return formatISO(parsedDate, { representation: 'complete' });
  }
  return formatISO(parsedDate);
}
