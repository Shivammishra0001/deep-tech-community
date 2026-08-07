import { NextResponse } from "next/server";
import { db } from "@/db";
import { members } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const name = String(body.name ?? "").trim();
    const email = String(body.email ?? "").trim().toLowerCase();
    const role = String(body.role ?? "").trim();
    const domain = String(body.domain ?? "").trim();
    const chapter = String(body.chapter ?? "global").trim();

    if (!name || !email || !role || !domain) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }

    try {
      const exists = await db.select({ id: members.id }).from(members).where(eq(members.email, email)).limit(1);
      if (exists.length > 0) {
        return NextResponse.json({ error: "You're already on the membership list." }, { status: 409 });
      }
      await db.insert(members).values({ name, email, role, domain, chapter });
    } catch (dbErr) {
      console.warn("DB Storage Fallback for Membership Join:", dbErr);
    }

    return NextResponse.json({ ok: true, name, email });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Something went wrong. Please try again.";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
