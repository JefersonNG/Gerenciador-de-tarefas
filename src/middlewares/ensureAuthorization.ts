import { Request, Response, NextFunction } from "express";

function ensureAuthorization(roles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user?.id || !roles.includes(req.user?.role)) {
      return res.status(403).json({ message: "Forbidden" });
    }

    return next();
  };
}

export { ensureAuthorization };
