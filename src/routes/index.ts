import { Router } from "express";
import { usersRoutes } from "./usersRoutes";
import { sessionsRoutes } from "./sessionsRoutes";
import { teamsRoutes } from "./teamsRoutes";
import { teamMembersRoutes } from "./teamMembersRoutes";
import { taskRoutes } from "./taskRoutes";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { taskHistoryRoutes } from "./taskHistoryRoutes";

const routes = Router();
routes.use("/users", usersRoutes);
routes.use("/sessions", sessionsRoutes);

routes.use(ensureAuthenticated);
routes.use("/teams", teamsRoutes);
routes.use("/team-members", teamMembersRoutes);
routes.use("/task", taskRoutes);
routes.use("/task-history", taskHistoryRoutes);

export { routes };
