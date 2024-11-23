import { Notes } from "@/types/widgets"

const NotesModal = ({ index, note }: {
  note: Notes
  index: number
}) => {
  const notes = note.content.items
  const target = notes[index]
  return (
    <div className="fixed z-50 -top-12 left-0 w-full inset-0 h-full bg-background/80 flex items-center justify-center">
      <div className="max-w-sm w-full rounded-xl h-96 bg-background border p-4">
        {target}
      </div>
    </div>
  )
}
export default NotesModal