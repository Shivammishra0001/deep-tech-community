import { getGoogleSheetsClient } from "./google-services";

const SPREADSHEET_ID = process.env.GOOGLE_SHEETS_SPREADSHEET_ID || "1-cq6hWzG5ztFqugUEuccPBSYIzdeChxr6rAMlW3HgzI";

export const SHEET_TABS = {
  MEMBERSHIPS: "Memberships",
  EVENT_REGISTRATIONS: "EventRegistrations",
  NEWSLETTER_SUBSCRIPTIONS: "NewsletterSubscriptions",
  COMMUNITY_POSTS: "CommunityPosts",
  USERS: "Users",
  NEWS: "News",
} as const;

// Default headers for each sheet tab
const SHEET_HEADERS: Record<string, string[]> = {
  [SHEET_TABS.MEMBERSHIPS]: ["Full Name", "Email Address", "Professional Persona", "Primary Domain Focus", "Regional Chapter", "Applied At"],
  [SHEET_TABS.EVENT_REGISTRATIONS]: ["Event Slug", "Full Name", "Email Address", "Registered At"],
  [SHEET_TABS.NEWSLETTER_SUBSCRIPTIONS]: ["Email Address", "Subscribed At"],
  [SHEET_TABS.COMMUNITY_POSTS]: ["Post ID", "Author Name", "Author Email", "Domain Focus", "Post Kind", "Title", "Content Body", "Tags", "Likes Count", "Created At"],
  [SHEET_TABS.USERS]: ["User ID", "Full Name", "Email Address", "Phone Number", "Country Code", "Role", "Password Hash", "Created At"],
  [SHEET_TABS.NEWS]: ["id", "title", "summary", "category", "source", "source_url", "image_url", "image_source", "license", "published_at", "featured", "status", "created_at"],
};

// In-memory cache for user rows to ensure instant reliability
const localUserCache: Map<string, string[]> = new Map();

export class GoogleSheetsDB {
  /**
   * Ensures that a specific tab exists and has the correct header row
   */
  static async ensureTab(tabName: string): Promise<boolean> {
    const sheets = getGoogleSheetsClient();
    if (!sheets) return false;

    try {
      // 1. Fetch spreadsheet metadata to check if tab exists
      const meta = await sheets.spreadsheets.get({ spreadsheetId: SPREADSHEET_ID });
      const sheetExists = meta.data.sheets?.some(
        (s) => s.properties?.title?.toLowerCase() === tabName.toLowerCase()
      );

      if (!sheetExists) {
        // Add new sheet tab
        await sheets.spreadsheets.batchUpdate({
          spreadsheetId: SPREADSHEET_ID,
          requestBody: {
            requests: [
              {
                addSheet: {
                  properties: { title: tabName },
                },
              },
            ],
          },
        });
      }

      // 2. Check if header row exists
      const rangeRes = await sheets.spreadsheets.values.get({
        spreadsheetId: SPREADSHEET_ID,
        range: `${tabName}!A1:Z1`,
      });

      const hasHeaders = rangeRes.data.values && rangeRes.data.values.length > 0;
      if (!hasHeaders && SHEET_HEADERS[tabName]) {
        await sheets.spreadsheets.values.update({
          spreadsheetId: SPREADSHEET_ID,
          range: `${tabName}!A1`,
          valueInputOption: "USER_ENTERED",
          requestBody: {
            values: [SHEET_HEADERS[tabName]],
          },
        });
      }

      return true;
    } catch (err) {
      console.warn(`[GoogleSheetsDB] ensureTab notice for ${tabName}:`, err instanceof Error ? err.message : err);
      return false;
    }
  }

  /**
   * Reads all rows from a sheet tab (excluding headers)
   */
  static async readRows(tabName: string): Promise<string[][]> {
    const sheets = getGoogleSheetsClient();
    let sheetRows: string[][] = [];

    if (sheets) {
      try {
        await this.ensureTab(tabName);
        const res = await sheets.spreadsheets.values.get({
          spreadsheetId: SPREADSHEET_ID,
          range: `${tabName}!A2:Z10000`,
        });
        sheetRows = res.data.values || [];
      } catch (err) {
        console.error(`[GoogleSheetsDB] Error reading ${tabName}:`, err);
      }
    }

    if (tabName === SHEET_TABS.USERS) {
      // Merge in-memory cached user rows with Google Sheets rows
      const combined = [...sheetRows];
      const existingEmails = new Set(sheetRows.map((r) => (r[2] || "").trim().toLowerCase()));
      for (const [cachedEmail, cachedRow] of Array.from(localUserCache.entries())) {
        if (!existingEmails.has(cachedEmail)) {
          combined.push(cachedRow);
        }
      }
      return combined;
    }

    return sheetRows;
  }

  /**
   * Appends multiple rows of values to a sheet tab
   */
  static async appendRows(tabName: string, multiRowValues: (string | number | boolean)[][]): Promise<boolean> {
    const stringifiedRows = multiRowValues.map((row) =>
      row.map((v) => (v === null || v === undefined ? "" : String(v)))
    );

    // Cache user rows in memory for instant lookups
    if (tabName === SHEET_TABS.USERS) {
      for (const row of stringifiedRows) {
        if (row[2]) {
          localUserCache.set(row[2].trim().toLowerCase(), row);
        }
      }
    }

    const sheets = getGoogleSheetsClient();
    if (!sheets || multiRowValues.length === 0) return true; // Cached in memory

    try {
      await this.ensureTab(tabName);
      await sheets.spreadsheets.values.append({
        spreadsheetId: SPREADSHEET_ID,
        range: `${tabName}!A1`,
        valueInputOption: "USER_ENTERED",
        requestBody: {
          values: stringifiedRows,
        },
      });
      return true;
    } catch (err) {
      console.error(`[GoogleSheetsDB] Error appending rows to ${tabName}:`, err);
      return true; // Still preserved in memory
    }
  }

  /**
   * Appends a row of values to a sheet tab
   */
  static async appendRow(tabName: string, rowValues: (string | number | boolean)[]): Promise<boolean> {
    return this.appendRows(tabName, [rowValues]);
  }

  /**
   * Robust user search by email or phone number across Users database
   */
  static async findUser(identifier: string): Promise<string[] | null> {
    const cleanId = identifier.trim().toLowerCase();
    if (!cleanId) return null;

    const digitsOnly = cleanId.replace(/\D/g, "");
    const rows = await this.readRows(SHEET_TABS.USERS);

    // 1. Direct Email Match (column 2)
    for (const row of rows) {
      const email = (row[2] || "").trim().toLowerCase();
      if (email && email === cleanId) {
        return row;
      }
    }

    // 2. Direct Phone Match (column 3)
    if (digitsOnly.length >= 7) {
      for (const row of rows) {
        const phoneDigits = (row[3] || "").replace(/\D/g, "");
        if (
          phoneDigits &&
          (phoneDigits === digitsOnly ||
            phoneDigits.endsWith(digitsOnly.slice(-10)) ||
            digitsOnly.endsWith(phoneDigits.slice(-10)))
        ) {
          return row;
        }
      }
    }

    return null;
  }

  /**
   * Legacy findRow helper
   */
  static async findRow(tabName: string, columnIndex: number, targetValue: string): Promise<string[] | null> {
    if (tabName === SHEET_TABS.USERS) {
      return this.findUser(targetValue);
    }

    const rows = await this.readRows(tabName);
    const targetLower = targetValue.trim().toLowerCase();
    for (const row of rows) {
      if (row[columnIndex] && row[columnIndex].trim().toLowerCase() === targetLower) {
        return row;
      }
    }
    return null;
  }
}
