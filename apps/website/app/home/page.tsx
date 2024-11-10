import Header from "./header"
import Footer from "./footer"

const page = () => {
  return (
    <main className="w-full flex flex-col gap-6">
      <Header />
      <div className="w-full h-dvh"></div>
      <Footer />
    </main>
  )
}
export default page
