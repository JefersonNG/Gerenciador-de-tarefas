import { Request, Response } from "express";
import { z } from "zod";
import { prisma } from "../database/prisma";

class TeamMembersControllers {
  async create(req: Request, res: Response) {
    const bodySchema = z.object({
      user_id: z.string(),
      team_id: z.number(),
    });

    const { user_id, team_id } = bodySchema.parse(req.body);

    await prisma.teamMembers.create({
      data: {
        userId: user_id,
        teamId: team_id,
      },
    });

    res.status(201).json();
  }

  async index(req: Request, res: Response) {
    const teamIdSchema = z.object({
      team_id: z.coerce.number().optional(),
    });

    const { team_id } = teamIdSchema.parse(req.query);

    const teams = await prisma.teamMembers.findMany({
      where: {
        teamId: team_id,
      },
    });

    res.json(teams);
  }

  async remove(req: Request, res: Response) {
    const teamIdSchema = z.object({
      teamMembers_id: z.coerce.number(),
    });

    const { teamMembers_id } = teamIdSchema.parse(req.params);

    await prisma.teamMembers.delete({
      where: {
        id: teamMembers_id,
      },
    });

    res.json();
  }
}

export { TeamMembersControllers };
