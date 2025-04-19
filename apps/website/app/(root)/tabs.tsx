"use client";
import { Tabs, TabsList, TabsTrigger } from "mono/components/tabs";
import { useState } from "react";

type Nav = {
  label: string;
  href: string;
};
const defaultNav: Nav = {
  label: "Главная",
  href: "/",
};
const nav: Nav[] = [
  defaultNav,
  {
    label: "Блог",
    href: "/blog",
  },
];

const toLink = (href: string) => {
  if (href === "/") return href;
  else return `/${href}`;
};

type NavTabsProps = {
  children: React.ReactNode;
  className?: string;
};

export function TabsWrapper({ children, className = "" }: NavTabsProps) {
  const [tab, setTab] = useState(defaultNav.href);
  return (
    <Tabs
      defaultValue={toLink(defaultNav.href)}
      value={tab}
      onValueChange={setTab}
      className={className}
    >
      {children}
    </Tabs>
  );
}
export default function NavTabs() {
  return (
    <TabsList>
      {nav.map((item, index) => (
        <TabsTrigger key={index} value={item.href}>
          {item.label}
        </TabsTrigger>
      ))}
    </TabsList>
  );
}
