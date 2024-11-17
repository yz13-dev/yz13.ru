import { ArrowRightIcon } from "lucide-react"
import { Button } from "mono/components/button"
import Footer from "./footer"
import Header from "./header"

const page = () => {
  return (
    <main className="w-full flex flex-col gap-6">
      <Header />
      <div className="w-full max-w-5xl mx-auto px-6 h-[70dvh] flex gap-6 flex-col items-center justify-center">
        <h1 className="text-7xl font-bold text-foreground ">
          I'm YZ13, a developer.
        </h1>
        <p className="text-secondary text-3xl ">
          Just building stuff
        </p>
        <div className="flex items-center gap-2">
          <Button variant="secondary">Works</Button>
          <Button size="icon" variant="secondary"><ArrowRightIcon size={16} /></Button>
        </div>
      </div>
      <div className="w-full max-w-5xl mx-auto px-6 h-fit flex gap-6  flex-col">
        <p className="text-xl font-medium">Whay i build?</p>
        <ul className="w-full h-fit grid grid-cols-4 gap-4">
          <Button className="w-full h-12" variant="secondary">Websites</Button>
          <Button className="w-full h-12" variant="secondary">Apps</Button>
          <Button className="w-full h-12" variant="secondary">Components</Button>
          <Button className="w-full h-12" variant="secondary">Packages</Button>
        </ul>
      </div>
      <div className="w-full max-w-5xl mx-auto px-6 h-[40dvh] flex gap-6 flex-col items-center justify-center">
        <span className="text-sm text-center ">New updates soon</span>
      </div>
      <Footer />
    </main>
  )
}
export default page
