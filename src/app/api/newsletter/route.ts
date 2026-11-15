import { db } from "@/db";
import { newsletterSubscribers } from "@/db/schema";
import { isValidEmail } from "@/lib/format";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  let payload: { email?: unknown; source?: unknown };

  try {
    payload = (await request.json()) as { email?: unknown; source?: unknown };
  } catch {
    return Response.json({ ok: false, message: "Invalid request." }, { status: 400 });
  }

  const email = typeof payload.email === "string" ? payload.email.trim().toLowerCase() : "";
  const source =
    typeof payload.source === "string" && payload.source.trim() ? payload.source.trim() : "homepage";

  if (!email) {
    return Response.json({ ok: false, message: "Please enter your email address." }, { status: 400 });
  }

  if (!isValidEmail(email)) {
    return Response.json(
      { ok: false, message: "Please enter a valid email address." },
      { status: 422 },
    );
  }

  try {
    const existing = await db
      .insert(newsletterSubscribers)
      .values({ email, source })
      .onConflictDoNothing({ target: newsletterSubscribers.email })
      .returning({ id: newsletterSubscribers.id });

    if (existing.length === 0) {
      return Response.json({
        ok: true,
        alreadySubscribed: true,
        message: "You’re already on the list — watch your inbox.",
      });
    }

    return Response.json({
      ok: true,
      alreadySubscribed: false,
      message: "You’re on the list. Welcome to ELEVN.",
    });
  } catch {
    return Response.json(
      { ok: false, message: "We couldn’t save that right now. Please try again." },
      { status: 500 },
    );
  }
}
