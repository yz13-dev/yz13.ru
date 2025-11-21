"use client";
import { Button } from "@yz13/ui/button";
import { ButtonGroup } from "@yz13/ui/button-group";
import { cn } from "@yz13/ui/cn";
import { BriefcaseBusinessIcon, FolderIcon } from "@yz13/ui/icons";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function ProjectsWorksSwitcher() {
  const pathname = usePathname();

  const [hovered, setHovered] = useState<string | null>(null);

  const isProjectsActive =
    pathname.startsWith("/projects") || hovered === "projects";
  const isWorksActive = pathname.startsWith("/works") || hovered === "works";

  return (
    <ButtonGroup className="*:h-10 *:text-base">
      <Button
        variant="outline"
        asChild
        onPointerEnter={() => setHovered("projects")}
        onPointerLeave={() => setHovered(null)}
      >
        <Link href="/projects">
          <FolderIcon />
          <AnimatePresence>
            {isProjectsActive && (
              <motion.span
                className={cn(
                  "lg:inline hidden",
                  hovered === "works" && "text-muted-foreground",
                )}
                initial={{ opacity: 0, width: 0, filter: "blur(10px)" }}
                animate={{ opacity: 1, width: "auto", filter: "blur(0px)" }}
                exit={{ opacity: 0, width: 0, filter: "blur(10px)" }}
              >
                Проекты
              </motion.span>
            )}
          </AnimatePresence>
        </Link>
      </Button>
      <Button
        variant="outline"
        asChild
        onPointerEnter={() => setHovered("works")}
        onPointerLeave={() => setHovered(null)}
      >
        <Link href="/works">
          <BriefcaseBusinessIcon />
          <AnimatePresence>
            {isWorksActive && (
              <motion.span
                className={cn(
                  "lg:inline hidden",
                  hovered === "projects" && "text-muted-foreground",
                )}
                initial={{ opacity: 0, width: 0, filter: "blur(10px)" }}
                animate={{ opacity: 1, width: "auto", filter: "blur(0px)" }}
                exit={{ opacity: 0, width: 0, filter: "blur(10px)" }}
              >
                Работы
              </motion.span>
            )}
          </AnimatePresence>
        </Link>
      </Button>
    </ButtonGroup>
  );
}
