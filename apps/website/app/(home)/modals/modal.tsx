import { cn } from "yz13/cn"



const Modal = ({ children, className = "" }: { children?: React.ReactNode, className?: string }) => {
  return (
    <div
      className={cn(
        "fixed z-50 -top-12 left-0 w-full inset-0 h-full bg-background/80 flex items-center justify-center",
        className
      )}
    >
      {children}
    </div>
  )
}
export default Modal