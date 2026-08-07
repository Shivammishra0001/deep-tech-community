import { NextResponse } from "next/server";
import { GoogleSheetsDB, SHEET_TABS } from "@/lib/google-sheets-db";

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

    // Check if user already registered for this event
    const rows = await GoogleSheetsDB.readRows(SHEET_TABS.EVENT_REGISTRATIONS);
    const exists = rows.some(
      (r) => r[0]?.trim().toLowerCase() === eventSlug.toLowerCase() && r[2]?.trim().toLowerCase() === email
    );

    if (exists) {
      return NextResponse.json({ ok: true, already: true });
    }

    // Append to Google Sheets EventRegistrations Tab
    const row = [eventSlug, name, email, new Date().toISOString()];
    await GoogleSheetsDB.appendRow(SHEET_TABS.EVENT_REGISTRATIONS, row);

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Could not register. Please try again." }, { status: 500 });
  }
}
