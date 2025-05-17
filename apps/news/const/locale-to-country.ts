import { enUS, ru } from "date-fns/locale";

export const contries = {
  EN: "Europe",
  RU: "Россия",
};

export const locales = {
  ru: ru,
  en: enUS,
};

export type CountryCode = keyof typeof contries;
export type CalendarLocale = keyof typeof locales;
