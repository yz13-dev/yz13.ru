import MiniFooter from "@/components/small-footer";
import { cn } from "@yz13/ui/cn";

const Footer = ({ className = "" }: { className?: string }) => {
  return (
    <footer className={cn("w-full h-fit space-y-6", className)}>
      <MiniFooter />
    </footer>
  );
};
export default Footer;
