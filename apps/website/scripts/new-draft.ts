import { format } from "date-fns"
import { writeFile } from "fs/promises"




const newDraft = async () => {
  try {
    const today = new Date()
    const content = `
  ---
  title: "New draft"
  summary: "This is new draft!"
  categories: ["draft"]
  date: "${format(today, "yyyy-MM-dd")}"
  authors: []
  ---

  # New draft
  `.trimStart()
    const file = "./drafts/new-draft.md"

    await writeFile(file, content)

    console.log("New draft created!")

  } catch (error) {
    console.log(error)
  }
}

newDraft()
