import { compare } from "bcrypt";
import { Request, Response } from "express";
import { z } from "zod";
import { prisma } from "../database/prisma";
import jwt from "jsonwebtoken";
import { env } from "../../env";
import { AppError } from "../utils/AppError";

class SessionsControllers {
  async login(req: Request, res: Response) {
    const bodySchema = z.object({
      email: z.email(),
      password: z.string().min(6),
    });

    const body = bodySchema.parse(req.body);

    const user = await prisma.users.findUnique({
      where: {
        email: body.email,
      },
    });

    if (!user) throw new AppError("Email ou Senha incorreto");

    const match = await compare(body.password, user.password);

    if (!match) throw new AppError("Email ou Senha incorreto");

    const token = jwt.sign({ role: user.role || "member" }, env.SECRET, {
      subject: user.id,
      expiresIn: "1d",
    });

    const { password, ...userPass } = user;

    return res.json({ ...userPass, token });
  }
}

export { SessionsControllers };
