import { cn } from "yz13/cn";

type ColumnProps = {
  children?: React.ReactNode;
  className?: string;
};
const Column = ({ children, className = "" }: ColumnProps) => {
  // <div className="w-full divide-y h-full flex md:!col-span-1 col-span-full flex-col gap-3 *:overflow-hidden *:transition-colors">
  return (
    <div
      className={cn(
        "w-full h-full flex flex-col items-center relative overflow-hidden *:transition-colors",
        className,
      )}
    >
      {children}
    </div>
  );
};

export default Column;
