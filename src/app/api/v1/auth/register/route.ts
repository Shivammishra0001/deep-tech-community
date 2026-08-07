import { type NextRequest } from "next/server";
import { apiError, apiSuccess } from "@/lib/response";
import { signAccessToken, signRefreshToken } from "@/lib/jwt";
import { getRolePermissions } from "@/lib/rbac";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { fullName, email, phoneNumber, countryCode, password } = body;

    if (!email || !password || !fullName) {
      return apiError("Full name, email, and password are required.", 400);
    }

    if (password.length < 6) {
      return apiError("Password must be at least 6 characters.", 400);
    }

    // Mock User creation (Ready for Prisma ORM integration)
    const user = {
      id: "usr_" + Math.random().toString(36).substring(2, 9),
      email: email.trim().toLowerCase(),
      phoneNumber: phoneNumber ? phoneNumber.trim() : null,
      countryCode: countryCode || "+91",
      fullName: fullName.trim(),
      role: "MEMBER" as const,
      status: "ACTIVE" as const,
      tokenVersion: 1,
      createdAt: new Date().toISOString(),
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

    return apiSuccess(
      {
        user,
        accessToken,
        refreshToken,
        expiresIn: "15m",
      },
      undefined,
      201
    );
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Registration failed.";
    return apiError(msg, 500);
  }
}
