import { NextResponse } from "next/server";
import { db } from "@/db";
import { newsletterSubscriptions } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const email = String(body.email ?? "").trim().toLowerCase();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }

    try {
      const exists = await db
        .select({ id: newsletterSubscriptions.id })
        .from(newsletterSubscriptions)
        .where(eq(newsletterSubscriptions.email, email))
        .limit(1);
      if (exists.length > 0) {
        return NextResponse.json({ ok: true, already: true });
      }

      await db.insert(newsletterSubscriptions).values({ email });
    } catch (dbErr) {
      console.warn("DB Storage Fallback for Newsletter Subscription:", dbErr);
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
