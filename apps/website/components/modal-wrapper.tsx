"use client";

import { cn } from "@yz13/ui/cn";
import { useDebounceEffect } from "ahooks";
import { Drawer, DrawerContent } from "@yz13/ui/components/drawer";
import { useRouter } from "next/navigation";
import { useState } from "react";

const ModalWrapper = ({
  className = "",
  children,
  noRedirect = false,
}: {
  className?: string;
  children?: React.ReactNode;
  noRedirect?: boolean;
}) => {
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(true);
  useDebounceEffect(
    () => {
      if (!open) setOpen(true);
    },
    [open],
    { wait: 1000 },
  );
  return (
    <Drawer
      defaultOpen
      open={open}
      onOpenChange={setOpen}
      onClose={() => {
        if (!noRedirect) router.back();
      }}
    >
      <DrawerContent
        className={cn(
          "h-fit max-w-lg left-0 right-0 mx-auto overflow-y-auto after:hidden rounded-t-2xl",
          "pt-6",
          className,
        )}
      >
        {children}
      </DrawerContent>
    </Drawer>
  );
};

export default ModalWrapper;
