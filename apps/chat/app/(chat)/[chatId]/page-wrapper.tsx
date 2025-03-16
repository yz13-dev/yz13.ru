import { cn } from "yz13/cn";

const PageWrapper = ({
  children,
  className = "",
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "w-full md:max-w-[calc(100%-68px)] max-w-[calc(100%-52px)] min-h-[calc(100dvh-56px-126px)]",
        className,
      )}
    >
      {children}
    </div>
  );
};

export default PageWrapper;
