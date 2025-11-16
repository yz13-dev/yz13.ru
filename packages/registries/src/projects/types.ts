import { Stack } from "../stack/types";





export type Project = {
  id: string
  type: "project" | "work"
  date: string
  name: string
  description: string
  stack: Stack[]
  pinned?: boolean
  url?: string
  attachment?: string[]
  contentId?: string
  logo?: {
    // is simple url, or themed logo with dark and light versions, for themed better use png's without background
    url?: string
    theme?: {
      light: string,
      dark: string
    }
  }
}
