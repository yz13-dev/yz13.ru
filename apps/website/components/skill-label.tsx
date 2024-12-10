import { cn } from "yz13/cn"


const Label = ({ className = "", children }: { className?: string, children: React.ReactNode }) => {
  return (
    <span className={cn("text-xs px-2", className)}>
      {children}
    </span>
  )
}

const Scale = ({ max = 5, current = 0 }: { current?: number, max?: number }) => {
  return <span className="px-2 text-xs">{current}/{max}</span>
}
type SkillChildren = React.ReactElement<typeof Label> | React.ReactElement<typeof Scale> | (React.ReactElement<typeof Label> | React.ReactElement<typeof Scale>)[]
type SkillProps = {
  children: SkillChildren
} & React.HTMLAttributes<HTMLDivElement>
const Skill = ({ children, className = "", ...props }: SkillProps) => {
  return (
    <div className={cn(
      "hover:border-foreground hover:cursor-pointer transition-colors",
      "py-1 rounded-full border bg-background inline-flex items-center divide-x hover:bg-background",
      className
    )}
      {...props}
    >
      {children}
    </div>
  )
}

Skill.Label = Label
Skill.Scale = Scale
export { Skill }
