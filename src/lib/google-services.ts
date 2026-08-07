import { google } from "googleapis";

// Google API Scopes required for Sheets & Drive operations
const SCOPES = [
  "https://www.googleapis.com/auth/spreadsheets",
  "https://www.googleapis.com/auth/drive",
];

export type GoogleCredentialsStatus = {
  configured: boolean;
  serviceAccountEmail?: string;
  missingVars: string[];
};

/**
 * Validates whether required Google Service Account credentials exist in Environment variables
 */
export function checkGoogleCredentialsStatus(): GoogleCredentialsStatus {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY;

  const missing: string[] = [];
  if (!email) missing.push("GOOGLE_SERVICE_ACCOUNT_EMAIL");
  if (!privateKey) missing.push("GOOGLE_PRIVATE_KEY");

  return {
    configured: missing.length === 0,
    serviceAccountEmail: email,
    missingVars: missing,
  };
}

/**
 * Returns an authenticated Google JWT Auth Client using Service Account credentials
 */
export function getGoogleServiceAccountAuth() {
  const status = checkGoogleCredentialsStatus();
  if (!status.configured) {
    console.warn(`[Google Services] Pending credentials. Missing: ${status.missingVars.join(", ")}`);
    return null;
  }

  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const rawKey = process.env.GOOGLE_PRIVATE_KEY || "";
  // Ensure private key handles escaped newlines properly
  const privateKey = rawKey.replace(/\\n/g, "\n");

  return new google.auth.JWT({
    email: clientEmail,
    key: privateKey,
    scopes: SCOPES,
  });
}

/**
 * Returns an authenticated Google Sheets API client
 */
export function getGoogleSheetsClient() {
  const auth = getGoogleServiceAccountAuth();
  if (!auth) return null;
  return google.sheets({ version: "v4", auth });
}

/**
 * Returns an authenticated Google Drive API client
 */
export function getGoogleDriveClient() {
  const auth = getGoogleServiceAccountAuth();
  if (!auth) return null;
  return google.drive({ version: "v3", auth });
}

/**
 * Helper to append a row to a Google Spreadsheet (e.g. for membership applications or event signups)
 */
export async function appendSpreadsheetRow(
  spreadsheetId: string,
  range: string,
  values: (string | number | boolean)[]
) {
  const sheets = getGoogleSheetsClient();
  if (!sheets) {
    console.warn("[Google Sheets] API client uninitialized. Waiting for credentials.");
    return { success: false, reason: "PENDING_CREDENTIALS" };
  }

  try {
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [values],
      },
    });
    return { success: true, data: response.data };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Google Sheets API Error";
    console.error("[Google Sheets Append Error]:", msg);
    return { success: false, error: msg };
  }
}
