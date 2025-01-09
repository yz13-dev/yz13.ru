import { cn } from "yz13/cn";

const elements = ["Button", "Input", "Card", "Badge", "Avatar"];

const UiElements = () => {
  return (
    <section className="w-full space-y-3">
      <span className="text-sm text-secondary">UI Элементы</span>
      <ul
        className={cn(
          "w-full h-fit flex items-start flex-wrap gap-1",
          "*:bg-yz-neutral-200 *:text-foreground/80 *:px-3 *:py-1 *:rounded-full *:text-sm",
        )}
      >
        {elements.length ? (
          elements.map((element) => (
            <li
              key={element}
              className="hover:text-foreground transition-colors cursor-pointer"
            >
              {element}
            </li>
          ))
        ) : (
          <span className="text-secondary">No UI Elements yet</span>
        )}
      </ul>
    </section>
  );
};

export default UiElements;
