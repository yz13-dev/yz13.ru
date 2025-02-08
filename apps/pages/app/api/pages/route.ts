import { parsePages } from "@/actions/parse-pages";

export function GET(request: Request) {
  try {
    const pages = parsePages();
    return Response.json(pages);
  } catch (error) {
    return new Response(JSON.stringify({ details: "Something went wrong" }), {
      status: 500,
    });
  }
}
