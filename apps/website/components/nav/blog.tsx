"use client";
import {
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "mono/components/navigation-menu";
import Link from "next/link";
import { cn } from "yz13/cn";

const Blog = () => {
  return (
    <NavigationMenuItem>
      <Link href="/blog" legacyBehavior passHref>
        <NavigationMenuLink
          className={cn(navigationMenuTriggerStyle(), "rounded-full")}
        >
          Блог
        </NavigationMenuLink>
      </Link>
    </NavigationMenuItem>
  );
};

export default Blog;
