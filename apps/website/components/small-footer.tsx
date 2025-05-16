import { cn } from "yz13/cn";
import SocialLinks from "./social-links";

const Footer = ({ className = "" }: { className?: string }) => {
  return (
    <footer
      className={cn("w-full flex flex-col items-center gap-y-6", className)}
    >
      <div className="w-full flex items-center justify-between">
        <span className="text-xs text-muted-foreground">© 2025 YZ13</span>
        <div className="flex items-center gap-2">
          <SocialLinks />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
