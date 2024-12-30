"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "mono/components/dialog";
import { Drawer, DrawerContent } from "mono/components/drawer";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";

const Modal = ({
  className = "",
  children,
  onClose,
}: {
  className?: string;
  children?: React.ReactNode;
  onClose?: () => void;
}) => {
  const isDesktop = useMediaQuery({
    query: "(min-width: 1224px)",
  });
  const [open, setOpen] = useState(true);
  const handleChange = (open: boolean) => {
    setOpen(open);
    if (open === false) {
      setTimeout(() => {
        onClose && onClose();
      }, 100);
    }
  };
  if (!isDesktop)
    return (
      <Drawer open={open} onOpenChange={handleChange}>
        <DrawerContent className={className}>{children}</DrawerContent>
      </Drawer>
    );
  return (
    <Dialog open={open} onOpenChange={handleChange}>
      <DialogContent className={className}>
        <DialogTitle className="sr-only" />
        <DialogDescription className="sr-only" />
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
