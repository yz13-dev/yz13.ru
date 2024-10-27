import action from "@/actions/works/action"
import { AppSidebar } from "@/components/sidebar/sidebar"

const page = async () => {
  const works = await action({})
  const data = works?.data ?? []
  return (
    <>
      <AppSidebar />
      <main className="w-full h-dvh p-6">
        <div className="max-w-lg w-full">
          <ul>
            {
              data.map(work => {
                return <li>Work {work.id}</li>
              })
            }
          </ul>
        </div>
      </main>
    </>
  )
}

export default page
