import { Notes } from "@/types/widgets"
import Modal from "./modal"

const NotesModal = ({ index, note }: {
  note: Notes
  index: number
}) => {
  const notes = note.content.items
  const target = notes[index]
  return (
    <Modal>
      <div className="max-w-sm w-full rounded-xl h-96 bg-background border p-4">
        {target}
      </div>
    </Modal>
  )
}
export default NotesModal