import { cn } from "yz13/cn";

const Footer = ({ className = "" }: { className?: string }) => {
  return (
    <footer
      className={cn("w-full flex flex-col items-center gap-y-6", className)}
    >
      <div className="w-full flex items-center justify-between">
        <span className="text-xs text-muted-foreground">© 2025 YZ13</span>
        <span className="text-xs text-muted-foreground">
          Фронтенд разработчик, YZ13
        </span>
      </div>
    </footer>
  );
};

export default Footer;
