import Image from "next/image";
import Link from "next/link";
import { cn } from "yz13/cn";
import { getGroups } from "../../releases/releases";

const AppsLine = () => {
  const groups = getGroups();
  const released = groups.released;
  if (!released.length) return null;
  return (
    <section
      className={cn(
        "w-full grid grid-cols-7 gap-3",
        "*:w-full *:aspect-square",
      )}
    >
      {released.map((app) => {
        return (
          <Link
            key={app.id}
            href={"/" + app.id}
            className="flex flex-col group items-center justify-evenly gap-2"
          >
            {app.icon ? (
              <>
                <Image
                  className="dark-mode-image"
                  src={app.icon.dark}
                  width={44}
                  height={44}
                  alt="yz-finance"
                />
                <Image
                  className="light-mode-image"
                  src={app.icon.light}
                  width={44}
                  height={44}
                  alt="yz-finance"
                />
              </>
            ) : (
              <div className="w-11 rounded-md border bg-yz-neutral-100" />
            )}

            <span className="text-xs text-center font-pixel text-secondary group-hover:text-foreground">
              {app.name}
            </span>
          </Link>
        );
      })}
    </section>
  );
};

export default AppsLine;
