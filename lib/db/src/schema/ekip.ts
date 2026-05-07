import { pgTable, text, serial, timestamp, boolean, integer } from "drizzle-orm/pg-core";

export const ekipTable = pgTable("ekip", {
  id: serial("id").primaryKey(),
  ad: text("ad").notNull(),
  unvan: text("unvan").notNull(),
  bolum: text("bolum"),
  resimUrl: text("resim_url"),
  email: text("email"),
  telefon: text("telefon"),
  biyografi: text("biyografi"),
  sira: integer("sira").notNull().default(0),
  yayinda: boolean("yayinda").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
});

export type Ekip = typeof ekipTable.$inferSelect;
