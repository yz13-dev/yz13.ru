import { cn } from "yz13/cn";

type CategoryProps = {
  category:
    | "signup"
    | "login"
    | "home"
    | "search"
    | "profile"
    | "checkout"
    | "settings";
  name: string;
  count: number;
  className?: string;
  covers: Cover[];
};
type Cover = {
  aspectRatio: "16/9" | "9/16";
  src?: string;
};

const ScreenCategory = ({
  category,
  name,
  count,
  covers,
  className = "",
}: CategoryProps) => {
  const disabled = count === 0;
  return (
    <div
      aria-disabled={disabled}
      className={cn(
        "w-full hover:bg-background group",
        "aria-disabled:bg-transparent",
        className,
      )}
    >
      <span
        className={cn(
          "text-sm font-medium text-foreground",
          "group-aria-disabled:text-secondary",
        )}
      >
        {name}
      </span>
      <span
        className={cn(
          "absolute left-3 bottom-3 text-5xl font-semibold text-secondary group-hover:text-foreground transition-colors",
          "group-aria-disabled:opacity-50",
        )}
      >
        {count}
      </span>
      {covers
        .map((cover, index) => (
          <div
            key={category + "-" + index}
            style={{
              right: `${12 * (index + 1)}px`,
              bottom: `-${12 * index}px`,
            }}
            className={cn(
              "absolute border right-6 -bottom-3 bg-yz-neutral-200 rounded-md",
              "group-aria-disabled:opacity-80",
              cover.aspectRatio === "16/9"
                ? "aspect-video h-20"
                : "w-14 aspect-[9/16]",
            )}
          />
        ))
        .reverse()}
    </div>
  );
};

const Screens = () => {
  return (
    <section className="w-full space-y-3">
      <span className="text-sm text-secondary">Screens</span>
      <div className="w-full grid grid-cols-4 gap-3 *:relative *:transition-colors *:overflow-hidden *:rounded-2xl *:bg-background/40 *:border *:p-3">
        <ScreenCategory
          category="signup"
          name="Signup"
          className="aspect-square"
          count={0}
          covers={[{ aspectRatio: "9/16" }, { aspectRatio: "9/16" }]}
        />

        <ScreenCategory
          category="login"
          name="Login"
          className="aspect-square"
          count={0}
          covers={[{ aspectRatio: "9/16" }, { aspectRatio: "9/16" }]}
        />

        <ScreenCategory
          category="home"
          name="Home"
          className="col-span-2"
          count={0}
          covers={[{ aspectRatio: "9/16" }, { aspectRatio: "9/16" }]}
        />
      </div>
      <div className="w-full grid grid-cols-4 gap-3 *:group *:relative *:transition-colors *:overflow-hidden *:rounded-2xl *:bg-background/40 *:border *:p-3">
        <ScreenCategory
          category="search"
          name="Search"
          className="aspect-square"
          count={0}
          covers={[{ aspectRatio: "9/16" }, { aspectRatio: "9/16" }]}
        />

        <ScreenCategory
          category="profile"
          name="Profile"
          className="aspect-square"
          count={0}
          covers={[{ aspectRatio: "9/16" }, { aspectRatio: "9/16" }]}
        />

        <ScreenCategory
          category="checkout"
          name="Checkout"
          className="aspect-square"
          count={0}
          covers={[{ aspectRatio: "9/16" }, { aspectRatio: "9/16" }]}
        />

        <ScreenCategory
          category="settings"
          name="Settings"
          className="aspect-square"
          count={0}
          covers={[{ aspectRatio: "9/16" }, { aspectRatio: "9/16" }]}
        />
      </div>
    </section>
  );
};

export default Screens;
