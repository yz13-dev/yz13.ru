import Calendar from "@/app/(root)/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "mono/components/popover";

const CalendarPopover = ({ children }: { children?: React.ReactNode }) => {
  return (
    <Popover>
      <PopoverTrigger asChild={!!children}>{children}</PopoverTrigger>
      <PopoverContent sideOffset={12} className="rounded-xl w-96 max-w-full">
        <Calendar />
      </PopoverContent>
    </Popover>
  );
};

export default CalendarPopover;
