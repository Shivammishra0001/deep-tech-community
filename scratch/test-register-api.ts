import "dotenv/config";
import { GoogleSheetsDB, SHEET_TABS } from "../src/lib/google-sheets-db";

async function main() {
  try {
    console.log("Testing user signup in Google Sheets...");
    const row = [
      "Bhavya Pandey Test",
      "bhavya_test@dyau.ai",
      "+91 9876543210",
      "hashed_password_sample",
      new Date().toISOString(),
    ];
    await GoogleSheetsDB.appendRow(SHEET_TABS.USERS, row);
    console.log("SUCCESSFULLY WRITTEN USER TO GOOGLE SHEETS!");
  } catch (err) {
    console.error("ERROR WRITING TO GOOGLE SHEETS:", err);
  }
}

main();
