import { Router, type IRouter } from "express";
import healthRouter from "./health";
import authRouter from "./auth";
import haberlerRouter from "./haberler";
import duyurularRouter from "./duyurular";
import etkinliklerRouter from "./etkinlikler";
import galeriRouter from "./galeri";
import siteAyarlariRouter from "./site-ayarlari";
import sliderRouter from "./slider";
import ekipRouter from "./ekip";
import sayfaIcerikleriRouter from "./sayfa-icerikleri";
import kullanicilarRouter from "./kullanicilar";

const router: IRouter = Router();

router.use(healthRouter);
router.use(authRouter);
router.use(haberlerRouter);
router.use(duyurularRouter);
router.use(etkinliklerRouter);
router.use(galeriRouter);
router.use(siteAyarlariRouter);
router.use(sliderRouter);
router.use(ekipRouter);
router.use(sayfaIcerikleriRouter);
router.use(kullanicilarRouter);

export default router;
