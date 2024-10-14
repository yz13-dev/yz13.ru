import { cn } from "yz13/cn"

type ContainerProps = {
  className?: string
  children?: React.ReactNode
}
const Container = ({ children, className = "" }: ContainerProps) => {
  return (
    <main className={cn(
      "w-full h-fit flex",
      "md:!p-6 p-3 md:!gap-6 gap-3",
      className
    )}>
      {children}
    </main>
  )
}
export { Container }
