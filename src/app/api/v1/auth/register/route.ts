import { type NextRequest } from "next/server";
import { apiError, apiSuccess } from "@/lib/response";
import { signAccessToken, signRefreshToken } from "@/lib/jwt";
import { getRolePermissions } from "@/lib/rbac";
import { GoogleSheetsDB, SHEET_TABS } from "@/lib/google-sheets-db";
import { hashPassword } from "@/lib/password";
import { randomBytes } from "crypto";

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

    const cleanEmail = email.trim().toLowerCase();

    // 1. Check if user already exists in Google Sheets Users tab
    const existing = await GoogleSheetsDB.findUser(cleanEmail);
    if (existing) {
      return apiError("An account with this email address already exists.", 409);
    }

    const user = {
      id: "usr_" + randomBytes(8).toString("hex"),
      fullName: fullName.trim(),
      email: cleanEmail,
      phoneNumber: phoneNumber ? phoneNumber.trim() : "",
      countryCode: countryCode || "+91",
      role: "MEMBER" as const,
      status: "ACTIVE" as const,
      tokenVersion: 1,
      createdAt: new Date().toISOString(),
    };

    // 2. Append User to Google Sheets Users Tab.
    //    The password is scrypt-hashed with a per-user random salt; the plaintext
    //    is never written to storage or logs.
    const passwordHash = await hashPassword(password);
    const userRow = [
      user.id,
      user.fullName,
      user.email,
      user.phoneNumber,
      user.countryCode,
      user.role,
      passwordHash,
      user.createdAt,
    ];
    await GoogleSheetsDB.appendRow(SHEET_TABS.USERS, userRow);

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
