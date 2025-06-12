"use client";
import { cn } from "@yz13/ui/cn";
import {
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@yz13/ui/components/navigation-menu";
import Link from "next/link";

const Blog = () => {
  return (
    <NavigationMenuItem>
      <Link href="/blog" legacyBehavior passHref>
        <NavigationMenuLink
          className={cn(
            navigationMenuTriggerStyle(),
            "rounded-full bg-background/50",
          )}
        >
          Блог
        </NavigationMenuLink>
      </Link>
    </NavigationMenuItem>
  );
};

export default Blog;
