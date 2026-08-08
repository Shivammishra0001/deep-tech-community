import "dotenv/config";
import { fetchAndSyncNews, getPublishedNews } from "../src/lib/news-fetcher";

async function main() {
  console.log("Testing News Fetcher & Google Sheets Sync...");
  try {
    const result = await fetchAndSyncNews();
    console.log("Fetch Result:", JSON.stringify(result, null, 2));

    const published = await getPublishedNews();
    console.log(`Total Published Articles in Google Sheets: ${published.length}`);
    if (published.length > 0) {
      console.log("Sample Published Article:", published[0]);
    }
  } catch (err) {
    console.error("Error testing news fetcher:", err);
  }
}

main();
