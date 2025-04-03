"use client";

import {
  NavigationMenu,
  NavigationMenuList,
} from "mono/components/navigation-menu";
import { cn } from "yz13/cn";

const NavWrapper = ({
  children,
  className = "",
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <NavigationMenu className={cn("lg:flex hidden", className)}>
      <NavigationMenuList>{children}</NavigationMenuList>
    </NavigationMenu>
  );
};

export default NavWrapper;
