import { Router } from "express";
import { SessionsControllers } from "../controllers/sessionsControllers";

const sessionsRoutes = Router();
const sessionsControllers = new SessionsControllers();

sessionsRoutes.post("/", sessionsControllers.login);

export { sessionsRoutes };
