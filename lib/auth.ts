import type { NextRequest } from "next/server";

export function isAdminRequest(request: NextRequest): boolean {
  const configuredSecret = process.env.ADMIN_API_SECRET;

  if (!configuredSecret) {
    return process.env.NODE_ENV !== "production";
  }

  return request.headers.get("x-admin-secret") === configuredSecret;
}

export function isCronRequest(request: NextRequest): boolean {
  const configuredSecret = process.env.CRON_SECRET;

  if (!configuredSecret) {
    return process.env.NODE_ENV !== "production";
  }

  return request.headers.get("authorization") === `Bearer ${configuredSecret}`;
}
