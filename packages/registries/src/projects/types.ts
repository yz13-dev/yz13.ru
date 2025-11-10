import { Stack } from "../stack/types"





export type Project = {
  id: string
  name: string
  description: string
  stack: Stack[]
  pinned?: boolean
  url?: string
  attachment?: string[]
  contentId?: string
}
