import { cn } from "@yz13/ui/cn";
import { motion } from "motion/react";
import { ReactNode } from "react";

const MenuWrapper = ({
  children,
  className = "",
}: {
  children?: ReactNode;
  className?: string;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25, width: "75%" }}
      animate={{ opacity: 1, y: 0, width: "100%" }}
      exit={{ opacity: 0, y: 25, width: "75%" }}
      transition={{ delay: 0.1, duration: 0.4, type: "spring" }}
      className={cn(
        "max-w-md h-fit flex flex-col justify-between gap-2 p-2",
        "rounded-2xl z-20 bg-background absolute left-0 right-0 mx-auto bottom-20 border",
        className,
      )}
    >
      {children}
    </motion.div>
  );
};

export default MenuWrapper;
