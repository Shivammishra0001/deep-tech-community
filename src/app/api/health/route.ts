import { db } from "@/db";
import { sql } from "drizzle-orm";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await db.execute(sql`select 1`);
    return Response.json({ ok: true, database: "connected" });
  } catch (error) {
    return Response.json(
      {
        ok: false,
        database: "disconnected",
        message: error instanceof Error ? error.message : "Unknown database error",
        hint: "Start PostgreSQL locally or set DATABASE_URL to a reachable instance.",
      },
      { status: 503 },
    );
  }
}
