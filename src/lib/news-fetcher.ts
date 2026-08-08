import { GoogleSheetsDB, SHEET_TABS } from "./google-sheets-db";

export type NewsItem = {
  id: string;
  title: string;
  summary: string;
  category: string;
  source: string;
  source_url: string;
  image_url: string;
  image_source: string;
  license: string;
  published_at: string;
  featured: string; // "true" | "false"
  status: string; // "published" | "draft"
  created_at: string;
};

// Curated legal RSS feeds for Deep Tech categories
const RSS_SOURCES = [
  {
    name: "NASA Breaking News",
    url: "https://www.nasa.gov/news-release/feed/",
    defaultCategory: "Space Technology",
  },
  {
    name: "MIT Technology Review",
    url: "https://www.technologyreview.com/feed/",
    defaultCategory: "AI / Machine Learning",
  },
  {
    name: "IEEE Spectrum",
    url: "https://spectrum.ieee.org/feeds/feed.rss",
    defaultCategory: "Emerging Technology",
  },
  {
    name: "Krebs on Security",
    url: "https://krebsonsecurity.com/feed/",
    defaultCategory: "Cybersecurity",
  },
  {
    name: "Phys.org Quantum",
    url: "https://phys.org/rss-feed/physics-news/quantum-physics/",
    defaultCategory: "Quantum Computing",
  },
  {
    name: "AWS Architecture Blog",
    url: "https://aws.amazon.com/blogs/architecture/feed/",
    defaultCategory: "Cloud / Infrastructure",
  },
];

// Licensed public images for deep tech categories (Unsplash free license / public domain)
const CATEGORY_DEFAULT_IMAGES: Record<string, { image_url: string; image_source: string; license: string }> = {
  "AI / Machine Learning": {
    image_url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop",
    image_source: "Unsplash (Steve Johnson)",
    license: "Unsplash License (Free Commercial Use)",
  },
  "Quantum Computing": {
    image_url: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=1200&auto=format&fit=crop",
    image_source: "Unsplash (Google Quantum AI Lab)",
    license: "Unsplash License (Free Commercial Use)",
  },
  "Cybersecurity": {
    image_url: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200&auto=format&fit=crop",
    image_source: "Unsplash (FlyD)",
    license: "Unsplash License (Free Commercial Use)",
  },
  "Space Technology": {
    image_url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop",
    image_source: "Unsplash / NASA Goddard",
    license: "Public Domain / Unsplash License",
  },
  "Cloud / Infrastructure": {
    image_url: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=1200&auto=format&fit=crop",
    image_source: "Unsplash (Israel Palacio)",
    license: "Unsplash License (Free Commercial Use)",
  },
  "Blockchain / Web3": {
    image_url: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=1200&auto=format&fit=crop",
    image_source: "Unsplash (Shubham Dhage)",
    license: "Unsplash License (Free Commercial Use)",
  },
  "Deep Tech Research": {
    image_url: "https://images.unsplash.com/photo-1507668077129-56e32842fceb?q=80&w=1200&auto=format&fit=crop",
    image_source: "Unsplash (ThisisEngineering)",
    license: "Unsplash License (Free Commercial Use)",
  },
  "Open Source / Developer Technology": {
    image_url: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop",
    image_source: "Unsplash (Fotis Fotopoulos)",
    license: "Unsplash License (Free Commercial Use)",
  },
  "Emerging Technology": {
    image_url: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop",
    image_source: "Unsplash (Alexandre Debiève)",
    license: "Unsplash License (Free Commercial Use)",
  },
};

/** Categorizes text based on Deep Tech keywords */
function categorizeText(title: string, content: string, defaultCat: string): string {
  const combined = (title + " " + content).toLowerCase();
  if (combined.includes("quantum") || combined.includes("qubit") || combined.includes("photonics")) {
    return "Quantum Computing";
  }
  if (combined.includes("space") || combined.includes("nasa") || combined.includes("satellite") || combined.includes("orbit") || combined.includes("lunar")) {
    return "Space Technology";
  }
  if (combined.includes("cyber") || combined.includes("security") || combined.includes("vulnerability") || combined.includes("malware") || combined.includes("zero trust")) {
    return "Cybersecurity";
  }
  if (combined.includes("ai") || combined.includes("artificial intelligence") || combined.includes("machine learning") || combined.includes("llm") || combined.includes("neural")) {
    return "AI / Machine Learning";
  }
  if (combined.includes("cloud") || combined.includes("infrastructure") || combined.includes("kubernetes") || combined.includes("serverless")) {
    return "Cloud / Infrastructure";
  }
  if (combined.includes("blockchain") || combined.includes("web3") || combined.includes("crypto") || combined.includes("smart contract")) {
    return "Blockchain / Web3";
  }
  if (combined.includes("research") || combined.includes("lab") || combined.includes("paper") || combined.includes("study")) {
    return "Deep Tech Research";
  }
  if (combined.includes("open source") || combined.includes("github") || combined.includes("developer") || combined.includes("sdk")) {
    return "Open Source / Developer Technology";
  }
  return defaultCat;
}

/** Utility to clean HTML tags and unescape strings */
function cleanHtmlText(raw: string): string {
  if (!raw) return "";
  return raw
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

/** Parses XML RSS items using lightweight regex */
function parseRssXml(xml: string, sourceName: string, defaultCategory: string) {
  const items: Array<{ title: string; link: string; summary: string; pubDate: string; imageUrl?: string }> = [];
  const itemMatches = xml.match(/<item[\s\S]*?<\/item>/gi) || xml.match(/<entry[\s\S]*?<\/entry>/gi) || [];

  for (const itemXml of itemMatches) {
    const titleMatch = itemXml.match(/<title>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/title>/i);
    const linkMatch = itemXml.match(/<link>([\s\S]*?)<\/link>/i) || itemXml.match(/<link[^>]+href=["'](.*?)["']/i);
    const descMatch = itemXml.match(/<description>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/description>/i) || itemXml.match(/<summary>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/summary>/i);
    const dateMatch = itemXml.match(/<pubDate>([\s\S]*?)<\/pubDate>/i) || itemXml.match(/<published>([\s\S]*?)<\/published>/i) || itemXml.match(/<updated>([\s\S]*?)<\/updated>/i);
    const imgMatch = itemXml.match(/<media:content[^>]+url=["'](.*?)["']/i) || itemXml.match(/<enclosure[^>]+url=["'](.*?)["']/i);

    const rawTitle = titleMatch ? titleMatch[1] : "";
    const rawLink = linkMatch ? linkMatch[1] : "";
    const rawDesc = descMatch ? descMatch[1] : "";
    const rawDate = dateMatch ? dateMatch[1] : new Date().toISOString();

    const title = cleanHtmlText(rawTitle);
    const link = rawLink.trim();
    const summary = cleanHtmlText(rawDesc).slice(0, 320);

    if (title && link) {
      items.push({
        title,
        link,
        summary: summary || `${title} — Latest technical briefing from ${sourceName}.`,
        pubDate: new Date(rawDate).toISOString(),
        imageUrl: imgMatch ? imgMatch[1] : undefined,
      });
    }
  }

  return items;
}

/**
 * Main function: Fetches RSS feeds, checks for duplicates against Google Sheets,
 * formats new articles, and appends them to the News tab in Google Sheets.
 */
export async function fetchAndSyncNews(): Promise<{ fetched: number; newAdded: number; items: NewsItem[] }> {
  await GoogleSheetsDB.ensureTab(SHEET_TABS.NEWS);

  // 1. Fetch existing rows to prevent duplicate insertion
  const existingRows = await GoogleSheetsDB.readRows(SHEET_TABS.NEWS);
  const existingUrls = new Set<string>();
  const existingTitles = new Set<string>();

  if (existingRows && existingRows.length > 1) {
    // Skip header row
    for (let i = 1; i < existingRows.length; i++) {
      const row = existingRows[i];
      const sourceUrl = row[5] ? row[5].trim().toLowerCase() : "";
      const title = row[1] ? row[1].trim().toLowerCase() : "";
      if (sourceUrl) existingUrls.add(sourceUrl);
      if (title) existingTitles.add(title);
    }
  }

  const newArticles: NewsItem[] = [];
  let totalFetched = 0;

  // 2. Query RSS feeds
  for (const src of RSS_SOURCES) {
    try {
      const response = await fetch(src.url, {
        headers: { "User-Agent": "DeepTechSocietyBot/1.0" },
        next: { revalidate: 1800 },
      });
      if (!response.ok) continue;

      const xmlText = await response.text();
      const parsedItems = parseRssXml(xmlText, src.name, src.defaultCategory);
      totalFetched += parsedItems.length;

      for (const item of parsedItems.slice(0, 5)) { // Process top 5 recent items per feed
        const normalizedUrl = item.link.toLowerCase();
        const normalizedTitle = item.title.toLowerCase();

        // Duplicate Check
        if (existingUrls.has(normalizedUrl) || existingTitles.has(normalizedTitle)) {
          continue;
        }

        const category = categorizeText(item.title, item.summary, src.defaultCategory);
        const imageConfig = CATEGORY_DEFAULT_IMAGES[category] || CATEGORY_DEFAULT_IMAGES["Emerging Technology"];

        const articleId = `news-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
        const newItem: NewsItem = {
          id: articleId,
          title: item.title,
          summary: item.summary,
          category,
          source: src.name,
          source_url: item.link,
          image_url: imageConfig.image_url,
          image_source: imageConfig.image_source,
          license: imageConfig.license,
          published_at: item.pubDate,
          featured: newArticles.length === 0 ? "true" : "false",
          status: "published",
          created_at: new Date().toISOString(),
        };

        newArticles.push(newItem);
        existingUrls.add(normalizedUrl);
        existingTitles.add(normalizedTitle);
      }
    } catch (err) {
      console.error(`[NewsFetcher] Failed to fetch feed ${src.name}:`, err);
    }
  }

  // 3. Append new rows to Google Sheets
  if (newArticles.length > 0) {
    const rowsToAppend = newArticles.map((art) => [
      art.id,
      art.title,
      art.summary,
      art.category,
      art.source,
      art.source_url,
      art.image_url,
      art.image_source,
      art.license,
      art.published_at,
      art.featured,
      art.status,
      art.created_at,
    ]);

    await GoogleSheetsDB.appendRows(SHEET_TABS.NEWS, rowsToAppend);
  }

  return {
    fetched: totalFetched,
    newAdded: newArticles.length,
    items: newArticles,
  };
}

/** Fetches published news items from Google Sheets with static fallback */
export async function getPublishedNews(): Promise<NewsItem[]> {
  try {
    await GoogleSheetsDB.ensureTab(SHEET_TABS.NEWS);
    const rows = await GoogleSheetsDB.readRows(SHEET_TABS.NEWS);

    if (!rows || rows.length <= 1) {
      return [];
    }

    const items: NewsItem[] = [];
    for (let i = 1; i < rows.length; i++) {
      const row = rows[i];
      if (!row || row.length < 10) continue;

      const [id, title, summary, category, source, source_url, image_url, image_source, license, published_at, featured, status, created_at] = row;

      if (status && status.toLowerCase() === "draft") continue;

      items.push({
        id: id || `news-${i}`,
        title: title || "Deep Tech Update",
        summary: summary || "",
        category: category || "Emerging Technology",
        source: source || "Deep Tech Society",
        source_url: source_url || "#",
        image_url: image_url || CATEGORY_DEFAULT_IMAGES["Emerging Technology"].image_url,
        image_source: image_source || "Unsplash",
        license: license || "Unsplash License",
        published_at: published_at || new Date().toISOString(),
        featured: featured || "false",
        status: status || "published",
        created_at: created_at || new Date().toISOString(),
      });
    }

    // Return sorted newest first
    return items.sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime());
  } catch (err) {
    console.error("[getPublishedNews] Error reading Google Sheets:", err);
    return [];
  }
}
