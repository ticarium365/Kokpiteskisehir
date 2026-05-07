import { Router, type IRouter } from "express";
import { eq } from "drizzle-orm";
import { db, kullanicilarTable } from "@workspace/db";
import { requireAdmin } from "../middlewares/auth";
import { serializeRow, serializeRows } from "../lib/serialize";

const router: IRouter = Router();

function maskPassword<T extends Record<string, unknown>>(row: T): T {
  const { sifre: _, ...rest } = row as Record<string, unknown>;
  return rest as T;
}

router.get("/kullanicilar", requireAdmin, async (req, res): Promise<void> => {
  let rows = await db.select().from(kullanicilarTable);
  const { rol, aktif } = req.query as { rol?: string; aktif?: string };
  if (rol) rows = rows.filter(r => r.rol === rol);
  if (aktif === "true") rows = rows.filter(r => r.aktif);
  else if (aktif === "false") rows = rows.filter(r => !r.aktif);
  res.json(serializeRows(rows).map(maskPassword));
});

router.post("/kullanicilar", requireAdmin, async (req, res): Promise<void> => {
  const { ad, soyad, email, telefon, rol, sinif, sifre, aktif, notlar } = req.body as Record<string, unknown>;
  if (!ad || !soyad || !email || !sifre) {
    res.status(400).json({ error: "ad, soyad, email ve sifre gerekli" }); return;
  }

  const existing = await db.select().from(kullanicilarTable).where(eq(kullanicilarTable.email, email as string));
  if (existing.length > 0) { res.status(409).json({ error: "Bu e-posta zaten kayıtlı" }); return; }

  const [kullanici] = await db.insert(kullanicilarTable).values({
    ad: ad as string, soyad: soyad as string,
    email: email as string,
    telefon: (telefon as string) ?? null,
    rol: (rol as string) ?? "veli",
    sinif: (sinif as string) ?? null,
    sifre: sifre as string,
    aktif: (aktif as boolean) ?? true,
    notlar: (notlar as string) ?? null,
  }).returning();

  res.status(201).json(maskPassword(serializeRow(kullanici)));
});

router.patch("/kullanicilar/:id", requireAdmin, async (req, res): Promise<void> => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) { res.status(400).json({ error: "Geçersiz id" }); return; }

  const data = { ...req.body } as Partial<typeof kullanicilarTable.$inferInsert>;
  const [kullanici] = await db.update(kullanicilarTable).set(data).where(eq(kullanicilarTable.id, id)).returning();
  if (!kullanici) { res.status(404).json({ error: "Kullanıcı bulunamadı" }); return; }
  res.json(maskPassword(serializeRow(kullanici)));
});

router.delete("/kullanicilar/:id", requireAdmin, async (req, res): Promise<void> => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) { res.status(400).json({ error: "Geçersiz id" }); return; }
  const [kullanici] = await db.delete(kullanicilarTable).where(eq(kullanicilarTable.id, id)).returning();
  if (!kullanici) { res.status(404).json({ error: "Kullanıcı bulunamadı" }); return; }
  res.sendStatus(204);
});

export default router;
