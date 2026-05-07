import { Router, type IRouter } from "express";
import { eq, asc } from "drizzle-orm";
import { db, fotoGaleriTable, videoGaleriTable } from "@workspace/db";
import {
  CreateFotoGaleriBody,
  UpdateFotoGaleriBody,
  UpdateFotoGaleriParams,
  DeleteFotoGaleriParams,
  ListFotoGaleriQueryParams,
  CreateVideoGaleriBody,
  UpdateVideoGaleriBody,
  UpdateVideoGaleriParams,
  DeleteVideoGaleriParams,
  ListVideoGaleriQueryParams,
} from "@workspace/api-zod";
import { requireAdmin } from "../middlewares/auth";
import { serializeRow, serializeRows } from "../lib/serialize";

const router: IRouter = Router();

router.get("/foto-galeri", async (req, res): Promise<void> => {
  const query = ListFotoGaleriQueryParams.safeParse(req.query);
  let rows = await db.select().from(fotoGaleriTable).orderBy(asc(fotoGaleriTable.sira));

  if (query.success) {
    if (query.data.yayinda === "true") rows = rows.filter((r) => r.yayinda === true);
    else if (query.data.yayinda === "false") rows = rows.filter((r) => r.yayinda === false);
    if (query.data.kategori) rows = rows.filter((r) => r.kategori === query.data.kategori);
  }

  res.json(serializeRows(rows));
});

router.post("/foto-galeri", requireAdmin, async (req, res): Promise<void> => {
  const parsed = CreateFotoGaleriBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const data = parsed.data;
  const [foto] = await db.insert(fotoGaleriTable).values({
    baslik: data.baslik,
    resimUrl: data.resimUrl,
    kategori: data.kategori ?? "genel",
    yayinda: data.yayinda ?? true,
    sira: data.sira ?? 0,
  }).returning();

  res.status(201).json(serializeRow(foto));
});

router.patch("/foto-galeri/:id", requireAdmin, async (req, res): Promise<void> => {
  const params = UpdateFotoGaleriParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const parsed = UpdateFotoGaleriBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const data = parsed.data;
  const updateData: Partial<typeof fotoGaleriTable.$inferInsert> = {};
  if (data.baslik != null) updateData.baslik = data.baslik;
  if (data.resimUrl != null) updateData.resimUrl = data.resimUrl;
  if (data.kategori != null) updateData.kategori = data.kategori;
  if (data.yayinda != null) updateData.yayinda = data.yayinda;
  if (data.sira != null) updateData.sira = data.sira;

  const [foto] = await db.update(fotoGaleriTable).set(updateData).where(eq(fotoGaleriTable.id, params.data.id)).returning();
  if (!foto) {
    res.status(404).json({ error: "Fotoğraf bulunamadı" });
    return;
  }

  res.json(serializeRow(foto));
});

router.delete("/foto-galeri/:id", requireAdmin, async (req, res): Promise<void> => {
  const params = DeleteFotoGaleriParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const [foto] = await db.delete(fotoGaleriTable).where(eq(fotoGaleriTable.id, params.data.id)).returning();
  if (!foto) {
    res.status(404).json({ error: "Fotoğraf bulunamadı" });
    return;
  }

  res.sendStatus(204);
});

router.get("/video-galeri", async (req, res): Promise<void> => {
  const query = ListVideoGaleriQueryParams.safeParse(req.query);
  let rows = await db.select().from(videoGaleriTable).orderBy(asc(videoGaleriTable.sira));

  if (query.success) {
    if (query.data.yayinda === "true") rows = rows.filter((r) => r.yayinda === true);
    else if (query.data.yayinda === "false") rows = rows.filter((r) => r.yayinda === false);
    if (query.data.kategori) rows = rows.filter((r) => r.kategori === query.data.kategori);
  }

  res.json(serializeRows(rows));
});

router.post("/video-galeri", requireAdmin, async (req, res): Promise<void> => {
  const parsed = CreateVideoGaleriBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const data = parsed.data;
  const [video] = await db.insert(videoGaleriTable).values({
    baslik: data.baslik,
    youtubeId: data.youtubeId,
    kategori: data.kategori ?? "genel",
    yayinda: data.yayinda ?? true,
    sira: data.sira ?? 0,
  }).returning();

  res.status(201).json(serializeRow(video));
});

router.patch("/video-galeri/:id", requireAdmin, async (req, res): Promise<void> => {
  const params = UpdateVideoGaleriParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const parsed = UpdateVideoGaleriBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const data = parsed.data;
  const updateData: Partial<typeof videoGaleriTable.$inferInsert> = {};
  if (data.baslik != null) updateData.baslik = data.baslik;
  if (data.youtubeId != null) updateData.youtubeId = data.youtubeId;
  if (data.kategori != null) updateData.kategori = data.kategori;
  if (data.yayinda != null) updateData.yayinda = data.yayinda;
  if (data.sira != null) updateData.sira = data.sira;

  const [video] = await db.update(videoGaleriTable).set(updateData).where(eq(videoGaleriTable.id, params.data.id)).returning();
  if (!video) {
    res.status(404).json({ error: "Video bulunamadı" });
    return;
  }

  res.json(serializeRow(video));
});

router.delete("/video-galeri/:id", requireAdmin, async (req, res): Promise<void> => {
  const params = DeleteVideoGaleriParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const [video] = await db.delete(videoGaleriTable).where(eq(videoGaleriTable.id, params.data.id)).returning();
  if (!video) {
    res.status(404).json({ error: "Video bulunamadı" });
    return;
  }

  res.sendStatus(204);
});

export default router;
