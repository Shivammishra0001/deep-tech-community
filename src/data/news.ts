import type { DomainSlug } from "@/data/core";

export type Article = {
  slug: string;
  domain: DomainSlug;
  title: string;
  excerpt: string;
  body: string[];
  author: string;
  authorRole: string;
  date: string;
  readingTime: number;
  tags: string[];
  image: string;
  featured?: boolean;
};

/**
 * Published articles.
 *
 * Empty until real, attributable material exists. `/news` reads live articles
 * from the Google Sheets pipeline and only falls back to this list, so leaving
 * it empty is safe: every consumer renders an empty state instead.
 */
export const ARTICLES: Article[] = [];

export function relatedArticles(article: Article, count = 3): Article[] {
  return ARTICLES.filter((a) => a.slug !== article.slug)
    .sort((a, b) => {
      const aScore = (a.domain === article.domain ? 10 : 0) + a.tags.filter((t) => article.tags.includes(t)).length;
      const bScore = (b.domain === article.domain ? 10 : 0) + b.tags.filter((t) => article.tags.includes(t)).length;
      return bScore - aScore;
    })
    .slice(0, count);
}
