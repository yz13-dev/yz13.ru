import { cn } from "yz13/cn"

type ContentProps = {
  className?: string
  children?: React.ReactNode
}
const Content = ({ children, className = "" }: ContentProps) => {
  return (
    <div
      className={cn(
        "w-full h-fit flex flex-col gap-6 max-w-2xl mr-auto",
        className
      )}
    >
      {children}
    </div>
  )
}
export { Content }
