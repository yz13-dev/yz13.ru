"use client";
import {
  AppWindowIcon,
  GlobeIcon,
  PanelTopIcon,
  SparklesIcon,
  StoreIcon,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "mono/components/tooltip";
import { Pricing } from "rest-api/types/pricing";

type Props = {
  sign?: string;
  services?: Pricing[];
};

const icons = {
  pages: <PanelTopIcon size={14} />,
  website: <GlobeIcon size={14} />,
  "web-app": <AppWindowIcon size={14} />,
  mvp: <SparklesIcon size={14} />,
};

export default function ({ services = [], sign = "₽" }: Props) {
  return services.map((service) => {
    const type = service.type as keyof typeof icons;
    const icon = type ? icons[type] : <StoreIcon />;
    return (
      <Tooltip key={service.id}>
        <TooltipTrigger className="flex items-center gap-2 [&>svg]:shrink-0 [&>svg]:size-5">
          {icon}
          <span className="text-base">{service.name ?? "Неизвестно"}</span>
        </TooltipTrigger>
        <TooltipContent
          side="top"
          align="center"
          className="*:block backdrop-blur-lg space-y-3 max-w-sm"
        >
          <span className="text-2xl font-medium">
            От {service.price.toLocaleString()}
            {sign}
          </span>
          <span className="text-base">
            {service.description ?? "Нет описания"}
          </span>
        </TooltipContent>
      </Tooltip>
    );
  });
}
