import { cn } from "yz13/cn"

const ContentSection = ({ className = "" }: { className?: string }) => {
  return (
    <div className="w-full mx-auto space-y-14 max-w-screen-xl p-8">
      <WorksSection />
      <footer className="w-full flex items-center justify-between">
        <span className="text-xs text-secondary">@YZ13</span>
        <span className="text-xs text-secondary">2024</span>
      </footer>
    </div>
  )
}

const SectionWrapper = ({ children, className = "" }: { children?: React.ReactNode, className?: string }) => {
  return (
    <div className={cn("w-full space-y-8", className)}>
      {children}
    </div>
  )
}

const WorksSection = () => {
  return (
    <SectionWrapper>
      <h2 className="text-4xl font-semibold">Works</h2>
      <div className="w-full grid xl:!grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4 auto-rows-auto">
        <div className="w-full aspect-[4/3] rounded-lg border"></div>
        <div className="w-full aspect-[4/3] rounded-lg border"></div>
        <div className="w-full aspect-[4/3] rounded-lg border"></div>
        <div className="w-full aspect-[4/3] rounded-lg border"></div>
        <div className="w-full aspect-[4/3] rounded-lg border"></div>
        <div className="w-full aspect-[4/3] rounded-lg border"></div>
        <div className="w-full aspect-[4/3] rounded-lg border"></div>
        <div className="w-full aspect-[4/3] rounded-lg border"></div>
      </div>
    </SectionWrapper>
  )
}

export default ContentSection
