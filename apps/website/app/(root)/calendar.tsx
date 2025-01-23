import dayjs from "dayjs";
import "dayjs/locale/ru";
import { Separator } from "mono/components/separator";

type TimeRange = [number, number];

const Calendar = () => {
  const today = dayjs().locale("ru");
  const tomorrow = today.add(1, "day");
  const todayFormatted = today.format("dddd, DD MMMM");
  const tomorrowFormatted = tomorrow.format("DD MMMM");
  const timeRange: TimeRange = [9, 16];
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
    <div className="w-full flex flex-row gap-4 *:w-1/2 *:flex *:flex-col *:gap-4">
      <div>
        <span className="uppercase text-sm">{todayFormatted}</span>
        <div className="w-full relative *:w-full h-[304px]">
          <div className="absolute *:h-12 w-full top-0 left-0">
            {range.map((time, index) => {
              return (
                <div key={"today/" + index} className="w-full">
                  <div className="w-full flex items-center gap-2">
                    <span className="text-xs w-4 text-secondary">{time}</span>
                    <Separator className="w-[calc(100%-1rem-0.5rem)]" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div>
        <span className="uppercase text-sm">завтра, {tomorrowFormatted}</span>
        <div className="w-full relative *:w-full h-[304px]">
          <div className="absolute *:h-12 w-full top-0 left-0">
            {range.map((time, index) => {
              return (
                <div key={"tomorrow/" + index} className="w-full">
                  <div className="w-full flex items-center gap-2">
                    <span className="text-xs w-4 text-secondary">{time}</span>
                    <Separator className="w-[calc(100%-1rem-0.5rem)]" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
