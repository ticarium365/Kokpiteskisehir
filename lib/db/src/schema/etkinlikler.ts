import { pgTable, text, serial, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const etkinliklerTable = pgTable("etkinlikler", {
  id: serial("id").primaryKey(),
  baslik: text("baslik").notNull(),
  aciklama: text("aciklama").notNull(),
  resimUrl: text("resim_url"),
  tarih: timestamp("tarih", { withTimezone: true }).notNull().defaultNow(),
  yer: text("yer"),
  kategori: text("kategori").notNull().default("genel"),
  yayinda: boolean("yayinda").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
});

export const insertEtkinlikSchema = createInsertSchema(etkinliklerTable).omit({ id: true, createdAt: true, updatedAt: true });
export type InsertEtkinlik = z.infer<typeof insertEtkinlikSchema>;
export type Etkinlik = typeof etkinliklerTable.$inferSelect;
