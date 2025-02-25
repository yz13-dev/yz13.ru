"use client";

import { useDebounceEffect } from "ahooks";
import { Input } from "mono/components/input";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { cn } from "yz13/cn";

type InputProps = {
  placeholder?: string;
  className?: string;
  defaultValue?: string;
};
const SearchInput = ({
  placeholder = "Поиск по проектам",
  className,
  defaultValue,
}: InputProps) => {
  const [value, setValue] = useState<string>(defaultValue || "");
  const router = useRouter();
  const applyToSearchParams = (value: string) => {
    if (!value) {
      router.push("/");
    } else {
      const searchParams = new URLSearchParams();
      searchParams.set("search", value);
      router.push(`?${searchParams.toString()}`);
    }
  };
  useDebounceEffect(
    () => {
      if (value.length >= 2) applyToSearchParams(value);
      if (value.length === 0) router.push("/");
    },
    [value, setValue],
    { wait: 500 },
  );
  return (
    <Input
      placeholder={placeholder}
      className={cn("w-full h-11 text-base", className)}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

export default SearchInput;
