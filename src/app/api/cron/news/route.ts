import { NextRequest, NextResponse } from "next/server";
import { fetchAndSyncNews } from "@/lib/news-fetcher";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const secret = searchParams.get("secret") || req.headers.get("x-cron-secret");
    const configuredSecret = process.env.CRON_SECRET || "dts-news-cron-secret-2026";

    if (secret !== configuredSecret) {
      return NextResponse.json({ success: false, error: "Unauthorized cron request." }, { status: 401 });
    }

    const result = await fetchAndSyncNews();

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      fetched: result.fetched,
      newAdded: result.newAdded,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Cron news fetch failed." },
      { status: 500 }
    );
  }
}
