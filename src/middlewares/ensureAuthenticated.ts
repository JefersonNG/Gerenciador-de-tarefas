import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../../env";
import { AppError } from "../utils/AppError";

type UsersRoles = "member" | "admin";

interface TokenPayload {
  sub: string;
  role: UsersRoles;
}

function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader) throw new AppError("Token not exist", 401);

  const [, token] = authHeader.split(" ");

  try {
    const decoded = jwt.verify(token, env.SECRET) as TokenPayload;

    req.user = {
      id: decoded.sub,
      role: decoded.role,
    };

    next();
  } catch {
    throw new AppError("Token invalid", 401);
  }
}

export { ensureAuthenticated };
