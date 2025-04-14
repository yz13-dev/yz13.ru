import dayjs from "dayjs";
import "dayjs/locale/ru";
import { Separator } from "mono/components/separator";

type TimeRange = [number, number];

type CalendarProps = {
  timeRange?: TimeRange;
  dateRange?: number[];
};

type CalendarDayProps = {
  range?: number[];
  date: string;
};

const CalendarDay = ({ range = [], date }: CalendarDayProps) => {
  const today = dayjs().locale("ru");
  const day = dayjs(date).locale("ru");
  const isToday =
    today.isSame(day, "D") && today.isSame(day, "M") && today.isSame(day, "y");
  const todayFormatted = day.format("DD MMMM");
  const rangeLength = range.length;
  return (
    <div>
      <span className="uppercase text-sm block">
        {isToday && "сегодня, "}
        {todayFormatted}
      </span>
      <div
        style={{
          height: rangeLength * 48,
        }}
        className="w-full relative *:w-full"
      >
        <div className="absolute *:h-12 w-full top-0 left-0">
          {range.map((time, index) => {
            return (
              <div key={"today/" + index} className="w-full">
                <div className="w-full flex items-center gap-2">
                  <span className="text-xs w-4 text-foreground">
                    {time <= 9 ? "0" : ""}
                    {time}
                  </span>
                  <Separator className="w-[calc(100%-1rem-0.5rem)]" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const Calendar = ({
  timeRange = [9, 16],
  dateRange = [0, 1],
}: CalendarProps) => {
  const today = dayjs().locale("ru");
  const calculateRange = (range: TimeRange) => {
    const length = range[1] - range[0];
    const result: number[] = [];
    for (let i = 0; i < length; i++) {
      result.push(range[0] + i);
    }
    return result;
  };
  const range = calculateRange(timeRange);
  return (
    <div
      style={{
        gridTemplateColumns: `repeat(${dateRange.length}, 1fr)`,
      }}
      className="w-full h-fit grid gap-4 *:space-y-4"
    >
      {dateRange.map((date, index) => {
        const day = today.add(date, "days");
        return (
          <CalendarDay
            key={"today/" + index}
            range={range}
            date={day.format()}
          />
        );
      })}
    </div>
  );
};

export default Calendar;
