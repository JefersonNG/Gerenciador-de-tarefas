import { Router } from "express";
import { TaskController } from "../controllers/taskControllers";
import { ensureAuthorization } from "../middlewares/ensureAuthorization";

const taskRoutes = Router();
const taskController = new TaskController();

taskRoutes.use(ensureAuthorization(["admin", "member"]));

taskRoutes.post("/", taskController.create);
taskRoutes.get("/", taskController.index);
taskRoutes.patch("/:task_id", taskController.update);
taskRoutes.delete("/:task_id", taskController.remove);

export { taskRoutes };
