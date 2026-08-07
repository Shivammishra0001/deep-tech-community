import { NextResponse } from "next/server";
import { GoogleSheetsDB, SHEET_TABS } from "@/lib/google-sheets-db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const email = String(body.email ?? "").trim().toLowerCase();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }

    const existing = await GoogleSheetsDB.findRow(SHEET_TABS.NEWSLETTER_SUBSCRIPTIONS, 0, email);
    if (existing) {
      return NextResponse.json({ ok: true, already: true });
    }

    // Append to Google Sheets NewsletterSubscriptions Tab
    const row = [email, new Date().toISOString()];
    await GoogleSheetsDB.appendRow(SHEET_TABS.NEWSLETTER_SUBSCRIPTIONS, row);

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
