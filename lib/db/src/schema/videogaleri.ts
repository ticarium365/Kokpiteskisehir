import { pgTable, text, serial, timestamp, boolean, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const videoGaleriTable = pgTable("video_galeri", {
  id: serial("id").primaryKey(),
  baslik: text("baslik").notNull(),
  youtubeId: text("youtube_id").notNull(),
  kategori: text("kategori").notNull().default("genel"),
  yayinda: boolean("yayinda").notNull().default(true),
  sira: integer("sira").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
});

export const insertVideoGaleriSchema = createInsertSchema(videoGaleriTable).omit({ id: true, createdAt: true, updatedAt: true });
export type InsertVideoGaleri = z.infer<typeof insertVideoGaleriSchema>;
export type VideoGaleri = typeof videoGaleriTable.$inferSelect;
