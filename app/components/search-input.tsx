"use client";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "@yz13/ui/input-group";
import { cn } from "@yz13/ui/utils";
import { ArrowRightIcon, SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { ComponentProps, useState } from "react";




type Props = ComponentProps<"div"> & {
  defaultQuery?: string;
};
export default function ({ className = "", defaultQuery = "", ...props }: Props) {

  const [text, setText] = useState<string>(defaultQuery);

  const router = useRouter();

  const search = (query: string) => {
    const encodedQuery = encodeURIComponent(query);
    const path = `/search?q=${encodedQuery}`
    router.push(path);
  }

  return (
    <div
      className={cn(
        "shrink-0 rounded-xl w-full h-14",
        className
      )}
      {...props}
    >
      <InputGroup className="w-full h-14 *:shrink-0 *:h-full !text-xl font-medium rounded-xl shadow-none">
        <InputGroupInput
          placeholder="Поиск внутри YZ13"
          className="size-full !text-xl font-medium rounded-xl shadow-none px-4"
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyDown={e => {
            if (e.key === "Enter" && text.length >= 2) search(text)
          }}
        />
        <InputGroupAddon className="pl-4 pr-2 py-2 h-full">
          <SearchIcon className="size-6" />
        </InputGroupAddon>
        {
          !!text.length &&
          <InputGroupAddon align="inline-end" className="px-4 py-2 h-full" onClick={() => search(text)}>
            <InputGroupButton variant="secondary" className="h-full !shrink aspect-square"><ArrowRightIcon className="size-4" /></InputGroupButton>
          </InputGroupAddon>
        }
      </InputGroup>
    </div>
  )
}
