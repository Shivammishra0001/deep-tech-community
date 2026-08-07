import { type NextRequest } from "next/server";
import { apiError, apiSuccess } from "@/lib/response";
import { getRolePermissions } from "@/lib/rbac";
import type { Role } from "@/lib/jwt";

export async function GET(request: NextRequest) {
  const userId = request.headers.get("x-user-id");
  const role = (request.headers.get("x-user-role") || "GUEST") as Role;

  if (!userId) {
    return apiError("Unauthenticated — no valid token provided.", 401);
  }

  const permissions = getRolePermissions(role);

  return apiSuccess({
    user: {
      id: userId,
      role,
      permissions,
    },
  });
}
