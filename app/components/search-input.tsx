"use client";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "@yz13/ui/input-group";
import { ArrowRightIcon, SearchIcon } from "lucide-react";
import { useState } from "react";




export default function () {

  const [text, setText] = useState<string>("");

  return (
    <div className="shrink-0 rounded-xl w-full h-14">
      <InputGroup className="w-full h-14 *:shrink-0 *:h-full !text-xl font-medium rounded-xl shadow-none">
        <InputGroupInput
          placeholder="Поиск внутри YZ13"
          className="size-full !text-xl font-medium rounded-xl shadow-none px-4"
          value={text}
          onChange={e => setText(e.target.value)}
        />
        <InputGroupAddon className="pl-4 pr-2 py-2 h-full">
          <SearchIcon className="size-6" />
        </InputGroupAddon>
        {
          !!text.length &&
          <InputGroupAddon align="inline-end" className="px-4 py-2 h-full">
            <InputGroupButton variant="secondary" className="h-full !shrink aspect-square"><ArrowRightIcon className="size-4" /></InputGroupButton>
          </InputGroupAddon>
        }
      </InputGroup>
    </div>
  )
}
