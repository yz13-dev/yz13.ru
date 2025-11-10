import stacks from "../stack"




export const joinStack = (stack: string[]) => {
  if (stack.length === 0) return []
  return stack.map((id) => {
    const item = stacks.find(item => item.id === id)
    if (!item) return null
    return item
  })
    .filter(item => item !== null)
}
