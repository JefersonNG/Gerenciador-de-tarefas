import { Request, Response } from "express";
import z from "zod";
import { prisma } from "../database/prisma";
import { AppError } from "../utils/AppError";
import { priorityTask, statusTask } from "../database/generated/enums";

class TaskController {
  async create(req: Request, res: Response) {
    const { user } = req;

    if (!user) throw new AppError("This is not authenticated.");

    const bodySchema = z.object({
      title: z.string().trim(),
      description: z.string(),
      assigned_to: z.string(),
      team_id: z.coerce.number().positive(),
    });

    const task = bodySchema.parse(req.body);

    const newTask = await prisma.tasks.create({
      data: {
        title: task.title,
        description: task.description,
        assignedTo: task.assigned_to,
        teamId: task.team_id,
      },
    });

    res.status(201).json(newTask);
  }

  async index(req: Request, res: Response) {
    const querySchema = z.object({
      status: z.enum(statusTask).optional(),
      priority: z.enum(priorityTask).optional(),
    });

    const { status, priority } = querySchema.parse(req.query);

    const tasks = await prisma.tasks.findMany({
      where: {
        status,
        priority,
      },
    });

    res.json(tasks);
  }

  async update(req: Request, res: Response) {
    const { task_id } = req.params;
    const { user } = req;

    if (!user) throw new AppError("his is not authenticated.");

    if (!task_id) throw new AppError("Task not found");

    const bodySchema = z.object({
      title: z.string().optional(),
      description: z.string().optional(),
      status: z.enum(statusTask).optional(),
      priority: z.enum(priorityTask).optional(),
    });

    const taskSchema = z.object({
      id: z.string(),
      status: z.enum(statusTask),
    });

    const { title, description, status, priority } = bodySchema.parse(req.body);

    const taskFind = await prisma.tasks.findFirst({
      select: {
        id: true,
        status: true,
      },
      where: {
        id: String(task_id),
      },
    });

    const task = taskSchema.parse(taskFind);

    await prisma.taskHistory.create({
      data: {
        taskId: task.id,
        oldStatus: task.status,
        newStatus: status ?? task.status,
        changedBy: user.id,
      },
    });

    await prisma.tasks.update({
      data: {
        title,
        description,
        status,
        priority,
      },
      where: {
        id: String(task_id),
      },
    });

    res.json();
  }

  async remove(req: Request, res: Response) {
    const { task_id } = req.params;

    if (!task_id) throw new AppError("Task not found");

    await prisma.tasks.delete({
      where: {
        id: String(task_id),
      },
    });

    res.json();
  }
}

export { TaskController };
