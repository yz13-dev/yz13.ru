"use client"

import { CompassIcon, LayersIcon } from "lucide-react"
import { buttonVariants } from "mono/components/button"
import { easeInOut, motion } from "motion/react"
import { usePathname, useRouter } from "next/navigation"
import { startTransition } from "react"
import { cn } from "yz13/cn"

const Nav = () => {
  const pathname = usePathname()
  const router = useRouter()
  const transition = (href: string) => {
    if (pathname === href) return
    else {
      startTransition(() => {
        router.push(href)
      })
    }
  }
  return (
    <nav className="flex items-center gap-2">
      <motion.button
        className={cn(
          buttonVariants({ variant: pathname === "/discover" ? "default" : "secondary", size: "default", className: "gap-2", rounded: "full" }),
        )}
        initial={{ width: 48 }}
        animate={
          pathname === "/discover"
            ? { width: 120 }
            : { width: 48 }
        }
        exit={{ width: 48 }}
        onClick={() => transition("/discover")}
      >
        <CompassIcon className="shrink-0" size={16} />
        {
          pathname === "/discover" &&
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ delay: 0.1, type: "spring", ease: easeInOut }}
          >
            Discover
          </motion.span>
        }
      </motion.button>
      <motion.button
        onClick={() => transition("/library")}
        initial={{ width: 48 }}
        animate={
          pathname === "/library"
            ? { width: 110 }
            : { width: 48 }
        }
        exit={{ width: 48 }}
        className={cn(
          buttonVariants({ variant: pathname === "/library" ? "default" : "secondary", size: "default", className: "gap-2", rounded: "full" }),
        )}
      >
        <LayersIcon className="shrink-0" size={16} />
        {
          pathname === "/library" &&
          <motion.span
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ delay: 0.1, type: "spring", ease: easeInOut }}
          >
            Library
          </motion.span>
        }
      </motion.button>
    </nav>
  )
}

export default Nav