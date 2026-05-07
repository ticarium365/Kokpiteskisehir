import { Router, type IRouter } from "express";
import { eq, desc } from "drizzle-orm";
import { db, duyurularTable } from "@workspace/db";
import {
  CreateDuyuruBody,
  UpdateDuyuruBody,
  GetDuyuruParams,
  UpdateDuyuruParams,
  DeleteDuyuruParams,
  ListDuyurularQueryParams,
} from "@workspace/api-zod";
import { requireAdmin } from "../middlewares/auth";
import { serializeRow, serializeRows } from "../lib/serialize";

const router: IRouter = Router();

router.get("/duyurular", async (req, res): Promise<void> => {
  const query = ListDuyurularQueryParams.safeParse(req.query);
  let rows = await db.select().from(duyurularTable).orderBy(desc(duyurularTable.yayinTarihi));

  if (query.success && query.data.yayinda === "true") rows = rows.filter((r) => r.yayinda === true);
  else if (query.success && query.data.yayinda === "false") rows = rows.filter((r) => r.yayinda === false);

  res.json(serializeRows(rows));
});

router.post("/duyurular", requireAdmin, async (req, res): Promise<void> => {
  const parsed = CreateDuyuruBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const data = parsed.data;
  const [duyuru] = await db.insert(duyurularTable).values({
    baslik: data.baslik,
    icerik: data.icerik,
    onemli: data.onemli ?? false,
    yayinda: data.yayinda ?? true,
    yayinTarihi: data.yayinTarihi ? new Date(data.yayinTarihi) : new Date(),
  }).returning();

  res.status(201).json(serializeRow(duyuru));
});

router.get("/duyurular/:id", async (req, res): Promise<void> => {
  const params = GetDuyuruParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const [duyuru] = await db.select().from(duyurularTable).where(eq(duyurularTable.id, params.data.id));
  if (!duyuru) {
    res.status(404).json({ error: "Duyuru bulunamadı" });
    return;
  }

  res.json(serializeRow(duyuru));
});

router.patch("/duyurular/:id", requireAdmin, async (req, res): Promise<void> => {
  const params = UpdateDuyuruParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const parsed = UpdateDuyuruBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const data = parsed.data;
  const updateData: Partial<typeof duyurularTable.$inferInsert> = {};
  if (data.baslik != null) updateData.baslik = data.baslik;
  if (data.icerik != null) updateData.icerik = data.icerik;
  if (data.onemli != null) updateData.onemli = data.onemli;
  if (data.yayinda != null) updateData.yayinda = data.yayinda;
  if (data.yayinTarihi != null) updateData.yayinTarihi = new Date(data.yayinTarihi);

  const [duyuru] = await db.update(duyurularTable).set(updateData).where(eq(duyurularTable.id, params.data.id)).returning();
  if (!duyuru) {
    res.status(404).json({ error: "Duyuru bulunamadı" });
    return;
  }

  res.json(serializeRow(duyuru));
});

router.delete("/duyurular/:id", requireAdmin, async (req, res): Promise<void> => {
  const params = DeleteDuyuruParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const [duyuru] = await db.delete(duyurularTable).where(eq(duyurularTable.id, params.data.id)).returning();
  if (!duyuru) {
    res.status(404).json({ error: "Duyuru bulunamadı" });
    return;
  }

  res.sendStatus(204);
});

export default router;
