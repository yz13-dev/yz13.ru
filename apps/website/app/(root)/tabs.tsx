"use client"
import { Tabs, TabsList, TabsTrigger } from "mono/components/tabs"
import Link from "next/link"
import { usePathname } from "next/navigation"

type Nav = {
  label: string
  href: string
}
const defaultNav: Nav = {
  label: "Главная",
  href: "/"
}
const nav: Nav[] = [
  defaultNav,
]

export default function NavTabs() {
  const toLink = (href: string) => {
    if (href === "/") return href
    else return `/${href}`
  }
  const pathname = usePathname()
  return (
    <Tabs defaultValue={toLink(defaultNav.href)} value={pathname}>
      <TabsList>
        {
          nav.map((item, index) => (
            <TabsTrigger key={index} value={toLink(item.href)} asChild>
              <Link href={item.href}>
                {item.label}
              </Link>
            </TabsTrigger>
          ))
        }
      </TabsList>
    </Tabs>
  )
}
