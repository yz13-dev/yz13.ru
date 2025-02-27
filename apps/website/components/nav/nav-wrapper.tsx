"use client";

import {
  NavigationMenu,
  NavigationMenuList,
} from "mono/components/navigation-menu";

const NavWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <NavigationMenu className="lg:flex hidden">
      <NavigationMenuList>{children}</NavigationMenuList>
    </NavigationMenu>
  );
};

export default NavWrapper;
