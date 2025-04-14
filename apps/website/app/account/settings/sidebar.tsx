import Link from "next/link";
import { cn } from "yz13/cn";

const Sidebar = ({ className = "" }: { className?: string }) => {
  return (
    <aside className={cn("flex flex-col gap-2 w-72", className)}>
      <Link
        href="/account/settings/general"
        className="text-sm text-foreground hover:underline hover:text-foreground transition-colors"
      >
        Общие
      </Link>
    </aside>
  );
};

export default Sidebar;
