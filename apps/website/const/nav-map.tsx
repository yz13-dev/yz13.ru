import { BookUserIcon, CodeIcon, FolderCodeIcon, FolderIcon, GlobeIcon, HomeIcon, LucideIcon, NotebookTabsIcon, SettingsIcon, SparklesIcon, StickerIcon } from "lucide-react"

export type NavItem = {
  id: string
  type: "item"
  label: string
  path: string
  icon: LucideIcon
}
export type NavGroup = {
  type: "group"
  id: string
  groupTitle: string
  groupId: string
  label: string
  path: string
  icon: LucideIcon
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
    label: "nav.home",
    path: "/home",
    icon: HomeIcon
  },
  {
    id: "nav.workspace",
    type: "item",
    label: "nav.workspace",
    icon: FolderIcon,
    path: "/workspace",
  },
  {
    type: "group",
    id: "nav.works",
    groupTitle: "nav.works",
    groupId: "works",
    label: "nav.works",
    path: "/works",
    icon: FolderCodeIcon,
    items: [
      {
        id: "nav.works.codebase",
        type: "item",
        label: "nav.works.codebase",
        path: "/works/codebase",
        icon: CodeIcon,
      },
      {
        id: "nav.works.website",
        type: "item",
        label: "nav.works.website",
        path: "/works/website",
        icon: GlobeIcon,
      },
    ],
  },
  {
    id: "nav.journal",
    type: "item",
    label: "nav.journal",
    path: "/journal",
    icon: StickerIcon,
  },
  {
    id: "nav.inspiration",
    type: "item",
    label: "nav.inspiration",
    path: "/inspiration",
    icon: SparklesIcon,
  },
  {
    id: "nav.team",
    type: "item",
    label: "nav.team",
    path: "/team",
    icon: BookUserIcon,
  },
  {
    id: "nav.changelog",
    type: "item",
    label: "nav.changelog",
    path: "/changelog",
    icon: NotebookTabsIcon,
  },
  {
    id: "nav.settings",
    type: "item",
    label: "nav.settings",
    path: "/settings",
    icon: SettingsIcon,
  },
]