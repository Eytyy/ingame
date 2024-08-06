import EmailTemplate from "@/components/form/EmailTemplate";
import { NextRequest } from "next/server";
import { Resend } from "resend";

export async function POST(req: NextRequest) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);

    const body = await req.json();
    if (!body.name || !body.email || !body.message) {
      return new Response("Missing required fields", { status: 400 });
    }

    const { name, email, message } = body;

    const { data, error } = await resend.emails.send({
      from: "ingame <contact@in-game.me>",
      to: ["info@katchthis.com"],
      subject: "New message from ingame.me",
      react: EmailTemplate({
        name,
        email,
        message,
      }),
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
