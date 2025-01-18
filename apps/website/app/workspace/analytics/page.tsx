import User from "@/app/user";
import Dock from "@/components/dock/dock";
import { Header } from "@/components/header";
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
      <Header>
        <Header.Left></Header.Left>
        <Header.Center></Header.Center>
        <Header.Right>
          <Popover>
            <PopoverTrigger asChild>
              <Button size="icon" variant="ghost">
                <ChartColumnBigIcon size={16} />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[460px] p-0 max-w-dvw rounded-xl">
              <UserAnalytics />
            </PopoverContent>
          </Popover>
          <User />
        </Header.Right>
      </Header>
      <Dock />
    </>
  );
};

export default page;
