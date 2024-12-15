import { permanentRedirect } from "next/navigation"


const page = () => {
  return permanentRedirect("/workspace")
}

export default page
