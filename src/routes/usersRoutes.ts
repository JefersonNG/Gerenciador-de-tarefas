import { Router } from "express";
import { UsersControllers } from "../controllers/usersControllers";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { ensureAuthorization } from "../middlewares/ensureAuthorization";

const usersRoutes = Router();
const usersController = new UsersControllers();

usersRoutes.post("/", usersController.create);

usersRoutes.use(ensureAuthenticated, ensureAuthorization(["admin"]));
usersRoutes.get("/", usersController.index);

export { usersRoutes };
