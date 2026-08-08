import { NextResponse } from "next/server";
import { fetchAndSyncNews } from "@/lib/news-fetcher";

export const dynamic = "force-dynamic";

export async function POST() {
  try {
    const result = await fetchAndSyncNews();
    return NextResponse.json({
      success: true,
      message: `News refresh complete! Fetched ${result.fetched} items, added ${result.newAdded} new articles.`,
      newArticlesCount: result.newAdded,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Manual news refresh failed." },
      { status: 500 }
    );
  }
}
