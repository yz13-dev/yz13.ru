import { cn } from "yz13/cn"


const ContentSection = ({ className = "" }: { className?: string }) => {
  return (
    <div className="w-full mx-auto space-y-14 max-w-screen-xl p-8">
      <WorksSection>
      </WorksSection>
      <EventsSection>
      </EventsSection>
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
    </SectionWrapper>
  )
}

const EventsSection = () => {
  return (
    <SectionWrapper>
      <div className="w-full h-[80dvh] flex items-center justify-between">
        <div className="w-1/2 h-full space-y-3">
          <span className="text-2xl font-semibold">Some</span>
          <div className="w-full grid grid-cols-7 gap-4 grid-rows-5">
            <div className="row-start-1 w-full aspect-square bg-yz-neutral-100 rounded-xl"></div>
            <div className="row-start-2 w-full aspect-square bg-yz-neutral-100 rounded-xl"></div>
            <div className="row-start-3 w-full aspect-square bg-yz-neutral-100 rounded-xl"></div>
            <div className="row-start-4 w-full aspect-square bg-yz-neutral-100 rounded-xl"></div>
            <div className="row-start-5 w-full aspect-square bg-yz-neutral-100 rounded-xl"></div>
          </div>
        </div>
        <div className="w-1/2 h-full space-y-3">
          <span className="text-2xl font-semibold">Some</span>
        </div>
      </div>
    </SectionWrapper>
  )
}

export default ContentSection
