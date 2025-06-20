import { cn } from "@yz13/ui/cn";
import { Suspense } from "react";
import { Logo } from "../logo";
import Projects, { ProjectsSkeleton } from "./projects";
import Socials from "./socials";

const Footer = ({ className = "" }: { className?: string }) => {
  return (
    <footer className={cn("w-full h-fit gap-3 grid grid-cols-1 md:grid-cols-3", className)}>
      <div className="grid lg:grid-cols-3 grid-cols-2 gap-3 col-span-2">
        <Socials />
        <Suspense fallback={<ProjectsSkeleton />}>
          <Projects />
        </Suspense>
      </div>
      <div className="flex items-start justify-end">
        <Logo size={36} />
      </div>
    </footer>
  );
};
export default Footer;
