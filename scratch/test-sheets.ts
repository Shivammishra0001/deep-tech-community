import "dotenv/config";
import { GoogleSheetsDB, SHEET_TABS } from "../src/lib/google-sheets-db";

async function main() {
  try {
    console.log("Testing Google Sheets DB connection...");
    const row = ["Test User", "test@example.com", "Engineer", "AI", "global", new Date().toISOString()];
    await GoogleSheetsDB.appendRow(SHEET_TABS.MEMBERSHIPS, row);
    console.log("SUCCESSFULLY APPENDED ROW TO GOOGLE SHEETS!");
  } catch (err) {
    console.error("GOOGLE SHEETS ERROR:", err);
  }
}

main();
