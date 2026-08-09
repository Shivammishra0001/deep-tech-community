import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { getGoogleSheetsClient } from "../src/lib/google-services";
import { GoogleSheetsDB, SHEET_TABS } from "../src/lib/google-sheets-db";

async function main() {
  console.log("Environment variables loaded.");
  console.log("Spreadsheet ID:", process.env.GOOGLE_SHEETS_SPREADSHEET_ID);
  console.log("Service Account Email:", process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL);

  const sheets = getGoogleSheetsClient();
  console.log("Sheets client initialized:", !!sheets);

  if (!sheets) {
    console.error("Failed to initialize Google Sheets client.");
    return;
  }

  try {
    const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID || "1-cq6hWzG5ztFqugUEuccPBSYIzdeChxr6rAMlW3HgzI";
    const meta = await sheets.spreadsheets.get({ spreadsheetId });
    console.log("Spreadsheet Title:", meta.data.properties?.title);
    console.log("Existing Sheet Tabs in Google Sheets:");
    meta.data.sheets?.forEach((s) => console.log(" -", s.properties?.title));

    for (const tabKey of Object.values(SHEET_TABS)) {
      const rows = await GoogleSheetsDB.readRows(tabKey);
      console.log(`\nTab '${tabKey}': ${rows.length} data rows`);
      if (rows.length > 0) {
        console.log(`  Sample row:`, rows[rows.length - 1]);
      }
    }
  } catch (err: any) {
    console.error("Google Sheets API Error:", err?.message || err);
  }
}

main();
