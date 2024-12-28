"use client";
import {
  ArrowRightLeftIcon,
  Banknote,
  CheckIcon,
  ChevronDown,
  MousePointer2Icon,
  VaultIcon,
} from "lucide-react";
import { Button } from "mono/components/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "mono/components/popover";
import { ReactNode, useState } from "react";
import { cn } from "yz13/cn";
import icons from "./icons";
import { NodeType } from "./node-types";

const vaults: { type: NodeType }[] = [
  {
    type: "account",
  },
  // {
  //   type: "savings",
  // },
  // {
  //   type: "investments",
  // },
];
const expenses: { type: NodeType }[] = [
  {
    type: "payment",
  },
];

type SelectorProps = {
  children: ReactNode;
  list?: { type: NodeType }[];
  value?: NodeType;
  onValueChange?: (value: NodeType) => void;
};

const DockSelector = ({
  children,
  list = [],
  onValueChange,
  value,
}: SelectorProps) => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="h-10 gap-2 p-2">
          {children}
          <ChevronDown
            size={16}
            className={cn("transition-transform", open && "rotate-180")}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-56 space-y-2 rounded-xl p-2"
        side="top"
        sideOffset={12}
      >
        {list.map((item, index) => {
          const type = item.type;
          if (!type) return;
          const Icon = icons[type];
          return (
            <div
              key={JSON.stringify(item) + index}
              onClick={() => {
                if (onValueChange) onValueChange(type);
              }}
              className="w-full flex items-center gap-2 h-8"
            >
              <div className="size-5 flex items-center justify-center">
                {value === item.type && <CheckIcon size={16} />}
              </div>
              <div className="size-5 flex items-center justify-center">
                <Icon size={18} />
              </div>
              <span className="text-sm">{item.type}</span>
            </div>
          );
        })}
      </PopoverContent>
    </Popover>
  );
};

const Dock = () => {
  const [vault, setVault] = useState<NodeType>("account");
  const [expense, setExpense] = useState<NodeType>("payment");
  return (
    <footer
      className={cn(
        "w-fit absolute bottom-6 left-0 right-0 mx-auto p-2",
        "border z-10 flex items-center gap-2 p-1 rounded-xl bg-background",
      )}
    >
      <Button variant="ghost" size="icon" className="size-10">
        <MousePointer2Icon size={24} />
      </Button>
      <Button variant="ghost" size="icon" className="size-10">
        <ArrowRightLeftIcon size={24} />
      </Button>
      <DockSelector list={vaults} value={vault} onValueChange={setVault}>
        <VaultIcon size={24} />
      </DockSelector>
      <DockSelector list={expenses} value={expense} onValueChange={setExpense}>
        <Banknote size={24} />
      </DockSelector>
    </footer>
  );
};

export default Dock;
