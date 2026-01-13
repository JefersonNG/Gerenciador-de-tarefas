import { Request, Response } from "express";
import { prisma } from "../database/prisma";

class TaskHistoryControllers {
  async index(req: Request, res: Response) {
    const { task_id } = req.params;
    const history = await prisma.taskHistory.findMany({
      where: {
        taskId: String(task_id),
      },
    });

    res.json(history);
  }
}

export { TaskHistoryControllers };
