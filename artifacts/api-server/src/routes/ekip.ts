import { Router, type IRouter } from "express";
import { eq, asc } from "drizzle-orm";
import { db, ekipTable } from "@workspace/db";
import { requireAdmin } from "../middlewares/auth";
import { serializeRow, serializeRows } from "../lib/serialize";

const router: IRouter = Router();

router.get("/ekip", async (req, res): Promise<void> => {
  let rows = await db.select().from(ekipTable).orderBy(asc(ekipTable.sira));
  const { yayinda, bolum } = req.query as { yayinda?: string; bolum?: string };
  if (yayinda === "true") rows = rows.filter(r => r.yayinda);
  else if (yayinda === "false") rows = rows.filter(r => !r.yayinda);
  if (bolum) rows = rows.filter(r => r.bolum === bolum);
  res.json(serializeRows(rows));
});

router.post("/ekip", requireAdmin, async (req, res): Promise<void> => {
  const { ad, unvan, bolum, resimUrl, email, telefon, biyografi, sira, yayinda } = req.body as Record<string, unknown>;
  if (!ad || !unvan) { res.status(400).json({ error: "ad ve unvan gerekli" }); return; }
  const [uye] = await db.insert(ekipTable).values({
    ad: ad as string, unvan: unvan as string,
    bolum: (bolum as string) ?? null,
    resimUrl: (resimUrl as string) ?? null,
    email: (email as string) ?? null,
    telefon: (telefon as string) ?? null,
    biyografi: (biyografi as string) ?? null,
    sira: (sira as number) ?? 0,
    yayinda: (yayinda as boolean) ?? true,
  }).returning();
  res.status(201).json(serializeRow(uye));
});

router.patch("/ekip/:id", requireAdmin, async (req, res): Promise<void> => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) { res.status(400).json({ error: "Geçersiz id" }); return; }
  const [uye] = await db.update(ekipTable).set(req.body as Partial<typeof ekipTable.$inferInsert>).where(eq(ekipTable.id, id)).returning();
  if (!uye) { res.status(404).json({ error: "Üye bulunamadı" }); return; }
  res.json(serializeRow(uye));
});

router.delete("/ekip/:id", requireAdmin, async (req, res): Promise<void> => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) { res.status(400).json({ error: "Geçersiz id" }); return; }
  const [uye] = await db.delete(ekipTable).where(eq(ekipTable.id, id)).returning();
  if (!uye) { res.status(404).json({ error: "Üye bulunamadı" }); return; }
  res.sendStatus(204);
});

export default router;
