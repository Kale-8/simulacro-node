import {Router} from "express";
import * as userController from "../controllers/userController";
import {requireAuth, requireRole} from "../middlewares/auth";

const router = Router();
router.get("/", requireAuth, requireRole("admin"), userController.list);
router.get("/:id", requireAuth, requireRole("admin"), userController.get);
router.post("/", requireAuth, requireRole("admin"), userController.create);
router.put("/:id", requireAuth, requireRole("admin"), userController.update);
router.delete("/:id", requireAuth, requireRole("admin"), userController.remove);
export default router;