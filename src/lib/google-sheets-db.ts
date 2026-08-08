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
    if (!sheets) return [];

    try {
      await this.ensureTab(tabName);
      const res = await sheets.spreadsheets.values.get({
        spreadsheetId: SPREADSHEET_ID,
        range: `${tabName}!A2:Z10000`,
      });
      return res.data.values || [];
    } catch (err) {
      console.error(`[GoogleSheetsDB] Error reading ${tabName}:`, err);
      return [];
    }
  }

  /**
   * Appends multiple rows of values to a sheet tab
   */
  static async appendRows(tabName: string, multiRowValues: (string | number | boolean)[][]): Promise<boolean> {
    const sheets = getGoogleSheetsClient();
    if (!sheets || multiRowValues.length === 0) return false;

    try {
      await this.ensureTab(tabName);
      const stringifiedRows = multiRowValues.map((row) =>
        row.map((v) => (v === null || v === undefined ? "" : String(v)))
      );
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
      return false;
    }
  }

  /**
   * Appends a row of values to a sheet tab
   */
  static async appendRow(tabName: string, rowValues: (string | number | boolean)[]): Promise<boolean> {
    return this.appendRows(tabName, [rowValues]);
  }

  /**
   * Finds a row in a tab where a specific column index matches a target value
   */
  static async findRow(tabName: string, columnIndex: number, targetValue: string): Promise<string[] | null> {
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
