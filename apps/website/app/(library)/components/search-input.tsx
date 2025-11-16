"use client";

import { SearchIcon } from "@yz13/ui/icons";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@yz13/ui/input-group";
import { useQueryState } from "nuqs";

export default function SearchInput() {

  const [q, setQ] = useQueryState("q", { shallow: false })

  return (
    <InputGroup className="max-w-sm bg-card">
      <InputGroupInput
        placeholder="Начните вводить..."
        value={q || ""}
        onChange={e => setQ(e.target.value)}
      />
      <InputGroupAddon>
        <SearchIcon />
      </InputGroupAddon>
    </InputGroup>
  )
}
