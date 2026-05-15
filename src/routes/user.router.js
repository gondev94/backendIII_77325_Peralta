import { Router } from "express";
import { userController } from "../controllers/user.controller.js";
import { authenticateToken } from "../middleware/user.middleware.js";



const router = Router();

/**
 * @swagger
 * /api/users/:
 *   get:
 *     summary: Lista de todos los usuarios
 *     description: Retorna una lista de todos los usuarios
 *     tags: [users]
 *     responses:
 *       '200':
 *         description: OK
 *         
 */           

router.get("/", userController.getAllUsers);
router.post("/", userController.validateCreate, userController.create);
router.post("/login", userController.login);
router.get("/profile", authenticateToken, userController.profile);
router.get("/:id", authenticateToken, userController.getUserById);
router.get("/:username", authenticateToken, userController.getUserByUsername);
router.get("/:email", authenticateToken, userController.getUserByEmail);
router.delete("/:id", authenticateToken, userController.deleteUser);
router.put("/:id", authenticateToken, userController.updateUser);






export default router;
