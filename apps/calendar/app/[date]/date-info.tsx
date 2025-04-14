import dayjs from "dayjs";
import objectSupport from "dayjs/plugin/objectSupport";

dayjs.extend(objectSupport);

export default function DateInfo({ date }: { date: string }) {
  const parsedDate = dayjs(date, "YYYY-MM-DD").locale("ru");
  return (
    <div className="flex flex-col">
      <span className="text-lg font-medium capitalize">
        {parsedDate.format("MMMM DD, YYYY")}
      </span>
      <span className="text-base text-foreground capitalize">
        {parsedDate.format("dddd")}
      </span>
    </div>
  );
}
