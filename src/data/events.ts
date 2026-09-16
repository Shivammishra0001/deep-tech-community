import type { DomainSlug } from "@/data/core";

export type EventType = "Conference" | "Workshop" | "Meetup" | "Webinar";

export type TechEvent = {
  slug: string;
  title: string;
  type: EventType;
  domains: DomainSlug[];
  date: string;
  time: string;
  venue: string;
  format: "In-person" | "Online" | "Hybrid";
  capacity: string;
  price: string;
  description: string[];
  agenda: { time: string; title: string; speaker?: string }[];
  speakers: { name: string; role: string }[];
  faqs: { q: string; a: string }[];
  featured?: boolean;
};

export function isUpcomingEvent(dateStr: string): boolean {
  // A date range ("May 22–23, 2026") collapses to its LAST day, so a multi-day
  // event stays "upcoming" until it has finished. Handles both the en dash used
  // in the data and a plain hyphen.
  const cleaned = dateStr.replace(/(\w+)\s+\d+\s*[–-]\s*(\d+),\s*(\d+)/, "$1 $2, $3");
  const parsed = Date.parse(cleaned);
  if (Number.isNaN(parsed)) return false;

  // Compare against the start of today so an event happening today still counts
  // as upcoming for the whole day.
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);
  return parsed >= startOfToday.getTime();
}

/**
 * Scheduled events.
 *
 * Empty until real events are confirmed. The events pages and the homepage
 * section both render a designed empty state when there is nothing upcoming.
 */
export const EVENTS: TechEvent[] = [];
