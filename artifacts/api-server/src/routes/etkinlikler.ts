import { Router, type IRouter } from "express";
import { eq, desc } from "drizzle-orm";
import { db, etkinliklerTable } from "@workspace/db";
import {
  CreateEtkinlikBody,
  UpdateEtkinlikBody,
  GetEtkinlikParams,
  UpdateEtkinlikParams,
  DeleteEtkinlikParams,
  ListEtkinliklerQueryParams,
} from "@workspace/api-zod";
import { requireAdmin } from "../middlewares/auth";
import { serializeRow, serializeRows } from "../lib/serialize";

const router: IRouter = Router();

router.get("/etkinlikler", async (req, res): Promise<void> => {
  const query = ListEtkinliklerQueryParams.safeParse(req.query);
  let rows = await db.select().from(etkinliklerTable).orderBy(desc(etkinliklerTable.tarih));

  if (query.success && query.data.yayinda === "true") rows = rows.filter((r) => r.yayinda === true);
  else if (query.success && query.data.yayinda === "false") rows = rows.filter((r) => r.yayinda === false);

  res.json(serializeRows(rows));
});

router.post("/etkinlikler", requireAdmin, async (req, res): Promise<void> => {
  const parsed = CreateEtkinlikBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const data = parsed.data;
  const [etkinlik] = await db.insert(etkinliklerTable).values({
    baslik: data.baslik,
    aciklama: data.aciklama,
    resimUrl: data.resimUrl ?? null,
    tarih: new Date(data.tarih),
    yer: data.yer ?? null,
    kategori: data.kategori ?? "genel",
    yayinda: data.yayinda ?? true,
  }).returning();

  res.status(201).json(serializeRow(etkinlik));
});

router.get("/etkinlikler/:id", async (req, res): Promise<void> => {
  const params = GetEtkinlikParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const [etkinlik] = await db.select().from(etkinliklerTable).where(eq(etkinliklerTable.id, params.data.id));
  if (!etkinlik) {
    res.status(404).json({ error: "Etkinlik bulunamadı" });
    return;
  }

  res.json(serializeRow(etkinlik));
});

router.patch("/etkinlikler/:id", requireAdmin, async (req, res): Promise<void> => {
  const params = UpdateEtkinlikParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const parsed = UpdateEtkinlikBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const data = parsed.data;
  const updateData: Partial<typeof etkinliklerTable.$inferInsert> = {};
  if (data.baslik != null) updateData.baslik = data.baslik;
  if (data.aciklama != null) updateData.aciklama = data.aciklama;
  if ("resimUrl" in data) updateData.resimUrl = data.resimUrl ?? null;
  if (data.tarih != null) updateData.tarih = new Date(data.tarih);
  if ("yer" in data) updateData.yer = data.yer ?? null;
  if (data.kategori != null) updateData.kategori = data.kategori;
  if (data.yayinda != null) updateData.yayinda = data.yayinda;

  const [etkinlik] = await db.update(etkinliklerTable).set(updateData).where(eq(etkinliklerTable.id, params.data.id)).returning();
  if (!etkinlik) {
    res.status(404).json({ error: "Etkinlik bulunamadı" });
    return;
  }

  res.json(serializeRow(etkinlik));
});

router.delete("/etkinlikler/:id", requireAdmin, async (req, res): Promise<void> => {
  const params = DeleteEtkinlikParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const [etkinlik] = await db.delete(etkinliklerTable).where(eq(etkinliklerTable.id, params.data.id)).returning();
  if (!etkinlik) {
    res.status(404).json({ error: "Etkinlik bulunamadı" });
    return;
  }

  res.sendStatus(204);
});

export default router;
