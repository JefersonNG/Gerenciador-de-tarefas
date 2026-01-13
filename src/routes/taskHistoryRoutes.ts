import { Router } from "express";
import { TaskHistoryControllers } from "../controllers/taskHistoryController";

const taskHistoryRoutes = Router();
const taskHistoryControllers = new TaskHistoryControllers();

taskHistoryRoutes.get("/:task_id", taskHistoryControllers.index);

export { taskHistoryRoutes };
