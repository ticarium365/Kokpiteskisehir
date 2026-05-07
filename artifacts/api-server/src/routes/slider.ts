import { Router, type IRouter } from "express";
import { eq, asc } from "drizzle-orm";
import { db, sliderTable } from "@workspace/db";
import { requireAdmin } from "../middlewares/auth";
import { serializeRow, serializeRows } from "../lib/serialize";

const router: IRouter = Router();

router.get("/slider", async (req, res): Promise<void> => {
  let rows = await db.select().from(sliderTable).orderBy(asc(sliderTable.sira));
  const { yayinda } = req.query as { yayinda?: string };
  if (yayinda === "true") rows = rows.filter(r => r.yayinda);
  else if (yayinda === "false") rows = rows.filter(r => !r.yayinda);
  res.json(serializeRows(rows));
});

router.post("/slider", requireAdmin, async (req, res): Promise<void> => {
  const { baslik, altBaslik, resimUrl, butonYazi, butonLink, sira, yayinda } = req.body as Record<string, unknown>;
  if (!baslik || !resimUrl) { res.status(400).json({ error: "baslik ve resimUrl gerekli" }); return; }
  const [slider] = await db.insert(sliderTable).values({
    baslik: baslik as string,
    altBaslik: (altBaslik as string) ?? null,
    resimUrl: resimUrl as string,
    butonYazi: (butonYazi as string) ?? null,
    butonLink: (butonLink as string) ?? null,
    sira: (sira as number) ?? 0,
    yayinda: (yayinda as boolean) ?? true,
  }).returning();
  res.status(201).json(serializeRow(slider));
});

router.patch("/slider/:id", requireAdmin, async (req, res): Promise<void> => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) { res.status(400).json({ error: "Geçersiz id" }); return; }
  const data = req.body as Partial<typeof sliderTable.$inferInsert>;
  const [slider] = await db.update(sliderTable).set(data).where(eq(sliderTable.id, id)).returning();
  if (!slider) { res.status(404).json({ error: "Slider bulunamadı" }); return; }
  res.json(serializeRow(slider));
});

router.delete("/slider/:id", requireAdmin, async (req, res): Promise<void> => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) { res.status(400).json({ error: "Geçersiz id" }); return; }
  const [slider] = await db.delete(sliderTable).where(eq(sliderTable.id, id)).returning();
  if (!slider) { res.status(404).json({ error: "Slider bulunamadı" }); return; }
  res.sendStatus(204);
});

export default router;
