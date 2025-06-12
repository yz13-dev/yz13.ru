"use client";
import { cn } from "@yz13/ui/cn";
import {
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@yz13/ui/components/navigation-menu";
import Link from "next/link";

const Projects = () => {
  return (
    <NavigationMenuItem>
      <Link href="/projects" legacyBehavior passHref>
        <NavigationMenuLink
          className={cn(
            navigationMenuTriggerStyle(),
            "rounded-full bg-background/50",
          )}
        >
          Проекты
        </NavigationMenuLink>
      </Link>
    </NavigationMenuItem>
  );
};

export default Projects;
