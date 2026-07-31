import {
  pgTable,
  serial,
  text,
  integer,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";

export const members = pgTable(
  "members",
  {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull(),
    role: text("role").notNull(),
    domain: text("domain").notNull(),
    chapter: text("chapter").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (t) => [uniqueIndex("members_email_idx").on(t.email)],
);

export const communityPosts = pgTable("community_posts", {
  id: serial("id").primaryKey(),
  author: text("author").notNull(),
  authorRole: text("author_role").notNull(),
  kind: text("kind").notNull(), // article | question | project | achievement
  domain: text("domain").notNull(), // ai | quantum | cybersecurity | space
  title: text("title").notNull(),
  body: text("body").notNull(),
  image: text("image"),
  tags: text("tags").array().notNull().default([]),
  likes: integer("likes").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const postComments = pgTable("post_comments", {
  id: serial("id").primaryKey(),
  postId: integer("post_id")
    .notNull()
    .references(() => communityPosts.id, { onDelete: "cascade" }),
  author: text("author").notNull(),
  body: text("body").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const newsletterSubscriptions = pgTable(
  "newsletter_subscriptions",
  {
    id: serial("id").primaryKey(),
    email: text("email").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (t) => [uniqueIndex("newsletter_email_idx").on(t.email)],
);

export const eventRegistrations = pgTable(
  "event_registrations",
  {
    id: serial("id").primaryKey(),
    eventSlug: text("event_slug").notNull(),
    name: text("name").notNull(),
    email: text("email").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (t) => [uniqueIndex("reg_event_email_idx").on(t.eventSlug, t.email)],
);
