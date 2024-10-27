
type Work = {
  id: string
  name: string
  description: string
  createdAt: string
  updatedAt: string
}

type HeadingElement = {
  code: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
  text: string
}
type ParagraphElement = {
  code: "p"
  text: string
}
type ListElement = {
  code: "ul" | "ol"
  items: ListItemElement | CheckboxListItemElement[]
}
type ListItemElement = {
  code: "li"
  text: string
}
type CheckboxListItemElement = {
  code: "li-checkbox"
  text: string
  checked: boolean
}

type WorkElement = {
  id: string
  createdAt: string
  updatedAt: string
  workId: string
} & (HeadingElement | ParagraphElement | ListElement)

export type { Work, WorkElement }
