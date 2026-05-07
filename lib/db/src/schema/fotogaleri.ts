import { pgTable, text, serial, timestamp, boolean, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const fotoGaleriTable = pgTable("foto_galeri", {
  id: serial("id").primaryKey(),
  baslik: text("baslik").notNull(),
  resimUrl: text("resim_url").notNull(),
  kategori: text("kategori").notNull().default("genel"),
  yayinda: boolean("yayinda").notNull().default(true),
  sira: integer("sira").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
});

export const insertFotoGaleriSchema = createInsertSchema(fotoGaleriTable).omit({ id: true, createdAt: true, updatedAt: true });
export type InsertFotoGaleri = z.infer<typeof insertFotoGaleriSchema>;
export type FotoGaleri = typeof fotoGaleriTable.$inferSelect;
