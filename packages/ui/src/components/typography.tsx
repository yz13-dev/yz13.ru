import { ComponentProps } from "react"
import { cn } from "../lib/utils"



type H1Props = ComponentProps<"h1">
export const H1 = ({ children, className = "", ...props }: H1Props) => (
  <h1 className={cn("scroll-m-20 text-4xl font-extrabold tracking-tight text-balance", className)} {...props} >{children}</h1>
)

type H2Props = ComponentProps<"h2">
export const H2 = ({ children, className = "", ...props }: H2Props) => (
  <h2 className={cn("scroll-m-20 text-3xl font-semibold tracking-tight", className)} {...props}>{children}</h2>
)

type H3Props = ComponentProps<"h3">
export const H3 = ({ children, className = "", ...props }: H3Props) => (
  <h3 className={cn("scroll-m-20 text-2xl font-semibold tracking-tight", className)} {...props}>{children}</h3>
)

type H4Props = ComponentProps<"h4">
export const H4 = ({ children, className = "", ...props }: H4Props) => (
  <h4 className={cn("scroll-m-20 text-xl font-semibold tracking-tight", className)} {...props}>{children}</h4>
)

type PProps = ComponentProps<"p">
export const P = ({ children, className = "", ...props }: PProps) => (
  <p className={cn("leading-7", className)} {...props}>{children}</p>
)

type BlockquoteProps = ComponentProps<"blockquote">
export const Blockquote = ({ children, className = "", ...props }: BlockquoteProps) => (
  <blockquote className={cn("mt-6 border-l-2 pl-6 italic", className)} {...props}>{children}</blockquote>
)

type CodeProps = ComponentProps<"code">
export const Code = ({ children, className = "", ...props }: CodeProps) => (
  <code className={cn("bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold", className)} {...props}>{children}</code>
)

type LeadProps = ComponentProps<"p">
export const Lead = ({ children, className = "", ...props }: LeadProps) => (
  <p className={cn("text-muted-foreground text-xl", className)} {...props}>{children}</p>
)

type LargeTextProps = ComponentProps<"p">
export const LargeText = ({ children, className = "", ...props }: LargeTextProps) => (
  <p className={cn("text-lg font-semibold", className)} {...props}>{children}</p>
)

type SmallTextProps = ComponentProps<"p">
export const SmallText = ({ children, className = "", ...props }: SmallTextProps) => (
  <p className={cn("text-sm leading-none font-medium", className)} {...props}>{children}</p>
)

type MutedProps = ComponentProps<"p">
export const Muted = ({ children, className = "", ...props }: MutedProps) => (
  <p className={cn("text-muted-foreground text-sm", className)} {...props}>{children}</p>
)
