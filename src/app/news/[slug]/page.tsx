import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";
import { Container, DomainBadge, Avatar, Tag, Card, Button } from "@/components/ui";
import { ARTICLES, relatedArticles } from "@/data/news";
import { DOMAINS } from "@/data/core";
import { ArticleDetailPageActions } from "@/components/news-actions";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = ARTICLES.find((a) => a.slug === slug);
  if (!article) return { title: "Briefing Not Found" };
  return { title: `${article.title} | Deep Tech Society`, description: article.excerpt };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = ARTICLES.find((a) => a.slug === slug);
  if (!article) notFound();

  const related = relatedArticles(article);

  return (
    <>
      {/* Banner */}
      <section className="relative overflow-hidden border-b border-neutral-200/80 dark:border-neutral-800/80">
        <div className="bg-grid bg-grid-fade absolute inset-0" aria-hidden />
        <Container className="relative py-16 sm:py-20">
          <div className="max-w-3xl animate-rise">
            <Link
              href="/news"
              className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100"
            >
              <ArrowLeft className="size-3.5" aria-hidden /> All Briefings
            </Link>
            <div className="mt-4 flex items-center gap-3">
              <DomainBadge domain={article.domain} />
              <span className="inline-flex items-center gap-1.5 font-mono text-xs text-neutral-500">
                <Clock className="size-3.5" aria-hidden /> {article.readingTime} min read
              </span>
            </div>
            <h1 className="mt-4 font-display text-3xl font-semibold leading-[1.12] tracking-tight text-neutral-900 dark:text-neutral-100 sm:text-4xl">
              {article.title}
            </h1>
            <div className="mt-6 flex items-center gap-3">
              <Avatar name={article.author} className="size-9" />
              <div>
                <p className="font-display text-sm font-semibold text-neutral-900 dark:text-neutral-100">{article.author}</p>
                <p className="font-mono text-xs text-neutral-500">
                  {article.authorRole} · {article.date}
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Body */}
      <Container className="py-16">
        <div className="grid gap-12 lg:grid-cols-[1fr_300px]">
          <article className="mx-auto w-full max-w-2xl lg:mx-0 lg:max-w-none">
            {article.image && (
              <div className="mb-8 relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-neutral-200/80 dark:border-neutral-800/80 bg-neutral-900 shadow-md">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={article.image}
                  alt={article.title}
                  className="size-full object-cover"
                />
              </div>
            )}
            <p className="font-display text-lg font-medium leading-relaxed text-neutral-800 dark:text-neutral-200">{article.excerpt}</p>
            <div className="mt-8 space-y-6">
              {article.body.map((para) => (
                <p key={para.slice(0, 32)} className="text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
                  {para}
                </p>
              ))}
            </div>
            <div className="mt-10 flex flex-wrap gap-2 border-t border-neutral-200/80 pt-6 dark:border-neutral-800/80">
              {article.tags.map((t) => (
                <Tag key={t}>{t}</Tag>
              ))}
            </div>

            {/* Author card */}
            <Card className="mt-8 flex items-center gap-4">
              <Avatar name={article.author} className="size-10" />
              <div>
                <p className="font-display text-sm font-semibold text-neutral-900 dark:text-neutral-100">{article.author}</p>
                <p className="font-mono text-xs text-neutral-500">{article.authorRole}</p>
                <p className="mt-1 text-xs text-neutral-400">
                  Authored for Deep Tech Community technical library.
                </p>
              </div>
            </Card>

            {/* Interactive Actions & Discussion: Like, Comment, Share, Save */}
            <ArticleDetailPageActions title={article.title} slug={article.slug} />
          </article>

          {/* Sidebar */}
          <aside className="space-y-6">
            <div>
              <p className="font-mono text-xs font-semibold uppercase tracking-wider text-neutral-400">
                Related Briefings
              </p>
              <div className="mt-3 space-y-3">
                {related.map((r) => (
                  <Card key={r.slug} hover className="group">
                    <DomainBadge domain={r.domain} />
                    <p className="mt-2 font-display text-xs font-semibold leading-snug tracking-tight text-neutral-900 group-hover:underline dark:text-neutral-100">
                      <Link href={`/news/${r.slug}`}>{r.title}</Link>
                    </p>
                    <p className="mt-1 font-mono text-[10px] text-neutral-400">
                      {r.date} · {r.readingTime} min
                    </p>
                  </Card>
                ))}
              </div>
            </div>
            <Card>
              <p className="font-display text-sm font-semibold text-neutral-900 dark:text-neutral-100">Subscribe to Briefings</p>
              <p className="mt-1.5 text-xs text-neutral-600 dark:text-neutral-400">
                Monthly technical digest delivered to verified members.
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
