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

/**
 * Signing secrets are loaded from the environment only — there is deliberately no
 * in-code fallback. A missing secret makes signing throw and verification fail
 * closed, which is safer than silently signing tokens everyone can forge.
 */

const MIN_SECRET_LENGTH = 32;

/**
 * Secrets that were committed to this repository and must never be accepted again,
 * even if they are still present in a deployment environment. Retired 2026-09.
 */
const REVOKED_SECRETS = new Set([
  "dts-deep-tech-society-jwt-secret-key-2026-super-secure",
  "dts-deep-tech-society-refresh-token-secret-2026",
]);

type SecretName = "JWT_SECRET" | "REFRESH_TOKEN_SECRET";

const secretCache = new Map<SecretName, Uint8Array>();

function loadSecret(name: SecretName): Uint8Array {
  const cached = secretCache.get(name);
  if (cached) return cached;

  const raw = process.env[name]?.trim();

  if (!raw) {
    throw new Error(
      `${name} is not set. Generate one with \`openssl rand -base64 48\` and configure it as a deployment secret.`,
    );
  }
  if (REVOKED_SECRETS.has(raw)) {
    throw new Error(
      `${name} is set to a value that was publicly exposed in this repository's git history and has been revoked. Generate a replacement with \`openssl rand -base64 48\`.`,
    );
  }
  if (raw.length < MIN_SECRET_LENGTH) {
    throw new Error(`${name} must be at least ${MIN_SECRET_LENGTH} characters. Use \`openssl rand -base64 48\`.`);
  }

  const encoded = new TextEncoder().encode(raw);
  secretCache.set(name, encoded);
  return encoded;
}

export async function signAccessToken(payload: JwtPayload): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("15m")
    .sign(loadSecret("JWT_SECRET"));
}

export async function signRefreshToken(userId: string, tokenVersion: number): Promise<string> {
  return new SignJWT({ userId, tokenVersion })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("30d")
    .sign(loadSecret("REFRESH_TOKEN_SECRET"));
}

export async function verifyAccessToken(token: string): Promise<JwtPayload | null> {
  try {
    const verified = await jwtVerify(token, loadSecret("JWT_SECRET"), { algorithms: ["HS256"] });
    return verified.payload as unknown as JwtPayload;
  } catch {
    // Covers both an invalid/expired token and a missing or revoked secret.
    return null;
  }
}

export async function verifyRefreshToken(token: string): Promise<{ userId: string; tokenVersion: number } | null> {
  try {
    const verified = await jwtVerify(token, loadSecret("REFRESH_TOKEN_SECRET"), { algorithms: ["HS256"] });
    return verified.payload as unknown as { userId: string; tokenVersion: number };
  } catch {
    return null;
  }
}
