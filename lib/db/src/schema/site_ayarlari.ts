import { pgTable, text, serial, timestamp } from "drizzle-orm/pg-core";

export const siteAyarlariTable = pgTable("site_ayarlari", {
  id: serial("id").primaryKey(),
  anahtar: text("anahtar").notNull().unique(),
  deger: text("deger").notNull(),
  aciklama: text("aciklama"),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
});

export type SiteAyar = typeof siteAyarlariTable.$inferSelect;
