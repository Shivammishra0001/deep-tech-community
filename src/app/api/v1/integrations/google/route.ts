import { NextResponse } from "next/server";
import { checkGoogleCredentialsStatus } from "@/lib/google-services";

export async function GET() {
  const status = checkGoogleCredentialsStatus();

  return NextResponse.json({
    success: true,
    service: "Google Sheets & Drive Integration (Service Account)",
    status: status.configured ? "READY_FOR_INTEGRATION" : "PENDING_CREDENTIALS",
    serviceAccountEmail: status.serviceAccountEmail || "Not Configured",
    missingVariables: status.missingVars,
    scopes: [
      "https://www.googleapis.com/auth/spreadsheets",
      "https://www.googleapis.com/auth/drive",
    ],
    timestamp: new Date().toISOString(),
  });
}
