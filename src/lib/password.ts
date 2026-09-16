import { createHash, randomBytes, scrypt as scryptCallback, timingSafeEqual } from "crypto";

/**
 * Password hashing for the Deep Tech Community auth flow.
 *
 * Uses Node's built-in scrypt (RFC 7914) so no third-party dependency is required.
 * Stored format (single sheet cell / column, `$`-delimited):
 *
 *   scrypt$<N>$<r>$<p>$<salt-base64>$<derivedKey-base64>
 *
 * Passwords are never stored or compared in plaintext. Legacy records written by
 * earlier revisions of this app (raw plaintext, or the `HASHED_PWD_<plaintext>`
 * prefix, which was not a hash at all) are still *recognised* on login so existing
 * members are not locked out, but they are reported via `needsRehash` so the caller
 * can transparently replace them with a real hash.
 */

const SCHEME = "scrypt";
const KEY_LENGTH = 64;
const SALT_LENGTH = 16;

/** Current cost parameters. Bump N when hardware improves; `needsRehash` handles migration. */
const COST = { N: 16384, r: 8, p: 1 } as const;

/** 128 * N * r = 16 MiB for the values above; leave headroom over Node's 32 MiB default. */
const MAX_MEM = 64 * 1024 * 1024;

const LEGACY_FAKE_HASH_PREFIX = "HASHED_PWD_";

export type PasswordVerification = {
  /** The supplied password matched the stored credential. */
  valid: boolean;
  /** The stored credential is legacy or uses outdated cost params and should be replaced. */
  needsRehash: boolean;
};

function derive(password: string, salt: Buffer, keyLength: number, cost: { N: number; r: number; p: number }) {
  return new Promise<Buffer>((resolve, reject) => {
    scryptCallback(
      password.normalize("NFKC"),
      salt,
      keyLength,
      { N: cost.N, r: cost.r, p: cost.p, maxmem: MAX_MEM },
      (err, derivedKey) => (err ? reject(err) : resolve(derivedKey as Buffer)),
    );
  });
}

/**
 * Length-independent constant-time comparison.
 *
 * `timingSafeEqual` throws when the two buffers differ in length, which would itself
 * leak length information, so both sides are reduced to a fixed-width digest first.
 */
function constantTimeEquals(a: string, b: string): boolean {
  const digestA = createHash("sha256").update(a, "utf8").digest();
  const digestB = createHash("sha256").update(b, "utf8").digest();
  return timingSafeEqual(digestA, digestB);
}

/** Hashes a plaintext password for storage. */
export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(SALT_LENGTH);
  const derivedKey = await derive(password, salt, KEY_LENGTH, COST);
  return [SCHEME, COST.N, COST.r, COST.p, salt.toString("base64"), derivedKey.toString("base64")].join("$");
}

/** True when `stored` is a real scrypt hash produced by `hashPassword`. */
export function isHashed(stored: string): boolean {
  return typeof stored === "string" && stored.startsWith(`${SCHEME}$`);
}

/**
 * Verifies a password against a stored credential.
 *
 * Never throws — a malformed or empty stored credential is treated as a failed
 * verification rather than an error, so a corrupt record can never authenticate.
 */
export async function verifyPassword(password: string, stored: string): Promise<PasswordVerification> {
  const failed: PasswordVerification = { valid: false, needsRehash: false };

  if (typeof password !== "string" || password.length === 0) return failed;
  if (typeof stored !== "string" || stored.trim().length === 0) return failed;

  const credential = stored.trim();

  if (isHashed(credential)) {
    const parts = credential.split("$");
    if (parts.length !== 6) return failed;

    const [, rawN, rawR, rawP, saltB64, keyB64] = parts;
    const N = Number(rawN);
    const r = Number(rawR);
    const p = Number(rawP);
    if (!Number.isInteger(N) || !Number.isInteger(r) || !Number.isInteger(p)) return failed;
    if (N <= 1 || (N & (N - 1)) !== 0 || r < 1 || p < 1) return failed;

    let salt: Buffer;
    let expected: Buffer;
    try {
      salt = Buffer.from(saltB64, "base64");
      expected = Buffer.from(keyB64, "base64");
    } catch {
      return failed;
    }
    if (salt.length === 0 || expected.length === 0) return failed;

    let actual: Buffer;
    try {
      actual = await derive(password, salt, expected.length, { N, r, p });
    } catch {
      return failed;
    }

    const valid = actual.length === expected.length && timingSafeEqual(actual, expected);
    if (!valid) return failed;

    const outdated = N !== COST.N || r !== COST.r || p !== COST.p || expected.length !== KEY_LENGTH;
    return { valid: true, needsRehash: outdated };
  }

  // ---- Legacy credentials written before hashing existed --------------------
  // Recognised only so existing members can still sign in; every match is
  // flagged for immediate rehashing by the caller.
  if (credential.startsWith(LEGACY_FAKE_HASH_PREFIX)) {
    const legacyPlaintext = credential.slice(LEGACY_FAKE_HASH_PREFIX.length);
    if (legacyPlaintext.length === 0) return failed;
    return { valid: constantTimeEquals(password, legacyPlaintext), needsRehash: true };
  }

  return { valid: constantTimeEquals(password, credential), needsRehash: true };
}
