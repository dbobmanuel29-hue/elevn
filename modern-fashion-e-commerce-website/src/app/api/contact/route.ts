import { db } from "@/db";
import { contactMessages } from "@/db/schema";
import { isValidEmail } from "@/lib/format";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  let payload: { name?: unknown; email?: unknown; message?: unknown };

  try {
    payload = (await request.json()) as { name?: unknown; email?: unknown; message?: unknown };
  } catch {
    return Response.json({ ok: false, message: "Invalid request." }, { status: 400 });
  }

  const name = typeof payload.name === "string" ? payload.name.trim() : "";
  const email = typeof payload.email === "string" ? payload.email.trim().toLowerCase() : "";
  const message = typeof payload.message === "string" ? payload.message.trim() : "";

  if (name.length < 2) {
    return Response.json({ ok: false, message: "Please share your name." }, { status: 422 });
  }
  if (!isValidEmail(email)) {
    return Response.json(
      { ok: false, message: "Please enter a valid email address." },
      { status: 422 },
    );
  }
  if (message.length < 10) {
    return Response.json(
      { ok: false, message: "Tell us a little more — at least 10 characters." },
      { status: 422 },
    );
  }

  try {
    await db.insert(contactMessages).values({
      name: name.slice(0, 120),
      email,
      message: message.slice(0, 4000),
    });

    return Response.json({
      ok: true,
      message: "Message received. The studio replies within one business day.",
    });
  } catch {
    return Response.json(
      { ok: false, message: "We couldn’t send that right now. Please try again." },
      { status: 500 },
    );
  }
}
