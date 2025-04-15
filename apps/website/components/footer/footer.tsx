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
      <div className="w-full overflow-hidden relative">
        <SVGLogo className="w-full relative top-40" />
      </div>
    </footer>
  );
};
export default Footer;
