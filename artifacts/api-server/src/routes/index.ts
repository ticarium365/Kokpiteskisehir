import { Router, type IRouter } from "express";
import healthRouter from "./health";
import authRouter from "./auth";
import haberlerRouter from "./haberler";
import duyurularRouter from "./duyurular";
import etkinliklerRouter from "./etkinlikler";
import galeriRouter from "./galeri";

const router: IRouter = Router();

router.use(healthRouter);
router.use(authRouter);
router.use(haberlerRouter);
router.use(duyurularRouter);
router.use(etkinliklerRouter);
router.use(galeriRouter);

export default router;
