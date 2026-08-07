type RateLimitRecord = {
  count: number;
  resetTime: number;
};

const tracker = new Map<string, RateLimitRecord>();

export function checkRateLimit(
  key: string,
  limit = 100,
  windowMs = 60 * 1000
): { success: boolean; limit: number; remaining: number; reset: number } {
  const now = Date.now();
  const record = tracker.get(key);

  if (!record || now > record.resetTime) {
    const resetTime = now + windowMs;
    tracker.set(key, { count: 1, resetTime });
    return { success: true, limit, remaining: limit - 1, reset: resetTime };
  }

  if (record.count >= limit) {
    return { success: false, limit, remaining: 0, reset: record.resetTime };
  }

  record.count += 1;
  tracker.set(key, record);
  return { success: true, limit, remaining: limit - record.count, reset: record.resetTime };
}
