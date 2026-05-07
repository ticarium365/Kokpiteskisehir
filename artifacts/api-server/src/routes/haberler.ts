import { Router, type IRouter } from "express";
import { eq, desc } from "drizzle-orm";
import { db, haberlerTable } from "@workspace/db";
import {
  CreateHaberBody,
  UpdateHaberBody,
  GetHaberParams,
  UpdateHaberParams,
  DeleteHaberParams,
  ListHaberlerQueryParams,
} from "@workspace/api-zod";
import { requireAdmin } from "../middlewares/auth";
import { serializeRow, serializeRows } from "../lib/serialize";

const router: IRouter = Router();

router.get("/haberler", async (req, res): Promise<void> => {
  const query = ListHaberlerQueryParams.safeParse(req.query);
  let rows = await db.select().from(haberlerTable).orderBy(desc(haberlerTable.yayinTarihi));

  if (query.success) {
    if (query.data.yayinda === "true") rows = rows.filter((r) => r.yayinda === true);
    else if (query.data.yayinda === "false") rows = rows.filter((r) => r.yayinda === false);
    if (query.data.kategori) rows = rows.filter((r) => r.kategori === query.data.kategori);
  }

  res.json(serializeRows(rows));
});

router.post("/haberler", requireAdmin, async (req, res): Promise<void> => {
  const parsed = CreateHaberBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const data = parsed.data;
  const [haber] = await db.insert(haberlerTable).values({
    baslik: data.baslik,
    ozet: data.ozet,
    icerik: data.icerik,
    resimUrl: data.resimUrl ?? null,
    kategori: data.kategori ?? "genel",
    yayinda: data.yayinda ?? true,
    onemli: data.onemli ?? false,
    yayinTarihi: data.yayinTarihi ? new Date(data.yayinTarihi) : new Date(),
  }).returning();

  res.status(201).json(serializeRow(haber));
});

router.get("/haberler/:id", async (req, res): Promise<void> => {
  const params = GetHaberParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const [haber] = await db.select().from(haberlerTable).where(eq(haberlerTable.id, params.data.id));
  if (!haber) {
    res.status(404).json({ error: "Haber bulunamadı" });
    return;
  }

  res.json(serializeRow(haber));
});

router.patch("/haberler/:id", requireAdmin, async (req, res): Promise<void> => {
  const params = UpdateHaberParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const parsed = UpdateHaberBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const data = parsed.data;
  const updateData: Partial<typeof haberlerTable.$inferInsert> = {};
  if (data.baslik != null) updateData.baslik = data.baslik;
  if (data.ozet != null) updateData.ozet = data.ozet;
  if (data.icerik != null) updateData.icerik = data.icerik;
  if ("resimUrl" in data) updateData.resimUrl = data.resimUrl ?? null;
  if (data.kategori != null) updateData.kategori = data.kategori;
  if (data.yayinda != null) updateData.yayinda = data.yayinda;
  if (data.onemli != null) updateData.onemli = data.onemli;
  if (data.yayinTarihi != null) updateData.yayinTarihi = new Date(data.yayinTarihi);

  const [haber] = await db.update(haberlerTable).set(updateData).where(eq(haberlerTable.id, params.data.id)).returning();
  if (!haber) {
    res.status(404).json({ error: "Haber bulunamadı" });
    return;
  }

  res.json(serializeRow(haber));
});

router.delete("/haberler/:id", requireAdmin, async (req, res): Promise<void> => {
  const params = DeleteHaberParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const [haber] = await db.delete(haberlerTable).where(eq(haberlerTable.id, params.data.id)).returning();
  if (!haber) {
    res.status(404).json({ error: "Haber bulunamadı" });
    return;
  }

  res.sendStatus(204);
});

export default router;
