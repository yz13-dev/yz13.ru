import { cn } from "yz13/cn";

const UiElements = () => {
  return (
    <section className="w-full space-y-3">
      <span className="text-sm text-secondary">UI Elements</span>
      <ul
        className={cn(
          "w-full h-fit flex items-start flex-wrap gap-1",
          "*:bg-yz-neutral-200 *:text-foreground/80 *:px-3 *:py-1 *:rounded-full *:text-sm",
        )}
      >
        <li className="hover:text-foreground transition-colors cursor-pointer">
          Button
        </li>
        <li className="hover:text-foreground transition-colors cursor-pointer">
          Input
        </li>
        <li className="hover:text-foreground transition-colors cursor-pointer">
          Card
        </li>
        <li className="hover:text-foreground transition-colors cursor-pointer">
          Badge
        </li>
        <li className="hover:text-foreground transition-colors cursor-pointer">
          Avatar
        </li>
      </ul>
    </section>
  );
};

export default UiElements;
