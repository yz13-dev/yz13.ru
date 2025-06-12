"use client";
import { Calendar } from "@yz13/ui/components/calendar";
import { ru } from "date-fns/locale";
import dayjs from "dayjs";

type Props = {
  date: string;
}
const CalendarWidget = ({ date }: Props) => {
  const pickedDate = dayjs(date, "YYYY-MM-DD").locale("ru");
  return <Calendar className="w-full" selected={pickedDate.toDate()} locale={ru} />
}

export default CalendarWidget;
