import { Router } from "express";
import { TeamsControllers } from "../controllers/teamsControllers";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { ensureAuthorization } from "../middlewares/ensureAuthorization";

const teamsRoutes = Router();
const teamsControllers = new TeamsControllers();

teamsRoutes.use(ensureAuthorization(["admin"]));

teamsRoutes.post("/", teamsControllers.create);
teamsRoutes.get("/", teamsControllers.index);
teamsRoutes.patch("/:team_id", teamsControllers.update);
teamsRoutes.delete("/:team_id", teamsControllers.remove);

export { teamsRoutes };
