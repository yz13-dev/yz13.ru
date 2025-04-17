import { cn } from "yz13/cn";

export const DockWidgets = ({ children }: { children?: React.ReactNode }) => {
  return <div className="absolute w-fit -top-9">{children}</div>;
};

const DockWrapper = ({
  children,
  className = "",
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "fixed left-0 right-0 mx-auto bottom-3",
        "bg-background-secondary/60 backdrop-blur border rounded-3xl",
        "h-fit w-fit p-1 max-w-dvw shrink-0 z-20",
        className,
      )}
    >
      <div className="relative flex flex-row items-center justify-center gap-1">
        {children}
      </div>
    </div>
  );
};

export default DockWrapper;
