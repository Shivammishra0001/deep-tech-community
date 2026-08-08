import { type NextRequest } from "next/server";
import { apiError, apiSuccess } from "@/lib/response";
import { signAccessToken, signRefreshToken } from "@/lib/jwt";
import { getRolePermissions } from "@/lib/rbac";
import { GoogleSheetsDB, SHEET_TABS } from "@/lib/google-sheets-db";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { identifier, password } = body;

    if (!identifier || !password) {
      return apiError("Email/Phone number and password are required.", 400);
    }

    const cleanId = identifier.trim().toLowerCase();
    const isPhone = /^[+\d\s-]+$/.test(cleanId);

    // Look up in Google Sheets Users Tab
    // Email is col 2 (0-indexed: 2), Phone is col 3 (0-indexed: 3)
    const userRow = isPhone
      ? await GoogleSheetsDB.findRow(SHEET_TABS.USERS, 3, cleanId)
      : await GoogleSheetsDB.findRow(SHEET_TABS.USERS, 2, cleanId);

    if (!userRow) {
      return apiError("No account found with this email or phone number.", 404);
    }

    const storedPassword = userRow[6] || "";
    if (storedPassword && storedPassword !== password && storedPassword !== "HASHED_PWD_" + password) {
      return apiError("Incorrect password. Please check your credentials and try again.", 401);
    }

    const user = {
      id: userRow[0] || "usr_member",
      fullName: userRow[1] || "Member",
      email: userRow[2] || cleanId,
      phoneNumber: userRow[3] || "",
      countryCode: userRow[4] || "+91",
      role: (userRow[5] || "MEMBER") as any,
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
