import { isDev } from "@/const/env";
import pagesJson from "@/pages.json";

type RouteProps = {
  params: {
    id: string;
  };
};
export function GET(request: Request, { params }: RouteProps) {
  try {
    const publicPages = pagesJson.filter((page) => {
      if (isDev) return true;
      else return page.public;
    });
    const page = publicPages.find((page) => page.id === params.id);
    if (!page) return Response.json(null);
    else return Response.json(page);
  } catch (error) {
    return new Response(JSON.stringify({ details: "Something went wrong" }), {
      status: 500,
    });
  }
}
