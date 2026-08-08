import { fetchAndSyncNews, getPublishedNews } from "../src/lib/news-fetcher";

async function main() {
  console.log("Syncing fresh news with distinct image pool...");
  const result = await fetchAndSyncNews();
  console.log("Sync result:", JSON.stringify(result, null, 2));

  const published = await getPublishedNews();
  console.log(`Total published articles in DB: ${published.length}`);
  published.slice(0, 5).forEach((item, idx) => {
    console.log(`[${idx + 1}] ${item.category} | ${item.title.slice(0, 45)}... => ${item.image_url}`);
  });
}

main();
