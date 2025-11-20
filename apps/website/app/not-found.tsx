"use client"
import { Button } from "@yz13/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import CommandBlock from "./(projects)/cli/components/command-block";



export default function NotFound() {

  const pathname = usePathname();

  return (
    <>
      <CommandBlock command="whoami">
        <span className="text-sm block">yz13</span>
      </CommandBlock>
      <CommandBlock command={pathname}>
        <span className="text-sm block">404</span>

        <Button variant="link" className="px-0" asChild><Link href="/">Вернуться</Link></Button>
      </CommandBlock>
    </>
  )
}
