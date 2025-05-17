import { enUS, ru } from "date-fns/locale";

export const contries = {
  EN: "USA, EN",
  RU: "Россия",
};

export const locales = {
  ru: ru,
  en: enUS,
};

export type CalendarLocale = keyof typeof locales;
