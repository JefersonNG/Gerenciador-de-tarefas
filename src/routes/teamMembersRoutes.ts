import { Router } from "express";
import { TeamMembersControllers } from "../controllers/teamMembersControllers";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { ensureAuthorization } from "../middlewares/ensureAuthorization";

const teamMembersRoutes = Router();
const teamMembersControllers = new TeamMembersControllers();

teamMembersRoutes.use(ensureAuthorization(["admin"]));

teamMembersRoutes.post("/", teamMembersControllers.create);
teamMembersRoutes.get("/", teamMembersControllers.index);
teamMembersRoutes.delete("/:teamMembers_id", teamMembersControllers.remove);

export { teamMembersRoutes };
