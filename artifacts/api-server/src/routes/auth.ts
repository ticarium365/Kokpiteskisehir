import { Router, type IRouter } from "express";
import { AdminLoginBody } from "@workspace/api-zod";
import { logger } from "../lib/logger";

const router: IRouter = Router();

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "kokpit2024";
const SESSION_KEY = "admin_authenticated";

router.post("/auth/login", async (req, res): Promise<void> => {
  const parsed = AdminLoginBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  if (parsed.data.password !== ADMIN_PASSWORD) {
    req.log.warn("Failed admin login attempt");
    res.status(401).json({ error: "Geçersiz şifre" });
    return;
  }

  (req.session as Record<string, unknown>)[SESSION_KEY] = true;
  req.log.info("Admin logged in");
  res.json({ ok: true });
});

router.post("/auth/logout", async (req, res): Promise<void> => {
  req.session.destroy(() => {
    res.json({ ok: true });
  });
});

router.get("/auth/me", async (req, res): Promise<void> => {
  const loggedIn = !!(req.session as Record<string, unknown>)[SESSION_KEY];
  res.json({ loggedIn });
});

export { SESSION_KEY };
export default router;
