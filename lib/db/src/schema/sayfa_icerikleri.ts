import { pgTable, text, serial, timestamp } from "drizzle-orm/pg-core";

export const sayfaIcerikleriTable = pgTable("sayfa_icerikleri", {
  id: serial("id").primaryKey(),
  sayfa: text("sayfa").notNull().unique(),
  baslik: text("baslik").notNull(),
  altBaslik: text("alt_baslik"),
  icerik: text("icerik").notNull(),
  ekIcerik: text("ek_icerik"),
  resimUrl: text("resim_url"),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
});

export type SayfaIcerigi = typeof sayfaIcerikleriTable.$inferSelect;
