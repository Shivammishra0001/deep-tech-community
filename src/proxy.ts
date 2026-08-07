import { NextResponse, type NextRequest } from "next/server";
import { verifyAccessToken } from "@/lib/jwt";
import { checkRateLimit } from "@/lib/rate-limit";

// Protected route paths matching specific permission/role requirements
const PROTECTED_ADMIN_ROUTES = ["/api/v1/admin"];
const PROTECTED_COMMUNITY_WRITE_ROUTES = ["/api/v1/community/posts"];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Apply Rate Limiting on API Endpoints (100 requests / min per IP)
  if (pathname.startsWith("/api/")) {
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0] || "127.0.0.1";
    const rl = checkRateLimit(`ip:${ip}`, 120, 60 * 1000);

    if (!rl.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Too many requests — rate limit exceeded.",
          timestamp: new Date().toISOString(),
        },
        {
          status: 429,
          headers: {
            "X-RateLimit-Limit": rl.limit.toString(),
            "X-RateLimit-Remaining": "0",
            "X-RateLimit-Reset": rl.reset.toString(),
          },
        }
      );
    }
  }

  // 2. Extract Authorization Bearer Token
  const authHeader = request.headers.get("authorization");
  let token = authHeader?.startsWith("Bearer ") ? authHeader.substring(7) : null;

  if (!token) {
    token = request.cookies.get("dts_access_token")?.value || null;
  }

  // 3. Verify JWT Access Token
  const payload = token ? await verifyAccessToken(token) : null;
  const requestHeaders = new Headers(request.headers);

  if (payload) {
    requestHeaders.set("x-user-id", payload.userId);
    requestHeaders.set("x-user-role", payload.role);
    requestHeaders.set("x-user-permissions", JSON.stringify(payload.permissions));
  }

  // 4. Enforce RBAC Protection on Admin Endpoints
  const isAdminRoute = PROTECTED_ADMIN_ROUTES.some((route) => pathname.startsWith(route));
  if (isAdminRoute) {
    if (!payload || !["SUPER_ADMIN", "GLOBAL_ADMIN", "COUNTRY_ADMIN"].includes(payload.role)) {
      return NextResponse.json(
        {
          success: false,
          error: "Forbidden — insufficient administrative permissions.",
          timestamp: new Date().toISOString(),
        },
        { status: 403 }
      );
    }
  }

  // 5. Enforce Auth on Community Post Creation Endpoints
  const isCommunityWrite =
    PROTECTED_COMMUNITY_WRITE_ROUTES.some((route) => pathname.startsWith(route)) &&
    request.method === "POST";
  if (isCommunityWrite && !payload) {
    return NextResponse.json(
      {
        success: false,
        error: "Authentication required — please log in or sign up to publish.",
        timestamp: new Date().toISOString(),
      },
      { status: 401 }
    );
  }

  // 6. Security Headers Response
  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-XSS-Protection", "1; mode=block");

  return response;
}

export const config = {
  matcher: ["/api/v1/:path*", "/community/write"],
};
