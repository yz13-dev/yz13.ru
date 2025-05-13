import { format } from "date-fns";
import { getSchedule } from "rest-api/calendar/schedule";
import { DaySchedule } from "rest-api/types/calendar";
import { DayScheduleItem } from "./schedule";

export default async function () {
  const uid = "929e8f4f-ff0b-4802-8381-4cb5f73630f6";
  const { data } = await getSchedule(uid);
  const today = new Date();
  const weekday = format(today, "eeeeeee").toLowerCase();
  const schedule = (data?.[weekday as keyof typeof data] ??
    []) as DaySchedule[];
  return (
    <div className="flex items-center gap-2">
      <DayScheduleItem schedule={schedule} label="Сегодня" />
    </div>
  );
}
