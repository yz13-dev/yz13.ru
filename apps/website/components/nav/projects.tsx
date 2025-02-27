"use client";
import {
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "mono/components/navigation-menu";
import Link from "next/link";
import { cn } from "yz13/cn";

const Projects = () => {
  return (
    <NavigationMenuItem>
      <Link href="/projects" legacyBehavior passHref>
        <NavigationMenuLink
          className={cn(navigationMenuTriggerStyle(), "rounded-full")}
        >
          Проекты
        </NavigationMenuLink>
      </Link>
    </NavigationMenuItem>
  );
};

export default Projects;
