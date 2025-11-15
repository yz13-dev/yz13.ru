import type { ReactNode } from "react"
import type { IconProps } from "../icons/icon"




export type Stack = {
  id: string
  icon: (props?: IconProps) => ReactNode
  name: string
  source: string
  category: string
}
