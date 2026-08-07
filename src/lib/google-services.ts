import { google } from "googleapis";
import fs from "fs";
import path from "path";

// Google API Scopes required for Sheets & Drive operations
const SCOPES = [
  "https://www.googleapis.com/auth/spreadsheets",
  "https://www.googleapis.com/auth/drive",
];

export type GoogleCredentialsStatus = {
  configured: boolean;
  serviceAccountEmail?: string;
  source: "env" | "json_file" | "none";
  missingVars: string[];
};

/**
 * Loads credentials from environment variables OR directly from service-account.json / credentials.json
 */
function loadCredentials(): { email?: string; privateKey?: string; source: "env" | "json_file" | "none" } {
  // 1. Environment variables
  if (process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL && process.env.GOOGLE_PRIVATE_KEY) {
    return {
      email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      privateKey: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
      source: "env",
    };
  }

  // 2. Check for service-account.json or credentials.json in project root
  const rootDir = process.cwd();
  const jsonPaths = [
    path.join(rootDir, "service-account.json"),
    path.join(rootDir, "credentials.json"),
  ];

  for (const jsonPath of jsonPaths) {
    if (fs.existsSync(jsonPath)) {
      try {
        const fileContent = fs.readFileSync(jsonPath, "utf-8");
        const parsed = JSON.parse(fileContent);
        if (parsed.client_email && parsed.private_key) {
          return {
            email: parsed.client_email,
            privateKey: parsed.private_key.replace(/\\n/g, "\n"),
            source: "json_file",
          };
        }
      } catch (err) {
        console.warn(`[Google Services] Error reading credentials file at ${jsonPath}:`, err);
      }
    }
  }

  return { source: "none" };
}

/**
 * Validates whether required Google Service Account credentials exist
 */
export function checkGoogleCredentialsStatus(): GoogleCredentialsStatus {
  const creds = loadCredentials();

  if (creds.email && creds.privateKey) {
    return {
      configured: true,
      serviceAccountEmail: creds.email,
      source: creds.source,
      missingVars: [],
    };
  }

  return {
    configured: false,
    source: "none",
    missingVars: ["GOOGLE_SERVICE_ACCOUNT_EMAIL", "GOOGLE_PRIVATE_KEY", "service-account.json"],
  };
}

/**
 * Returns an authenticated Google JWT Auth Client using Service Account credentials
 */
export function getGoogleServiceAccountAuth() {
  const creds = loadCredentials();
  if (!creds.email || !creds.privateKey) {
    console.warn("[Google Services] Pending credentials. Please provide service-account.json or env vars.");
    return null;
  }

  return new google.auth.JWT({
    email: creds.email,
    key: creds.privateKey,
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
