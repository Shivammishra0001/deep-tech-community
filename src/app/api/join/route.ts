import { NextResponse } from "next/server";
import { GoogleSheetsDB, SHEET_TABS } from "@/lib/google-sheets-db";

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

    // Check if member already exists in Google Sheets
    const existing = await GoogleSheetsDB.findRow(SHEET_TABS.MEMBERSHIPS, 1, email);
    if (existing) {
      return NextResponse.json({ error: "You're already on the membership list." }, { status: 409 });
    }

    // Append to Google Sheets Memberships Tab
    const row = [name, email, role, domain, chapter, new Date().toISOString()];
    await GoogleSheetsDB.appendRow(SHEET_TABS.MEMBERSHIPS, row);

    return NextResponse.json({ ok: true, name, email });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Something went wrong. Please try again.";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
