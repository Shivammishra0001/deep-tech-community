import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, MapPin } from "lucide-react";
import { Container, Eyebrow, Card, Button } from "@/components/ui";
import { CHAPTERS } from "@/data/core";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const ch = CHAPTERS.find((c) => c.slug === slug);
  if (!ch) return { title: "Chapter Not Found" };
  return { title: `${ch.country} Chapter | Deep Tech Community`, description: `Deep Tech Community ${ch.country} chapter — ${ch.blurb}` };
}

export default async function ChapterPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const ch = CHAPTERS.find((c) => c.slug === slug);
  if (!ch) notFound();

  const others = CHAPTERS.filter((c) => c.slug !== ch.slug);

  return (
    <>
      {/* Header Banner */}
      <section className="relative overflow-hidden border-b border-border/80">
        <Container className="relative pt-6 pb-6 sm:pt-7 sm:pb-7 lg:pt-8 lg:pb-8">
          <div className="animate-rise">
            <Link
              href="/chapters"
              className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-muted hover:text-primary"
            >
              <ArrowLeft className="size-3.5" aria-hidden /> Return to Regional Chapters
            </Link>
            <div className="mt-4 sm:mt-5 flex flex-wrap items-center gap-5">
              <span className="text-4xl sm:text-5xl" role="img" aria-label={ch.country}>
                {ch.flag}
              </span>
              <div>
                <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-primary">
                  {ch.country} Chapter
                </h1>
                <p className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 font-sans text-sm font-semibold text-body">
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="size-3.5" aria-hidden /> {ch.city}
                  </span>
                  <span>Est. {ch.founded}</span>
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <Container className="grid gap-12 py-8 sm:py-10 lg:grid-cols-[1fr_340px]">
        <div className="min-w-0 space-y-12">
          {/* 1. Overview */}
          <section id="overview">
            <Eyebrow>Chapter Overview</Eyebrow>
            <div className="mt-4 space-y-4 text-sm leading-relaxed text-body-soft">
              {ch.about.map((p) => (
                <p key={p.slice(0, 32)}>{p}</p>
              ))}
            </div>
          </section>

        </div>

        {/* Sidebar */}
        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <Card>
            <p className="font-display text-base font-semibold tracking-tight text-primary">
              Join {ch.country} Chapter
            </p>
            <p className="mt-2 text-xs leading-relaxed text-secondary">
              Select “{ch.country}” as your primary region when you join to be connected with this chapter.
            </p>
            <div className="mt-4">
              <Button href="/join" variant="primary" size="md" className="w-full">
                Join the Community <ArrowRight className="size-3.5" />
              </Button>
            </div>
          </Card>

          <Card>
            <p className="font-mono text-xs font-semibold uppercase tracking-wider text-secondary">
              Other Regional Hubs
            </p>
            <div className="mt-3 space-y-2">
              {others.map((o) => (
                <Link
                  key={o.slug}
                  href={`/chapters/${o.slug}`}
                  className="group flex items-center justify-between rounded-md p-2 hover:bg-elevated"
                >
                  <span className="flex items-center gap-2 font-mono text-xs text-primary">
                    <span>{o.flag}</span>
                    <span>{o.country}</span>
                  </span>
                  <ArrowRight className="size-3 text-muted transition-transform group-hover:translate-x-0.5" />
                </Link>
              ))}
            </div>
          </Card>
        </aside>
      </Container>
    </>
  );
}
