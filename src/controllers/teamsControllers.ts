import { Request, Response } from "express";
import { z } from "zod";
import { prisma } from "../database/prisma";

class TeamsControllers {
  async create(req: Request, res: Response) {
    const bodySchema = z.object({
      name: z.string().min(4),
      description: z.string().optional(),
    });

    const { name, description } = bodySchema.parse(req.body);

    const newTeams = await prisma.teams.create({
      data: {
        name,
        description,
      },
    });

    res.status(201).json(newTeams);
  }

  async index(req: Request, res: Response) {
    const teams = await prisma.teams.findMany();
    res.json(teams);
  }

  async update(req: Request, res: Response) {
    const teamIdSchema = z.object({
      team_id: z.coerce.number(),
    });

    const bodySchema = z.object({
      name: z.string().optional(),
      description: z.string().optional(),
    });

    const { team_id } = teamIdSchema.parse(req.params);
    const { name, description } = bodySchema.parse(req.body);

    await prisma.teams.update({
      data: {
        description,
        name,
      },
      where: {
        id: team_id,
      },
    });

    res.json();
  }

  async remove(req: Request, res: Response) {
    const teamIdSchema = z.object({
      team_id: z.coerce.number(),
    });

    const { team_id } = teamIdSchema.parse(req.params);

    await prisma.teams.delete({
      where: {
        id: team_id,
      },
    });

    res.json();
  }
}

export { TeamsControllers };
