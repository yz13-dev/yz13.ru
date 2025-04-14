import MiniFooter from "@/components/small-footer";
import { cn } from "yz13/cn";
import SVGLogo from "./logo";

const Footer = ({ className = "" }: { className?: string }) => {
  return (
    <footer
      className={cn(
        "w-full h-fit space-y-6",
        className,
      )}
    >
      <MiniFooter className="yz-future-padding-x yz-future-padding-y" />
      <div className="w-full overflow-hidden">
        <SVGLogo className="w-full scale-125 relative" />
      </div>
    </footer>
  );
};
export default Footer;
