"use client";

import { useDebounceEffect } from "ahooks";
import { Input } from "mono/components/input";
import { useRouter, useSearchParams } from "next/navigation";
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
  const searchParams = useSearchParams();
  const router = useRouter();
  const applyToSearchParams = (value?: string) => {
    if (!value) {
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.delete("search");
      router.replace(`?${newSearchParams.toString()}`);
    } else {
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set("search", value);
      router.push(`?${newSearchParams.toString()}`);
    }
  };
  useDebounceEffect(
    () => {
      if (value.length >= 2) applyToSearchParams(value);
      if (value.length === 0) applyToSearchParams();
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
