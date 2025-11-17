import { getLinksV1Id, postClicksV1Track } from "@yz13/api"
import { redirect } from "next/navigation"
import type { NextRequest } from "next/server"

export async function GET(req: NextRequest, ctx: RouteContext<"/to/[id]">) {

  const { id } = await ctx.params

  const link = await getLinksV1Id(id)

  if (!link) return redirect("/")

  const domain = link.to.startsWith("http") ? new URL(link.to).hostname : link.to
  const path = link.to.startsWith("http") ? new URL(link.to).pathname : link.to

  await postClicksV1Track({
    from: `/to/${id}`,
    domain,
    path
  })

  return redirect(link.to)
}
