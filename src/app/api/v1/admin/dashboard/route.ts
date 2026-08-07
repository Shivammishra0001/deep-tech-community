import { type NextRequest } from "next/server";
import { apiError, apiSuccess } from "@/lib/response";

export async function GET(request: NextRequest) {
  const role = request.headers.get("x-user-role");

  if (!role || !["SUPER_ADMIN", "GLOBAL_ADMIN", "COUNTRY_ADMIN"].includes(role)) {
    return apiError("Forbidden — insufficient administrative privileges.", 403);
  }

  const analytics = {
    totalMembers: 12400,
    activeChapters: 38,
    upcomingEvents: 14,
    publishedBriefings: 42,
    systemStatus: "HEALTHY",
    dbConnection: "CONNECTED",
    cacheHitRate: "99.4%",
    recentSignups: [
      { id: "u1", name: "Alex Chen", domain: "AI", date: "10 mins ago" },
      { id: "u2", name: "Siddharth Rao", domain: "Quantum", date: "25 mins ago" },
    ],
  };

  return apiSuccess(analytics);
}
