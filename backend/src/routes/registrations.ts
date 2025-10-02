import {Router} from "express";
import * as registrationController from "../controllers/registrationController";
import {requireAuth} from "../middlewares/auth";
import {validate} from "../middlewares/validate";
import {registerEventSchema} from "../schemas/registrationSchemas";

const router = Router();
router.post("/", requireAuth, validate(registerEventSchema), registrationController.create);
router.get("/me", requireAuth, registrationController.myRegistrations);
router.put("/:id", requireAuth, registrationController.update);
router.post("/:id/cancel", requireAuth, registrationController.cancel);
export default router;