import { pgTable, text, serial, timestamp, boolean } from "drizzle-orm/pg-core";

export const kullanicilarTable = pgTable("kullanicilar", {
  id: serial("id").primaryKey(),
  ad: text("ad").notNull(),
  soyad: text("soyad").notNull(),
  email: text("email").notNull().unique(),
  telefon: text("telefon"),
  rol: text("rol").notNull().default("veli"),
  sinif: text("sinif"),
  sifre: text("sifre").notNull(),
  aktif: boolean("aktif").notNull().default(true),
  notlar: text("notlar"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
});

export type Kullanici = typeof kullanicilarTable.$inferSelect;
