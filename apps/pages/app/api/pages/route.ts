import { isDev } from "@/const/env";
import pagesJson from "@/pages.json";

export function GET(request: Request) {
  try {
    const publicPages = pagesJson.filter((page) => {
      if (isDev) return true;
      else return page.public;
    });
    return Response.json(publicPages);
  } catch (error) {
    return new Response(JSON.stringify({ details: "Something went wrong" }), {
      status: 500,
    });
  }
}
