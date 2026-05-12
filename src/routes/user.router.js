import { Router } from "express";
import { userController } from "../controllers/user.controller.js";
import { authenticateToken } from "../middleware/user.middleware.js";
import logger from "../logs/logger.js";


const router = Router();

router.get("/", userController.getAllUsers);
router.post("/", userController.validateCreate, userController.create);
router.post("/login", userController.login);
router.get("/profile", authenticateToken, userController.profile);


export default router;
