import { Router } from "express";
import { generateFakerUsers } from "../services/user.service.js";
import logger from "../logs/logger.js";


const router = Router();

router.get("/", (req, res) => {
    const message = "Server is running";
    res.status(200).json({
        message: message,
    });
    logger.http(message);
});



router.get("/users", (req, res) => {
    try {
        const count = Number(process.env.USERS_COUNT || 7);
        const users = generateFakerUsers(count);
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
