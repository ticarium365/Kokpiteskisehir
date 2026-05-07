import type { Request, Response, NextFunction } from "express";

const SESSION_KEY = "admin_authenticated";

export function requireAdmin(req: Request, res: Response, next: NextFunction): void {
  if ((req.session as Record<string, unknown>)[SESSION_KEY]) {
    next();
    return;
  }
  res.status(401).json({ error: "Yetkisiz erişim" });
}
