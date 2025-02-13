import { cn } from "yz13/cn";

const PageDockFiller = ({ className = "" }: { className?: string }) => {
  return <div className={cn("w-full h-24", className)} />;
};

export default PageDockFiller;
