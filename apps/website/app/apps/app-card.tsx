import { Release, ReleaseType } from "rest-api/types/projects";
import ProjectTypeIcons from "../projects/project-type-icons";
import Image from "next/image";
import Link from "next/link";
import { Button } from "mono/components/button";
import { ExternalLinkIcon } from "lucide-react";

type AppCardProps = {
  app: Release;
};
const AppCard = ({ app }: AppCardProps) => {
  const icon = app.icon as {
    light: string;
    dark: string;
  };
  const Icon = ProjectTypeIcons[app.type as ReleaseType];
  return (
    <div className="w-full rounded-2xl hover:bg-background-secondary border space-y-1.5 p-3 transition-colors hover:border-foreground">
      <div className="flex items-center gap-2">
        {icon ? (
          <>
            <Image
              src={icon.light}
              className="light-mode-image"
              width={18}
              height={18}
              alt={app.name}
            />
            <Image
              src={icon.dark}
              className="dark-mode-image"
              width={18}
              height={18}
              alt={app.name}
            />
          </>
        ) : (
          <Icon
            size={18}
            className="text-secondary group-hover:text-foreground transition-colors"
          />
        )}
        <span className="text-sm">{app.name}</span>
      </div>
      {app.description && (
        <span className="text-secondary text-sm line-clamp-2">
          {app.description}
        </span>
      )}
      <div className="flex items-center justify-end">
        {app.public_url ? (
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="rounded-full gap-1.5"
          >
            <Link target="_blank" href={app.public_url}>
              <span>Открыть</span>
              <ExternalLinkIcon size={16} />
            </Link>
          </Button>
        ) : (
          <Button
            variant="ghost"
            size="sm"
            disabled
            className="rounded-full text-sm text-secondary"
          >
            Без ссылки
          </Button>
        )}
      </div>
    </div>
  );
};

export default AppCard;
