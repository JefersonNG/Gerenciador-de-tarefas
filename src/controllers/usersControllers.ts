import { Request, Response } from "express";
import { z } from "zod";
import { hash } from "bcrypt";
import { prisma } from "../database/prisma";

class UsersControllers {
  async create(req: Request, res: Response) {
    const bodySchema = z.object({
      name: z.string().min(4, "Mínimo 4 letras").trim(),
      email: z.email("Precisa digitar email valido").trim(),
      password: z.string().min(6, "Mínimo 4 caracteres"),
    });

    const userData = bodySchema.parse(req.body);

    const hashPassword = await hash(userData.password, 10);

    const newUser = await prisma.users.create({
      data: {
        name: userData.name,
        email: userData.email,
        password: hashPassword,
      },
    });

    const { password, ...user } = newUser;

    return res.status(201).json(user);
  }

  async index(req: Request, res: Response) {
    const users = await prisma.users.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
      },
    });

    res.json(users);
  }
}

export { UsersControllers };
