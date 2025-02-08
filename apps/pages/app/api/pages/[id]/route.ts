import { parsePages } from "@/actions/parse-pages";

type RouteProps = {
  params: {
    id: string;
  };
};
export function GET(request: Request, { params }: RouteProps) {
  try {
    const pages = parsePages();
    const page = pages.find((page) => page.id === params.id);
    if (!page) return Response.json(null);
    else return Response.json(page);
  } catch (error) {
    return new Response(JSON.stringify({ details: "Something went wrong" }), {
      status: 500,
    });
  }
}
