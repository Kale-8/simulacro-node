import {Router} from "express";
import * as eventController from "../controllers/eventController";
import {requireAuth, requireRole} from "../middlewares/auth";
import {validate} from "../middlewares/validate";
import {createEventSchema} from "../schemas/eventSchemas";

const router = Router();
router.get("/", eventController.list);
router.get("/:id", eventController.get);
router.post("/", requireAuth, requireRole("organizer"), validate(createEventSchema), eventController.create);
router.put("/:id", requireAuth, requireRole("organizer"), eventController.update);
router.delete("/:id", requireAuth, requireRole("organizer"), eventController.remove);
export default router;