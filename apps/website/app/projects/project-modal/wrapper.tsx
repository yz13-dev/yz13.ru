"use client";

import { Dialog, DialogContent } from "mono/components/dialog";
import { useRouter } from "next/navigation";
import { cn } from "yz13/cn";

const ModalWrapper = ({
  children,
  className = "",
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  const router = useRouter();
  return (
    <Dialog
      defaultOpen={true}
      onOpenChange={(open) => {
        if (!open) router.replace("/projects");
      }}
    >
      <DialogContent
        className={cn(
          "p-4 rounded-2xl max-w-lg border bg-background space-y-4",
          className,
        )}
      >
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default ModalWrapper;
