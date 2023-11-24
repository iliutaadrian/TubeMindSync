import { sql } from "@vercel/postgres";
import {
    integer,
    pgTable,
    serial,
    text,
    timestamp
} from "drizzle-orm/pg-core";
import { drizzle } from "drizzle-orm/vercel-postgres";

export const ProjectTable = pgTable(
  "projects",
  {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    user_id: text("user_id").notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    availableLanguages: text("availableLanguages").notNull(),
    defaultLanguage: text("defaultLanguage").notNull(),
    translated_url: text("translated_url"),
  },
);

export const ProjectFileTable = pgTable(
  "project_files",
  {
    id: serial("id").primaryKey(),
    project_id: integer("project_id").notNull(),
    name: text("name").notNull(),
    path: text("path"),
    translated_url: text("translated_url"),
    content: text("content").notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
  },
);

export const EntryTable = pgTable(
  "entries",
  {
    id: serial("id").primaryKey(),
    project_id: integer("project_id").notNull(),
    project_file_id: integer("project_file_id").notNull(),
    key: text("key").notNull(),
    value: text("value").notNull(),
    note: text("note").notNull(),
    status: text("status").notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
  },
);

export const EntryTranslationTable = pgTable(
  "entry_translations",
  {
    id: serial("id").primaryKey(),
    entry_id: integer("entry_id").notNull().references(() => EntryTable.id),
    language: text("language").notNull(),
    value: text("value").notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
  },
);
export const UserSubscriptionTable = pgTable(
  "user_subscription",
  {
    id: serial("id").primaryKey(),
    user_id: text("userId").notNull().unique(),
    stripeCustomerId: text("stripeCustomerId").notNull().unique(),
    stripeSubscriptionId: text("stripeSubscriptionId").notNull().unique(),
    stripePriceId: text("stripePriceId").unique(),
    stripeCurrentPeriodEnd: timestamp("stripeCurrentPeriodEnd"),
  },
);

export type Project = typeof ProjectTable.$inferSelect;
export type ProjectFile = typeof ProjectFileTable.$inferSelect;
export type Entry = typeof EntryTable.$inferSelect;
export type EntryTranslation = typeof EntryTranslationTable.$inferSelect;
export type UserSubscription = typeof UserSubscriptionTable.$inferSelect;

// Connect to Vercel Postgres
export const db = drizzle(sql);
