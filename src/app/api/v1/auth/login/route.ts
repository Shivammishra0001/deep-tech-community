import { type NextRequest } from "next/server";
import { apiError, apiSuccess } from "@/lib/response";
import { signAccessToken, signRefreshToken } from "@/lib/jwt";
import { getRolePermissions } from "@/lib/rbac";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { identifier, password } = body; // identifier can be email OR phone number

    if (!identifier || !password) {
      return apiError("Email/Phone number and password are required.", 400);
    }

    // Mock Login Lookup (Supports Email OR Phone Number matching)
    const isPhone = /^[+\d\s-]+$/.test(identifier.trim());
    const user = {
      id: "usr_member_01",
      email: isPhone ? "member@deeptech.society" : identifier.trim().toLowerCase(),
      phoneNumber: isPhone ? identifier.trim() : "+91 98765 43210",
      countryCode: "+91",
      fullName: "Dr. Elena Marchetti",
      role: "MEMBER" as const,
      status: "ACTIVE" as const,
      tokenVersion: 1,
    };

    const permissions = getRolePermissions(user.role);
    const accessToken = await signAccessToken({
      userId: user.id,
      email: user.email,
      role: user.role,
      permissions,
      tokenVersion: user.tokenVersion,
    });

    const refreshToken = await signRefreshToken(user.id, user.tokenVersion);

    return apiSuccess({
      user,
      accessToken,
      refreshToken,
      expiresIn: "15m",
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Authentication failed.";
    return apiError(msg, 500);
  }
}
