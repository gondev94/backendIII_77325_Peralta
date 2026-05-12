import { Router } from "express";
import logger from "../logs/logger.js";

const router = Router();

// endpoints de prueba para los logs
router.get("/debug", (req, res) => {
    logger.debug(`${req.method} | ${req.url}`);
});

router.get("/warn", (req, res) => {
    logger.warn(`${req.method} | ${req.url}`);
});

router.get("/error", (req, res) => {
    logger.error(`${req.method} | ${req.url}`);
});

router.get("/fatal", (req, res) => {
    logger.fatal(`${req.method} | ${req.url}`);
});

router.get("/test", (req, res) => {
    logger.http(`${req.method} | ${req.url}`);
    res.send("Test endpoint");
});

export default router;