import { ChartColumnBigIcon } from "lucide-react";
import { Button } from "mono/components/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "mono/components/popover";
import UserAnalytics from "./user-analytics";

const page = () => {
  return (
    <>
      <header className="w-full h-fit flex items-center justify-between">
        <h1 className="text-2xl font-medium text-foreground">Аналитика</h1>
        <Popover>
          <PopoverTrigger asChild>
            <Button size="icon" variant="ghost" className="ml-auto">
              <ChartColumnBigIcon size={16} />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="w-[440px] p-0 rounded-xl"
            sideOffset={10}
            side="bottom"
            align="end"
            alignOffset={0}
          >
            <UserAnalytics />
          </PopoverContent>
        </Popover>
      </header>
    </>
  );
};

export default page;
