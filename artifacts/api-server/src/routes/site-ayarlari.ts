import { Router, type IRouter } from "express";
import { eq } from "drizzle-orm";
import { db, siteAyarlariTable } from "@workspace/db";
import { requireAdmin } from "../middlewares/auth";
import { serializeRow, serializeRows } from "../lib/serialize";

const router: IRouter = Router();

router.get("/site-ayarlari", async (req, res): Promise<void> => {
  const rows = await db.select().from(siteAyarlariTable);
  res.json(serializeRows(rows));
});

router.get("/site-ayarlari/:anahtar", async (req, res): Promise<void> => {
  const [ayar] = await db.select().from(siteAyarlariTable).where(eq(siteAyarlariTable.anahtar, req.params.anahtar));
  if (!ayar) { res.status(404).json({ error: "Ayar bulunamadı" }); return; }
  res.json(serializeRow(ayar));
});

router.put("/site-ayarlari/:anahtar", requireAdmin, async (req, res): Promise<void> => {
  const { deger, aciklama } = req.body as { deger: string; aciklama?: string };
  if (!deger && deger !== "") { res.status(400).json({ error: "deger gerekli" }); return; }

  const existing = await db.select().from(siteAyarlariTable).where(eq(siteAyarlariTable.anahtar, req.params.anahtar));
  let ayar;
  if (existing.length > 0) {
    [ayar] = await db.update(siteAyarlariTable)
      .set({ deger, ...(aciklama !== undefined && { aciklama }) })
      .where(eq(siteAyarlariTable.anahtar, req.params.anahtar))
      .returning();
  } else {
    [ayar] = await db.insert(siteAyarlariTable)
      .values({ anahtar: req.params.anahtar, deger, aciklama })
      .returning();
  }
  res.json(serializeRow(ayar));
});

router.post("/site-ayarlari/bulk", requireAdmin, async (req, res): Promise<void> => {
  const ayarlar = req.body as Record<string, string>;
  const results = [];
  for (const [anahtar, deger] of Object.entries(ayarlar)) {
    const existing = await db.select().from(siteAyarlariTable).where(eq(siteAyarlariTable.anahtar, anahtar));
    let ayar;
    if (existing.length > 0) {
      [ayar] = await db.update(siteAyarlariTable).set({ deger }).where(eq(siteAyarlariTable.anahtar, anahtar)).returning();
    } else {
      [ayar] = await db.insert(siteAyarlariTable).values({ anahtar, deger }).returning();
    }
    results.push(serializeRow(ayar));
  }
  res.json(results);
});

export default router;
