"use client";

import { useDebounceEffect } from "ahooks";
import { Drawer, DrawerContent } from "mono/components/drawer";
import { useRouter } from "next/navigation";
import { useState } from "react";

const ModalWrapper = ({
  children,
  noRedirect = false,
}: {
  children: React.ReactNode;
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
      <DrawerContent className="space-y-6 *:px-6 pb-6 h-fit max-w-lg mx-auto overflow-y-auto after:hidden rounded-t-2xl">
        {children}
      </DrawerContent>
    </Drawer>
  );
};

export default ModalWrapper;
