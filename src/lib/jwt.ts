import { SignJWT, jwtVerify } from "jose";

export type Role =
  | "SUPER_ADMIN"
  | "GLOBAL_ADMIN"
  | "COUNTRY_ADMIN"
  | "CHAPTER_LEAD"
  | "MODERATOR"
  | "SPEAKER"
  | "MEMBER"
  | "GUEST";

export type JwtPayload = {
  userId: string;
  email: string;
  role: Role;
  permissions: string[];
  tokenVersion: number;
};

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "dts-deep-tech-society-jwt-secret-key-2026-super-secure"
);
const REFRESH_SECRET = new TextEncoder().encode(
  process.env.REFRESH_TOKEN_SECRET || "dts-deep-tech-society-refresh-token-secret-2026"
);

export async function signAccessToken(payload: JwtPayload): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("15m")
    .sign(JWT_SECRET);
}

export async function signRefreshToken(userId: string, tokenVersion: number): Promise<string> {
  return new SignJWT({ userId, tokenVersion })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("30d")
    .sign(REFRESH_SECRET);
}

export async function verifyAccessToken(token: string): Promise<JwtPayload | null> {
  try {
    const verified = await jwtVerify(token, JWT_SECRET);
    return verified.payload as unknown as JwtPayload;
  } catch {
    return null;
  }
}

export async function verifyRefreshToken(token: string): Promise<{ userId: string; tokenVersion: number } | null> {
  try {
    const verified = await jwtVerify(token, REFRESH_SECRET);
    return verified.payload as unknown as { userId: string; tokenVersion: number };
  } catch {
    return null;
  }
}
