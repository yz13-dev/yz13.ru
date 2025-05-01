import {
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  parse,
  startOfWeek,
} from "date-fns";
import { ru } from "date-fns/locale";

const locale = ru;
export const getDaysForMonthView = (date: string) => {
  const parsedDate = parse(date, "yyyy-MM-dd", new Date());
  const currentMonth = format(parsedDate, "MMM-yyyy", {
    locale,
    weekStartsOn: 1,
  });
  const firstDayCurrentMonth = parse(currentMonth, "MMM-yyyy", new Date(), {
    locale,
    weekStartsOn: 1,
  });

  const startDate = startOfWeek(firstDayCurrentMonth, {
    weekStartsOn: 1,
    locale,
  });
  const endDate = endOfWeek(endOfMonth(firstDayCurrentMonth), {
    weekStartsOn: 1,
    locale,
  });

  const days = eachDayOfInterval({
    start: startDate,
    end: endDate,
  });

  return {
    start: startDate,
    end: endDate,
    days,
  };
};
