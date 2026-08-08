import { NextResponse } from "next/server";
import { getPublishedNews, fetchAndSyncNews } from "@/lib/news-fetcher";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    let articles = await getPublishedNews();

    // If Google Sheets is empty (e.g. initial run), fetch RSS automatically
    if (articles.length === 0) {
      await fetchAndSyncNews();
      articles = await getPublishedNews();
    }

    return NextResponse.json({
      success: true,
      count: articles.length,
      data: articles,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch news articles." },
      { status: 500 }
    );
  }
}
