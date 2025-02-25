import { cn } from "yz13/cn";

const PagesGrid = ({
  children,
  className = "",
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "w-full grid lg:!grid-cols-4 sm:!grid-cols-2 grid-cols-1 gap-4",
        className,
      )}
    >
      {children}
    </div>
  );
};

export default PagesGrid;
