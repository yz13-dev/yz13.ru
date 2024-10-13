import { BookUserIcon, CodeIcon, FolderCodeIcon, FolderIcon, GlobeIcon, HomeIcon, LucideIcon, NotebookTabsIcon, SettingsIcon, SparklesIcon, StickerIcon } from "lucide-react"

export type NavItem = {
  id: string
  type: "item"
  label: string
  path: string
  icon: LucideIcon
  items: NavItem[]
}
export type NavGroup = {
  type: "group"
  id: string
  groupTitle: string
  groupId: string
  label: string
  path: string
  icon: LucideIcon
  max?: number
  items: NavItem[]
}
export type Nav = NavItem | NavGroup
export type Separator = {
  type: "separator"
}
export type NavMap = Nav | Separator

export const navMap: NavMap[] = [
  {
    id: "nav.home",
    type: "item",
    label: "Home",
    icon: HomeIcon,
    path: "/home",
    items: []
  },
  {
    id: "nav.workspace",
    type: "item",
    label: "Workspace",
    icon: FolderIcon,
    path: "/workspace",
    items: []
  }
]
