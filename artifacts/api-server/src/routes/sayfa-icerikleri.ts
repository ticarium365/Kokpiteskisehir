import { Router, type IRouter } from "express";
import { eq } from "drizzle-orm";
import { db, sayfaIcerikleriTable } from "@workspace/db";
import { requireAdmin } from "../middlewares/auth";
import { serializeRow, serializeRows } from "../lib/serialize";

const router: IRouter = Router();

router.get("/sayfa-icerikleri", async (req, res): Promise<void> => {
  const rows = await db.select().from(sayfaIcerikleriTable);
  res.json(serializeRows(rows));
});

router.get("/sayfa-icerikleri/:sayfa", async (req, res): Promise<void> => {
  const [icerik] = await db.select().from(sayfaIcerikleriTable).where(eq(sayfaIcerikleriTable.sayfa, req.params.sayfa));
  if (!icerik) { res.status(404).json({ error: "Sayfa içeriği bulunamadı" }); return; }
  res.json(serializeRow(icerik));
});

router.put("/sayfa-icerikleri/:sayfa", requireAdmin, async (req, res): Promise<void> => {
  const { baslik, altBaslik, icerik, ekIcerik, resimUrl } = req.body as Record<string, string | undefined>;
  if (!baslik || !icerik) { res.status(400).json({ error: "baslik ve icerik gerekli" }); return; }

  const existing = await db.select().from(sayfaIcerikleriTable).where(eq(sayfaIcerikleriTable.sayfa, req.params.sayfa));
  let row;
  if (existing.length > 0) {
    [row] = await db.update(sayfaIcerikleriTable)
      .set({ baslik, altBaslik: altBaslik ?? null, icerik, ekIcerik: ekIcerik ?? null, resimUrl: resimUrl ?? null })
      .where(eq(sayfaIcerikleriTable.sayfa, req.params.sayfa))
      .returning();
  } else {
    [row] = await db.insert(sayfaIcerikleriTable)
      .values({ sayfa: req.params.sayfa, baslik, altBaslik: altBaslik ?? null, icerik, ekIcerik: ekIcerik ?? null, resimUrl: resimUrl ?? null })
      .returning();
  }
  res.json(serializeRow(row));
});

export default router;
