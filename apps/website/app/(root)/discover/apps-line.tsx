import Image from "next/image";
import Link from "next/link";
import { cn } from "yz13/cn";

type App = {
  id: string;
  label: string;
  icon: {
    dark: string;
    light: string;
  };
  showOnProd: boolean;
};

const apps: App[] = [
  {
    id: "finance",
    label: "Finance",
    icon: {
      dark: "/apps/yz-finance-dark.svg",
      light: "/apps/yz-finance-light.svg",
    },
    showOnProd: false,
  },
];

const AppsLine = () => {
  return (
    <section
      className={cn(
        "w-full grid grid-cols-7 gap-3",
        "*:w-full *:aspect-square",
      )}
    >
      {apps
        .filter((app) => {
          if (process.env.NODE_ENV !== "development") return app.showOnProd;
          return app;
        })
        .map((app) => {
          return (
            <Link
              key={app.id}
              href={"/" + app.id}
              className="flex flex-col group items-center justify-evenly gap-2"
            >
              <Image
                className="dark-mode-image"
                src={app.icon.dark}
                width={42}
                height={42}
                alt="yz-finance"
              />
              <Image
                className="light-mode-image"
                src={app.icon.light}
                width={42}
                height={42}
                alt="yz-finance"
              />
              <span className="text-xs text-center font-pixel text-secondary group-hover:text-foreground">
                {app.label}
              </span>
            </Link>
          );
        })}
    </section>
  );
};

export default AppsLine;
