"use client";
import { contries, CountryCode } from "@/const/locale-to-country";
import { setLocaleCookie } from "@/lib/locale";
import { cn } from "@yz13/ui/cn";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@yz13/ui/components/dropdown-menu";
import { CheckIcon, ChevronDownIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { ReactNode, useState } from "react";

type Props = {
  children?: ReactNode;
  country?: string;
};
export default function ({ children, country = "EN" }: Props) {
  const [open, setOpen] = useState<boolean>(false);
  const keys = Object.keys(contries);
  const router = useRouter();
  const changeCountryCode = (code: CountryCode) => {
    setLocaleCookie(code);
    router.refresh();
  };
  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger className="flex items-center gap-2">
        {children}
        <ChevronDownIcon
          className={cn(
            "transition-transform lg:size-5 size-4 text-muted-foreground",
            open && "rotate-180",
          )}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {keys.map((key, index) => {
          const label = contries[key as keyof typeof contries];
          const isSelected = country === key;
          return (
            <DropdownMenuItem
              key={key}
              onClick={() => changeCountryCode(key as CountryCode)}
            >
              {label}
              {isSelected && (
                <CheckIcon
                  size={16}
                  className="ml-auto text-muted-foreground"
                />
              )}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
