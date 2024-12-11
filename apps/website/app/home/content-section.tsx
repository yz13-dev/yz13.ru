

const ContentSection = ({ className = "" }: { className?: string }) => {
  return (
    <div className="w-full mx-auto space-y-14 lg:px-20 px-12 py-8">
      <div className="w-full space-y-8">
        <h2 className="text-4xl font-semibold">Works</h2>
      </div>
      <footer className="w-full flex items-center justify-between">
        <span className="text-xs text-secondary">@YZ13</span>
        <span className="text-xs text-secondary">2024</span>
      </footer>
    </div>
  )
}
export default ContentSection
