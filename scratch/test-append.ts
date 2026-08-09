import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { GoogleSheetsDB, SHEET_TABS } from "../src/lib/google-sheets-db";

async function testAppend() {
  console.log("Testing appendRow to Users...");
  const timestamp = Date.now();
  const res1 = await GoogleSheetsDB.appendRow(SHEET_TABS.USERS, [
    `usr_test_${timestamp}`,
    "Test User",
    `test_${timestamp}@example.com`,
    "9876543210",
    "91",
    "MEMBER",
    "HASHED_PWD_test",
    new Date().toISOString(),
  ]);
  console.log("Users append result:", res1);

  console.log("Testing appendRow to Memberships...");
  const res2 = await GoogleSheetsDB.appendRow(SHEET_TABS.MEMBERSHIPS, [
    "Test Applicant",
    `applicant_${timestamp}@example.com`,
    "Founder",
    "Artificial Intelligence",
    "milan",
    new Date().toISOString(),
  ]);
  console.log("Memberships append result:", res2);
}

testAppend();
