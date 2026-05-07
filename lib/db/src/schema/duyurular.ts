import { pgTable, text, serial, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const duyurularTable = pgTable("duyurular", {
  id: serial("id").primaryKey(),
  baslik: text("baslik").notNull(),
  icerik: text("icerik").notNull(),
  onemli: boolean("onemli").notNull().default(false),
  yayinda: boolean("yayinda").notNull().default(true),
  yayinTarihi: timestamp("yayin_tarihi", { withTimezone: true }).notNull().defaultNow(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
});

export const insertDuyuruSchema = createInsertSchema(duyurularTable).omit({ id: true, createdAt: true, updatedAt: true });
export type InsertDuyuru = z.infer<typeof insertDuyuruSchema>;
export type Duyuru = typeof duyurularTable.$inferSelect;
