import { Logo } from "@/components/logo";
import {
  ArrowLeftIcon,
  CalendarIcon,
  ChartPieIcon,
  CirclePlayIcon,
  DollarSignIcon,
  HomeIcon,
  SmileIcon,
} from "lucide-react";
import { cn } from "yz13/cn";
import { Icon, LinkButton, Text } from "./button";

const Sidebar = () => {
  return (
    <aside
      className={cn(
        "w-12 h-dvh px-2 py-6 sticky left-0 top-0 flex flex-col justify-between",
        "2xl:!w-64 2xl:!px-6 2xl:!fixed",
      )}
    >
      <div className="w-full h-10">
        <Logo size={{ width: 36, height: 36 }} />
      </div>
      <nav className="w-full space-y-8 *:space-y-2">
        <div>
          <LinkButton href="/workspace/" className="w-full" variant="secondary">
            <Icon>
              <HomeIcon size={16} />
            </Icon>
            <Text>Доска</Text>
          </LinkButton>
        </div>
        <div>
          <LinkButton href="/workspace/projects" className="w-full">
            <Icon>
              <CirclePlayIcon size={16} />
            </Icon>
            <Text>Проекты</Text>
          </LinkButton>
          <LinkButton href="/workspace/customers" className="w-full">
            <Icon>
              <SmileIcon size={16} />
            </Icon>
            <Text>Заказчики</Text>
          </LinkButton>
        </div>
        <div>
          <LinkButton href="/workspace/schedule" className="w-full">
            <Icon>
              <CalendarIcon size={16} />
            </Icon>
            <Text>Расписание</Text>
          </LinkButton>
        </div>
        <div>
          <LinkButton href="/workspace/finances" className="w-full">
            <Icon>
              <DollarSignIcon size={16} />
            </Icon>
            <Text>Финансы</Text>
          </LinkButton>
          <LinkButton href="/workspace/analytics" className="w-full">
            <Icon>
              <ChartPieIcon size={16} />
            </Icon>
            <Text>Аналитика</Text>
          </LinkButton>
        </div>
      </nav>
      <div className="w-full h-10 flex items-center">
        <LinkButton href="/">
          <Icon>
            <ArrowLeftIcon size={16} />
          </Icon>
          <Text>Назад</Text>
        </LinkButton>
      </div>
    </aside>
  );
};

export default Sidebar;
