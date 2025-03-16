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
        "w-full md:max-w-[calc(100dvw-68px)] max-w-[calc(100dvw-52px)]",
        className,
      )}
    >
      {children}
    </div>
  );
};

export default PageWrapper;
