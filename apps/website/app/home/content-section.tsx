import RoadMap from "../road-map"


const ContentSection = ({ className = "" }: { className?: string }) => {
  return (
    <div className="max-w-screen-xl w-full mx-auto">
      <div className="w-full space-y-8 lg:px-12 px-6">
        <h2 className="text-2xl font-semibold">Projects</h2>
        <RoadMap className="grid-cols-3" />
      </div>
      <footer className="my-14 w-full px-12 mt-14 flex items-center justify-between">
        <span className="text-xs text-secondary">@YZ13</span>
        <span className="text-xs text-secondary">2024</span>
      </footer>
    </div>
  )
}
export default ContentSection
