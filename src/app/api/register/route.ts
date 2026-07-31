import { NextResponse } from "next/server";
import { db } from "@/db";
import { eventRegistrations } from "@/db/schema";
import { and, eq } from "drizzle-orm";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const eventSlug = String(body.eventSlug ?? "").trim();
    const name = String(body.name ?? "").trim();
    const email = String(body.email ?? "").trim().toLowerCase();

    if (!eventSlug || !name) {
      return NextResponse.json({ error: "Name is required." }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }

    const exists = await db
      .select({ id: eventRegistrations.id })
      .from(eventRegistrations)
      .where(and(eq(eventRegistrations.eventSlug, eventSlug), eq(eventRegistrations.email, email)))
      .limit(1);
    if (exists.length > 0) {
      return NextResponse.json({ ok: true, already: true });
    }

    await db.insert(eventRegistrations).values({ eventSlug, name, email });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Could not register. Please try again." }, { status: 500 });
  }
}
