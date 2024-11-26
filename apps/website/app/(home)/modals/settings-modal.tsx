import { Button } from "mono/components/button"
import Modal from "./modal"


const ModalTrigger = ({ children, className = "", size = "sm", variant = "secondary" }: { children?: React.ReactNode, variant?: string, size?: string, className?: string }) => {
  return (
    <Button variant={variant} size={size} className={className}>
      {children}
    </Button>
  )
}

const SettingsModal = () => {
  return (
    <Modal>
      <div className="max-w-sm w-full rounded-xl h-96 bg-background border p-4">
      </div>
    </Modal>
  )
}
export default SettingsModal