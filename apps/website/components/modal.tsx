

const Modal = ({ children, onClose }: { children?: React.ReactNode, onClose?: () => void }) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/30 backdrop-blur-sm p-4 overflow-y-auto"
    >
      {children}
    </div>
  )
}

export default Modal