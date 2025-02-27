import {
  ArrowLeftIcon,
  CalendarIcon,
  ChartPieIcon,
  CirclePlayIcon,
  DollarSignIcon,
  HomeIcon,
  SmileIcon,
} from "lucide-react";
import { Separator } from "mono/components/separator";
import { cn } from "yz13/cn";
import { Icon, LinkButton, Text } from "./button";

const Sidebar = () => {
  return (
    <aside
      className={cn(
        "h-[calc(100dvh-48px)] sticky left-0 shrink-0 top-0 flex flex-col justify-between",
        "border-r p-3 items-center",
        "w-16",
      )}
    >
      <nav className="w-full space-y-2 *:space-y-2">
        <div className="*:justify-center *:aspect-square">
          <LinkButton href="/workspace/" className="w-full" variant="secondary">
            <Icon>
              <HomeIcon size={20} />
            </Icon>
            <Text>Доска</Text>
          </LinkButton>
        </div>
        <Separator />
        <div className="*:justify-center *:aspect-square">
          <LinkButton href="/workspace/projects" className="w-full">
            <Icon>
              <CirclePlayIcon size={20} />
            </Icon>
            <Text>Проекты</Text>
          </LinkButton>
          <LinkButton href="/workspace/customers" className="w-full">
            <Icon>
              <SmileIcon size={20} />
            </Icon>
            <Text>Заказчики</Text>
          </LinkButton>
        </div>
        <Separator />
        <div className="*:justify-center *:aspect-square">
          <LinkButton href="/workspace/schedule" className="w-full">
            <Icon>
              <CalendarIcon size={20} />
            </Icon>
            <Text>Расписание</Text>
          </LinkButton>
        </div>
        <Separator />
        <div className="*:justify-center *:aspect-square">
          <LinkButton href="/workspace/finances" className="w-full">
            <Icon>
              <DollarSignIcon size={20} />
            </Icon>
            <Text>Финансы</Text>
          </LinkButton>
          <LinkButton href="/workspace/analytics" className="w-full">
            <Icon>
              <ChartPieIcon size={20} />
            </Icon>
            <Text>Аналитика</Text>
          </LinkButton>
        </div>
      </nav>
      <div className="*:justify-center *:aspect-square">
        <LinkButton href="/">
          <Icon>
            <ArrowLeftIcon size={20} />
          </Icon>
          <Text>Назад</Text>
        </LinkButton>
      </div>
    </aside>
  );
};

export default Sidebar;
