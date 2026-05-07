import { pgTable, text, serial, timestamp, boolean, integer } from "drizzle-orm/pg-core";

export const sliderTable = pgTable("slider", {
  id: serial("id").primaryKey(),
  baslik: text("baslik").notNull(),
  altBaslik: text("alt_baslik"),
  resimUrl: text("resim_url").notNull(),
  butonYazi: text("buton_yazi"),
  butonLink: text("buton_link"),
  sira: integer("sira").notNull().default(0),
  yayinda: boolean("yayinda").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
});

export type Slider = typeof sliderTable.$inferSelect;
