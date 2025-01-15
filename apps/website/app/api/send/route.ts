import { NextRequest } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const REDIRECT_EMAIL = process.env!.REDIRECT_EMAIL;
export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const to = request.nextUrl.searchParams.get("to");
    const subject = request.nextUrl.searchParams.get("subject");
    if (!REDIRECT_EMAIL) return Response.json({ error: "Не настроен email" });
    if (!to || !subject)
      return Response.json(
        { error: "Не переданы нужные параметры" },
        { status: 400 },
      );
    const title = (subject ?? "Запрос на сотрудничество") + ` - ${to}`;
    const type = request.nextUrl.searchParams.get("type") ?? "solo";
    const { data, error } = await resend.emails.send({
      from: "YZ13 <request@yz13.ru>",
      to: [REDIRECT_EMAIL],
      subject: title,
      text: body ?? "Пользователь не передал текст сообщения",
      tags: [{ name: "type", value: type }],
    });

    console.log(data, error);

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
