"use client";

import { CompassIcon, LayersIcon } from "lucide-react";
import { buttonVariants } from "mono/components/button";
import { easeInOut, motion } from "motion/react";
import { usePathname, useRouter } from "next/navigation";
import { startTransition } from "react";
import { cn } from "yz13/cn";

const nav = [
  { name: "Обзор", href: "/discover", icon: CompassIcon },
  { name: "Работы", href: "/library", icon: LayersIcon },
  // { name: "Services", href: "/services", icon: FolderIcon },
];

const Nav = () => {
  const pathname = usePathname();
  const router = useRouter();
  const transition = (href: string) => {
    if (pathname === href) return;
    else {
      startTransition(() => {
        router.push(href);
      });
    }
  };
  return (
    <nav className="flex items-center gap-2">
      {nav.map((item, index) => (
        <motion.button
          key={index}
          className={cn(
            buttonVariants({
              variant: pathname === item.href ? "default" : "secondary",
              size: "default",
              className: "gap-2",
              rounded: "full",
            }),
          )}
          initial={{ width: 48 }}
          animate={pathname === item.href ? { width: 110 } : { width: 48 }}
          exit={{ width: 48 }}
          onClick={() => transition(item.href)}
        >
          <item.icon className="shrink-0" size={16} />
          {pathname === item.href && (
            <motion.span
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ delay: 0.1, type: "spring", ease: easeInOut }}
            >
              {item.name}
            </motion.span>
          )}
        </motion.button>
      ))}
    </nav>
  );
};

export default Nav;
