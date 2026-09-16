import Link from "next/link";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";
import { Container, DomainBadge, Avatar, Tag, Card, Button } from "@/components/ui";
import { SafeImage } from "@/components/safe-image";
import { ARTICLES, relatedArticles, Article } from "@/data/news";
import { ArticleDetailPageActions } from "@/components/news-actions";
import { getPublishedNews } from "@/lib/news-fetcher";
import type { Metadata } from "next";
import type { DomainSlug } from "@/data/core";

export async function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = ARTICLES.find((a) => a.slug === slug);
  if (article) {
    return { title: `${article.title} | Deep Tech Society`, description: article.excerpt };
  }
  return { title: "Briefing | Deep Tech Society", description: "Technical briefing and research analysis." };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let article: Article | undefined = ARTICLES.find((a) => a.slug === slug);

  // If not in static dataset, check published news from database
  if (!article) {
    const dbArticles = await getPublishedNews();
    const dbMatch = dbArticles.find((a) => a.id === slug || a.title.toLowerCase().replace(/[^a-z0-9]+/g, "-") === slug);
    if (dbMatch) {
      const domainMap: Record<string, DomainSlug> = {
        "AI / Machine Learning": "ai",
        "Quantum Computing": "quantum",
        "Cybersecurity": "cybersecurity",
        "AI Governance": "governance",
      };

      article = {
        slug: dbMatch.id,
        domain: domainMap[dbMatch.category] || "ai",
        title: dbMatch.title,
        excerpt: dbMatch.summary,
        body: [
          dbMatch.summary,
          `Source publication: ${dbMatch.source}. Original technical report available at: ${dbMatch.source_url}`,
        ],
        author: dbMatch.source,
        authorRole: "Verified Feed Partner",
        date: new Date(dbMatch.published_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
        readingTime: 4,
        tags: [dbMatch.category.toLowerCase().replace(/\s+/g, "-")],
        image: dbMatch.image_url,
      };
    }
  }

  // Fallback UI if article is missing
  if (!article) {
    return (
      <Container className="py-20 text-center">
        <div className="mx-auto max-w-md rounded-2xl border p-8 border-border bg-card shadow-md">
          <p className="font-mono text-xs uppercase font-bold text-secondary">Briefing Unavailable</p>
          <h1 className="mt-3 font-display text-xl font-bold text-primary">
            Article Not Found
          </h1>
          <p className="mt-2 text-xs text-secondary">
            This technical briefing may have been updated or archived.
          </p>
          <div className="mt-6">
            <Button href="/news" variant="primary" size="sm">
              <ArrowLeft className="size-3.5" /> Back to News Section
            </Button>
          </div>
        </div>
      </Container>
    );
  }

  const related = relatedArticles(article);

  return (
    <>
      {/* Banner */}
      <section className="relative overflow-hidden border-b border-border/80">
        <Container className="relative pt-6 pb-6 sm:pt-7 sm:pb-7 lg:pt-8 lg:pb-8">
          <div className="max-w-3xl animate-rise">
            <Link
              href="/news"
              className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-muted hover:text-primary transition-colors"
            >
              <ArrowLeft className="size-3.5" aria-hidden /> All Briefings
            </Link>
            <div className="mt-3 flex items-center gap-3">
              <DomainBadge domain={article.domain} />
              <span className="inline-flex items-center gap-1.5 font-mono text-xs text-muted">
                <Clock className="size-3.5" aria-hidden /> {article.readingTime} min read
              </span>
            </div>
            <h1 className="mt-2.5 sm:mt-3 font-display text-2xl sm:text-3xl lg:text-4xl font-semibold leading-[1.12] tracking-tight text-primary">
              {article.title}
            </h1>
            <div className="mt-4 sm:mt-5 flex items-center gap-3">
              <Avatar name={article.author} className="size-9 font-bold" />
              <div>
                <p className="font-display text-sm font-semibold text-primary">{article.author}</p>
                <p className="font-mono text-xs text-muted">
                  {article.authorRole} · {article.date}
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Body */}
      <Container className="py-8 sm:py-10">
        <div className="grid gap-12 lg:grid-cols-[1fr_300px]">
          <article className="mx-auto w-full max-w-2xl lg:mx-0 lg:max-w-none">
            {article.image && (
              <div className="mb-8 relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-border/80 bg-card shadow-md">
                <SafeImage
                  src={article.image}
                  alt={article.title}
                  className="size-full object-cover"
                />
              </div>
            )}
            <p className="font-display text-lg font-medium leading-relaxed text-body">{article.excerpt}</p>
            <div className="mt-8 space-y-6">
              {article.body.map((para) => (
                <p key={para.slice(0, 32)} className="text-sm leading-relaxed text-body-soft">
                  {para}
                </p>
              ))}
            </div>
            <div className="mt-10 flex flex-wrap gap-2 border-t pt-6 border-border/80">
              {article.tags.map((t) => (
                <Tag key={t}>{t}</Tag>
              ))}
            </div>

            {/* Author card */}
            <Card className="mt-8 flex items-center gap-4">
              <Avatar name={article.author} className="size-10 font-bold" />
              <div>
                <p className="font-display text-sm font-semibold text-primary">{article.author}</p>
                <p className="font-mono text-xs text-muted">{article.authorRole}</p>
                <p className="mt-1 text-xs text-secondary">
                  Authored for Deep Tech Community technical library.
                </p>
              </div>
            </Card>

            {/* Interactive Actions & Discussion */}
            <ArticleDetailPageActions title={article.title} slug={article.slug} />
          </article>

          {/* Sidebar */}
          <aside className="space-y-6">
            <div>
              <p className="font-mono text-xs font-semibold uppercase tracking-wider text-secondary">
                Related Briefings
              </p>
              <div className="mt-3 space-y-3">
                {related.map((r) => (
                  <Card key={r.slug} hover className="group">
                    <DomainBadge domain={r.domain} />
                    <p className="mt-2 font-display text-xs font-semibold leading-snug tracking-tight group-hover:underline text-primary">
                      <Link href={`/news/${r.slug}`}>{r.title}</Link>
                    </p>
                    <p className="mt-1 font-mono text-[10px] text-secondary">
                      {r.date} · {r.readingTime} min
                    </p>
                  </Card>
                ))}
              </div>
            </div>
            <Card>
              <p className="font-display text-sm font-semibold text-primary">Subscribe to Briefings</p>
              <p className="mt-1.5 text-xs text-secondary">
                Technical digests from across the community.
              </p>
              <div className="mt-4">
                <Button href="/join" variant="primary" size="sm" className="w-full">
                  Join Society <ArrowRight className="size-3.5" />
                </Button>
              </div>
            </Card>
          </aside>
        </div>
      </Container>
    </>
  );
}
