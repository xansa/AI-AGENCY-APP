const rateMap = new Map<string, { count: number; resetAt: number }>();

if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    rateMap.forEach((val, key) => {
      if (val.resetAt < now) rateMap.delete(key);
    });
  }, 5 * 60 * 1000);
}

export function rateLimit(
  ip: string,
  config: { windowMs?: number; max?: number } = {}
): { success: boolean; remaining: number } {
  const { windowMs = 60_000, max = 10 } = config;
  const now = Date.now();
  const entry = rateMap.get(ip);

  if (!entry || entry.resetAt < now) {
    rateMap.set(ip, { count: 1, resetAt: now + windowMs });
    return { success: true, remaining: max - 1 };
  }

  entry.count++;
  if (entry.count > max) {
    return { success: false, remaining: 0 };
  }

  return { success: true, remaining: max - entry.count };
}

export function getClientIp(request: Request): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown"
  );
}
